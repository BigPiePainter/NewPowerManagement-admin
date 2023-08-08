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

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '好题包管理', path: '' }]


const editDialogShow = ref(false)

const loading = ref(true)

const clickDetail = (props:any) => {

  router.push({
    path: 'question-detail',
    query: {
      id: props.rowData.id,
      name: props.rowData.name,
      cover: props.rowData.cover,
      teacherName: props.rowData.teacherName,
      gradeName: props.rowData.gradeName,
      subjectName: props.rowData.subjectName,
      description: props.rowData.description,
      difficultyLevel: props.rowData.difficultyLevel,
      createdAt: props.rowData.createdAt,
    }
  });

}


const newCourseData = reactive<{

  id: string,
  name: string,
  description: string,
  difficultyLevel: string,
  gradeId: string,
  type: string,
  subjectId: string,
  teacherId: string,
  cover: string
}>({

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
  {
    dataKey: 'cover',
    key: 'cover',
    title: '封面',
    width: 100,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.cover}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.cover]}
        preview-teleported
      />)
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 100
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 100
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师名',
    width: 100
  },

  {
    dataKey: 'difficultyLevel',
    key: 'difficultyLevel',
    title: '难度',
    width: 100,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 0 ? "容易" : cellData.cellData == 1 ? "较易" : cellData.cellData == 2 ? "普通" : cellData.cellData == 3 ? "较难" : cellData.cellData == 4 ? "难" : '困难'}
      </span>)
  },
  {
    dataKey: 'description',
    key: 'description',
    title: '详情描述',
    width: 100
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'updatedAt',
    key: 'updatedAt',
    title: '创建时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: (item: any) => {
      return (
        <div>
          {/* <el-button link type="primary" class="">
            下发
          </el-button> */}
          <el-button link type="primary" class="" onClick={() => editCourse(item)}>
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


const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const allTeacher = ref<any>([])
const router = useRouter()

const clickCreate = () => {
  router.push({ path: 'question-package-create' });
}

const loadSelectOption = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()

  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()

  getAllTeachers()
    .then((res) => { (allTeacher.value = res.data), console.log(res) })
    .catch()
}


const editCourse = (props: {
  rowData: {
    name: string,
    teacherId: string,
    subjectId: string,
    gradeId: string,
    id: string
    description: string,
    difficultyLevel: string,
    cover: string
  }

}) => {
  console.log(props);
  editDialogShow.value = true;
  newCourseData.cover = props.rowData.cover;
  newCourseData.description = props.rowData.description;
  newCourseData.teacherId = props.rowData.teacherId;
  newCourseData.difficultyLevel = props.rowData.difficultyLevel;
  newCourseData.gradeId = props.rowData.gradeId;
  newCourseData.subjectId = props.rowData.subjectId;
  newCourseData.gradeId = props.rowData.gradeId;
  newCourseData.id = props.rowData.id;
}


loadSelectOption()

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
    name: '学科',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: allSubjects
  },
  {
    name: '难度',
    value: ''
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

const allDifficultyType = [
  {
    id: '1',
    value: '1',
    label: '容易  ',
  },
  {
    id: '2',
    value: '2',
    label: '较易 ',
  },
  {
    id: '3',
    value: '3',
    label: '一般',
  },
  {
    id: '4',
    value: '4',
    label: '较难 ',
  },
  {
    id: '5',
    value: '5',
    label: '困难',
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
      totalLength.value = res.data.records.length

    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })

}

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

loadData()

</script>

<template>
  <TablePage :loading="loading" class="table-page" :columns="tableColumns" :searchBarItemsTotalLength="totalLength"
    @paginationChange="loadData" :data="tableData" style="margin-left: 15px;">

    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>

    <div>
      <el-button class="new-button" style="margin-bottom: 15px; margin-left: 15px;" type="primary"
        @click="clickCreate">新建好题包</el-button>
    </div>

  </TablePage>


  <el-dialog class="new-class-dialog" width="370px" v-model="editDialogShow">

    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *封面路径：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.cover">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *好题包名称：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *好题包描述：
        </span>
        <el-input class="dialog-input" v-model="newCourseData.description">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *好题包难度：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.difficultyLevel">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *老师：
        </span>
        <el-select class="dialog-input" v-model="newCourseData.teacherId">
          <el-option v-for="item in allTeacher" :key="item.id" :label="item.name" :value="item.id" />
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
      <el-text>编辑班级</el-text>
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
