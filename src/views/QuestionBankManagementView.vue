<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { InputType } from '@/type'
import { getCourseQuestionPackage, editCourseQuestionPackage, deleteCourseQuestionPackage } from '@/apis/coursequestionpackage'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getAllTeachers } from '@/apis/teacher'
import { freePackageCreate } from '@/apis/freeOrder'
import { getAllStudents } from '@/apis/student'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '好题包管理', path: '' }]

const author = JSON.parse(localStorage.author)
const editDialogShow = ref(false)

const loading = ref(true)

const clickDetail = (props: any) => {

  router.push({
    path: 'question-detail',
    query: {
      id: props.rowData.id,
      androidPoint: props.rowData.androidPoint,
      name: props.rowData.name,
      cover: props.rowData.cover,
      teacherName: props.rowData.teacherName,
      gradeId: props.rowData.gradeId,
      gradeName: props.rowData.gradeName,
      subjectId: props.rowData.subjectId,
      subjectName: props.rowData.subjectName,
      description: props.rowData.description,
      difficultyLevel: props.rowData.difficultyLevel,
      createdAt: props.rowData.createdAt,
      categoryId: props.rowData.categoryId,
      categoryName: props.rowData.categoryName,
      iosPoint: props.rowData.iosPoint,
      version: props.rowData.version,
      versionType: props.rowData.versionType,
    }
  });

}

const snapShot = reactive<any>({})
const freeCourseDialogShow = ref(false)
const freeCourseInfo = reactive<any>({
  courseQuestionPackageSnapshot: "",
  id: 0,
  studentId: 0,
  type: 0
})
const allStudent = reactive<any>([])

const giveCourse = (item: any) => {
  freeCourseInfo.id = item.rowData.id
  freeCourseInfo.type = 2
  freeCourseInfo.studentId = ''
  snapShot.androidPoint = item.rowData.androidPoint
  snapShot.categoryId = item.rowData.categoryId
  snapShot.categoryName = item.rowData.categoryName
  snapShot.coursesQuestionPackagesId = item.rowData.id
  snapShot.cover = item.rowData.cover
  snapShot.gradeId = item.rowData.gradeId
  snapShot.gradeName = item.rowData.gradeName
  snapShot.iosPoint = item.rowData.iosPoint
  snapShot.name = item.rowData.name
  snapShot.subjectId = item.rowData.subjectId
  snapShot.subjectName = item.rowData.subjectName
  snapShot.type = 2
  snapShot.version = item.rowData.version
  snapShot.versionType = item.rowData.versionType
  getAllStudents()
    .then((res: any) => {
      res.data.forEach((item: any) => {
        allStudent.push(item)
      })
    })

  freeCourseDialogShow.value = true
}

