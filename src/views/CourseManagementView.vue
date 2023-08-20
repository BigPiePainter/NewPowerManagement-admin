<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import SearchBar from '@/components/SearchBar.vue'
import { getCourseQuestionPackage, editCourseQuestionPackage, deleteCourseQuestionPackage } from '@/apis/coursequestionpackage'
import { getAllTeachers } from '@/apis/teacher'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '课程管理', path: '' },
  { name: '课程管理', path: '/course-management' }
]
const tableData = ref<any>([])
const totalLength = ref<Number>()
const loading = ref(false)
const searchBarItems = reactive([
  { name: "课程名称", value: "", label: "请输入" },
])

const allGrades = reactive<any>([])
const allSubjects = reactive<any>([])
const allTeachers = reactive<any>([])

const router = useRouter()

const courseCreat = () => {
  router.push({ path: 'course-create' })
}

const newCourseData = reactive<any>({
  id: '',
  name: '',
  description: '',
  difficultyLevel: '',
  gradeId: '',
  type: '',
  subjectId: '',
  teacherId: '',
  cover: ''
});

const allDifficultyType = [
  {
    id: 1,
    value: 1,
    label: '容易  ',
  },
  {
    id: 2,
    value: 2,
    label: '较易 ',
  },
  {
    id: 3,
    value: 3,
    label: '一般',
  },
  {
    id: 4,
    value: 4,
    label: '较难 ',
  },
  {
    id: 5,
    value: 5,
    label: '困难',
  }
]
const editDialogShow = ref(false)

const couseDetail = (props: any) => {
  console.log(props)
  router.push({
    path: 'course-detail',
    query: {
      id: props.rowData.id,
      name: props.rowData.name,
      cover: props.rowData.cover,
      createdAt: props.rowData.createdAt,
      subjectName: props.rowData.subjectName,
      teacherName: props.rowData.teacherName,
      gradeName: props.rowData.gradeName,
      updatedAt: props.rowData.updatedAt,
    }
  })
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '课程名称',
    width: 200,
    cellRenderer: (item: any) => {
      if (item.rowData.labelName != null) {
        return (
          <>
            <ElButton link type='primary' onClick={() => couseDetail(item)} class="detailed">{item.rowData.name}</ElButton>
            <el-tag>{item.rowData.labelName}</el-tag>
          </>
        )
      } else {
        return (
          <>
            <ElButton link type='primary' onClick={() => couseDetail(item)} class="detailed">{item.rowData.name}</ElButton>
          </>
        )
      }
    },
  },
  {
    dataKey: 'cover',
    key: 'cover',
    title: '封面',
    width: 200,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.cover}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.cover]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '负责老师',
    width: 200
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 200
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '阶段',
    width: 200
  },
  {
    dataKey: 'isTrial',
    key: 'isTrial',
    title: '是否支持试看',
    width: 200,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "支持" : "不支持"}
      </span>
    )
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(item)}>
            下发
          </el-button>
          <el-button link type="primary" onClick={() => editCourse(item)}>
            编辑
          </el-button>

          <el-popconfirm
            hide-after={0}
            width="170"
            title={`删除课程包${item.rowData.name}`}
            onConfirm={() => preDeleteTea(item)}
            v-slots={{
              reference: () => (
                <el-button link type="danger">
                  删除
                </el-button>
              )
            }}
          />
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'left'
  }
]

const preDeleteTea = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除课程包 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => {
      calcelDeleteTea(item)
      note.close()
    },
    onClose: () => deleteTea(item),
    type: 'warning'
  })
}

const calcelDeleteTea = (item: any) => {
  item.rowData.id = null
}

const deleteTea = (item: any) => {
  setTimeout(console.log, 0)
  var args = {
    id: item.rowData.id,
    type: 1
  }

  deleteCourseQuestionPackage(args).then((res: any) => {
    if (res.code == '20000') {
      console.log(args)
      ElNotification({
        title: '成功',
        message: item.rowData.name + '课程包删除成功',
        type: 'success'
      })
      loadData()
    } else {
      ElNotification({
        title: '删除失败',
        message: '请求错误或删除被撤回',
        type: 'error'
      })
    }
  })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '课程包未成功删除',
        type: 'error'
      })
    })
}

const editCourse = (props: any) => {
  console.log(props);
  newCourseData.name = props.rowData.name;
  newCourseData.cover = props.rowData.cover;
  newCourseData.description = props.rowData.description;
  newCourseData.teacherId = Number(props.rowData.teacherId);
  newCourseData.difficultyLevel = Number(props.rowData.difficultyLevel);
  newCourseData.gradeId = Number(props.rowData.gradeId);
  newCourseData.subjectId = Number(props.rowData.subjectId);
  newCourseData.id = Number(props.rowData.id);
  console.log(newCourseData);
  editDialogShow.value = true;
}

const confirmEditDialog = () => {
  var args = {
    name: newCourseData.name,
    cover: newCourseData.cover,
    description: newCourseData.description,
    teacherId: Number(newCourseData.teacherId),
    difficultyLevel: Number(newCourseData.difficultyLevel),
    gradeId: Number(newCourseData.gradeId),
    subjectId: Number(newCourseData.subjectId),
    id: Number(newCourseData.id),
  }
  console.log(args)
  editCourseQuestionPackage(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
      } else {
        ElNotification({
          title: '成功',
          message: '已成功编辑',
          type: 'success'
        })
      }
    })
    .catch()
    .finally(() => {
      loadData()
    })
  editDialogShow.value = false
}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    type: 1
  }
  getCourseQuestionPackage(args)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
      return getGrades()
    }).then((res: any) => {
      allGrades.length = 0
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          var dataSample: { id: number, level: number, name: string } = {
            id: Number(item.id),
            level: item.level,
            name: item.name
          }
          allGrades.push(dataSample)
        })
      })
      return getSubjects()
    }).then((res: any) => {
      allSubjects.length = 0
      res.data.forEach((item: any) => {
        var dataSample: { id: number, name: string } = {
          id: Number(item.id),
          name: item.name
        }
        allSubjects.push(dataSample)
      })
      return getAllTeachers()
    }).then((res: any) => {
      allTeachers.length = 0
      res.data.forEach((item: any) => {
        var dataSample: { id: number, name: string } = {
          id: Number(item.id),
          name: item.name
        }
        allTeachers.push(dataSample)
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()

</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div class='div-search-bar'>
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="courseCreat">新建课程包</el-button>
    </div>
  </TablePage>

  <el-dialog class="new-class-dialog" width="370px" v-model="editDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          封面名称：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.cover">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          课程名称：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.name">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          课程描述：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.description">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          老师：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.teacherId">
          <el-option v-for="item in allTeachers" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          难度：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.difficultyLevel">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-select filterable class="dialog-input" v-model="newCourseData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学习阶段：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.gradeId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>编辑课程包</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="editDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: calc($page-height);
  margin-left: $gap;
  //margin-right: $gap;
}

.ARMbutton {
  margin-top: $gap;
}
</style>