const freeCourseCreateConfirm = () => {

  freeCourseDialogShow.value = false
  var args = {
    id: freeCourseInfo.id,
    courseQuestionPackageSnapshot: JSON.stringify(snapShot),
    studentId: freeCourseInfo.studentId,
    type: freeCourseInfo.type
  }
  freePackageCreate(args).then((res: any) => {
    if (res.code != 20000) {
      ElNotification({
        title: '下发失败',
        message: res.msg,
        type: 'error'
      })
    } else {
      ElNotification({
        title: '成功',
        message: '好题包下发成功',
        type: 'success'
      })
    }
  })
    .catch((res: any) => {
      ElNotification({
        title: '下发失败',
        message: res.msg,
        type: 'error'
      })
    })
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
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 120
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '好题名称',
    width: 200,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  // {
  //   dataKey: 'cover',
  //   key: 'cover',
  //   title: '封面',
  //   width: 100,
  //   cellRenderer: (item: any) => (
  //     <el-image
  //       fit="scale-down"
  //       src={item.rowData.cover}
  //       //onClick={()=>console.log(item)}
  //       className="shop-Preview"
  //       preview-src-list={[item.rowData.cover]}
  //       preview-teleported
  //     />)
  // },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 80,
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '课程类目',
    width: 80,
  },
  // {
  //   dataKey: 'teacherName',
  //   key: 'teacherName',
  //   title: '老师名',
  //   width: 100
  // },
  {
    dataKey: 'difficultyLevel',
    key: 'difficultyLevel',
    title: '难度',
    width: 100,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? '⭐'
          : cellData.cellData == 2 ? '⭐⭐'
            : cellData.cellData == 3 ? '⭐⭐⭐'
              : cellData.cellData == 4 ? '⭐⭐⭐⭐'
                : '⭐⭐⭐⭐⭐'}
      </span>)
  },
  {
    dataKey: 'labelName',
    key: 'labelName',
    title: '标签',
    width: 100,
    align: 'center',
    cellRenderer: (cellData: any) => {
      if (cellData.cellData == null) {
        return (
          <>
            <el-text>--</el-text>
          </>
        )
      } else {
        return (
          <>
            <el-tag>{cellData.cellData}</el-tag>
          </>
        )
      }

    }
  },
  {
    dataKey: 'description',
    key: 'description',
    title: '详情描述',
    width: 200
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 110
  },
  {
    dataKey: 'updatedAt',
    key: 'updatedAt',
    title: '更新时间',
    width: 110
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button disabled={!author.questionPackageEdit} link type="primary" class="" onClick={() => giveCourse(item)}>
            下发
          </el-button>
          <el-button disabled={!author.questionPackageEdit} link type="primary" class="" onClick={() => editCourse(item)}>
            编辑
          </el-button>

          <el-popconfirm
            hide-after={0}
            width="170"
            title={`删除课程包${item.rowData.name}`}
            onConfirm={() => preDeleteTea(item)}
            v-slots={{
              reference: () => (
                <el-button disabled={!author.questionPackageEdit} link type="danger">
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
    message: `撤回删除好题包 ${item.rowData.name}`,
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
  var args = {
    id: item.rowData.id,
    type: 2

  }
  setTimeout(console.log, 0)
  deleteCourseQuestionPackage(args).then((res: any) => {
    if (res.code == '20000') {
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

const allGrades = reactive<any>([])
const allSubjects = reactive<any>([])
const allTeachers = reactive<any>([])
const router = useRouter()

const clickCreate = () => {
  router.push({ path: 'question-package-create' });
}

const editCourse = (props: any) => {
  console.log(props);
  editDialogShow.value = true;
  newCourseData.cover = props.rowData.cover;
  newCourseData.description = props.rowData.description;
  newCourseData.teacherId = props.rowData.teacherId;
  newCourseData.difficultyLevel = Number(props.rowData.difficultyLevel);
  newCourseData.gradeId = props.rowData.gradeId;
  newCourseData.subjectId = props.rowData.subjectId;
  newCourseData.id = props.rowData.id;
  newCourseData.name = props.rowData.name;
}

const searchBarItems = reactive([
  {
    name: '学习阶段',
    value: '',
    type: InputType.Select,
    label: '请选择',
    single: true,
    options: allGrades
  },
  {
    name: '课程类目',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: allSubjects,
    single: true
  },
  {
    name: '难度',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options:
      [
        { id: 1, name: '⭐' },
        { id: 2, name: '⭐⭐' },
        { id: 3, name: '⭐⭐⭐' },
        { id: 4, name: '⭐⭐⭐⭐' },
        { id: 5, name: '⭐⭐⭐⭐⭐', }
      ],
    single: true
  },

  {
    name: '好题名称',
    value: ''
  }
])


const tableData = ref<any>([])
const totalLength = ref<Number>()

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}
const allDifficultyType = [
  {
    id: 0,
    value: 0,
    label: '无',
  },
  {
    id: 1,
    value: 1,
    label: '⭐',
  },
  {
    id: 2,
    value: 2,
    label: '⭐⭐',
  },
  {
    id: 3,
    value: 3,
    label: '⭐⭐⭐',
  },
  {
    id: 4,
    value: 4,
    label: '⭐⭐⭐⭐',
  },
  {
    id: 5,
    value: 5,
    label: '⭐⭐⭐⭐⭐',
  }
]

const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    gradeId: searchBarItems[0].value[0],
    subjectId: searchBarItems[1].value[0],
    difficultyLevel: searchBarItems[2].value,
    name: searchBarItems[3].value,
    type: 2,

  }
  getCourseQuestionPackage(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.total
      return getGrades()
    }).then((res: any) => {
      allGrades.length = 0
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          var dataSample: { id: string, level: number, name: string } = {
            id: item.id,
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
        var dataSample: { id: string, name: string } = {
          id: item.id,
          name: item.name
        }
        allSubjects.push(dataSample)
      })
      return getAllTeachers()
    }).then((res: any) => {
      allTeachers.length = 0
      res.data.forEach((item: any) => {
        var dataSample: { id: string, name: string } = {
          id: item.id,
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

const confirmEditDialog = () => {
  editCourseQuestionPackage(newCourseData)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功编辑',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
      }
    })
    .catch()
  editDialogShow.value = false
}
</script>

<template>
  <TablePage :loading="loading" class="page-container" :columns="tableColumns" :itemsTotalLength="totalLength"
    @paginationChange="pageChange" :data="tableData" style="margin-left: 15px;">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
    <div>
      <el-button class="new-button" style="margin-bottom: 15px; margin-left: 15px;" type="primary"
        @click="clickCreate" :disabled='!author.questionPackageEdit'>新建好题包</el-button>
    </div>
  </TablePage>

  <el-dialog class="new-class-dialog" width="370px" v-model="editDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>封面路径：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.cover">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>好题包名称：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>好题包描述：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.description">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>好题包难度：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.difficultyLevel">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>老师：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.teacherId">
          <el-option v-for="item in allTeachers" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          课程类目：
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
      <el-text>编辑好题包</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="editDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="teacher-group-dialog" width="400px" v-model="freeCourseDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>选择学生：
        </span>
        <el-select filterable class="dialog-input" v-model="freeCourseInfo.studentId">
          <el-option v-for="item in allStudent" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>下发题包</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="freeCourseCreateConfirm()">确定</el-button>
      <el-button @click="freeCourseDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;

  .new-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}

.div-search-bar {
  margin: $gap;
}
</style>
