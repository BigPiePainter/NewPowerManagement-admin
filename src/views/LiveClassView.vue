<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { getLiveClasses, createLiveClass, deleteLiveclasses } from '@/apis/liveClass'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getAllTeachers } from '@/apis/teacher'
import { getAllStudents } from '@/apis/student'
import { editLiveclasses } from '@/apis/liveClass'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '实时课程', path: '' }]


const teacherSelect = ref<any>([])
const totalLength = ref<Number>()
const loading = ref(true)
const tableData = ref<any>([])
const allTeacher = reactive<any>([])
const allStudent = ref<any>([])

const teacherName = reactive<{
  name: string
  teacherId: string
}>({
  name: '',
  teacherId: '',
})

const studenstName = reactive<{
  name: string
  studentIds: string
}>({
  name: '',
  studentIds: '',
})

const allSubjects = ref([])

getSubjects()
  .then((res) => (allSubjects.value = res.data))
  .catch()

getAllStudents()
  .then((res) => (allStudent.value = res.data))
  .catch()

getGrades()
  .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
  .catch()

const studentIDS = ref([])

const newClassData = reactive<{
  duration: string
  name: string
  startTime: string
  studentIds: string
  teacherId: string
  url: string
}>({
  duration: '',
  name: '',
  studentIds: '',
  startTime: '',
  teacherId: '',
  url: '',
})

const allStudentsDialogShow = ref(false)

const conformCreate = () => {
  var ids = ''
  Object.keys(newClassData.studentIds).forEach((key: any) => {
    ids = ids + newClassData.studentIds[key] + ','
  })
  newClassData.studentIds = ids
  console.log(ids)
  createLiveClass(newClassData)
    .then((res: any) => {
      console.log(newClassData)
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功创建',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: 'Warning',
          message: res,
          type: 'warning'
        })
      }
    })
    .catch()

  showDialog.value = false
}

const searchBarItems = reactive([
  {
    name: '老师名称',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: allTeacher,
    single: true
  },
  {
    name: '课堂名称',
    value: '',
  }
])
const editliveclassDialogshow = ref(false)

const editliveclassData = reactive<{

  id: string,
  remark: string,
  gradeId: string,
  expiration: string
}>({
  id: '',
  remark: '',
  gradeId: '',
  expiration: ''
});

const allGrades = ref<any>([])
const editliveclass =
  (props: { rowData: { id: string, gradeId: string, expiration: string, remark: string } }) => {
    editliveclassData.id = props.rowData.id;
    editliveclassData.expiration = props.rowData.expiration;
    editliveclassData.gradeId = props.rowData.gradeId;
    editliveclassData.remark = props.rowData.remark;

    console.log(props)
    editliveclassDialogshow.value = true;
  }

const confirmEditDialog = () => {
  editLiveclasses(editliveclass).
    then((res: any) => {
      console.log(editliveclass)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '学生编辑成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '编辑失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    }).catch()
  loadData()
  editliveclassDialogshow.value = false;
}

const cancelEditDialog = () => {
  editliveclassDialogshow.value = false;
}

const classStudent = ref([])

const classStudents = (item: any) => {
  classStudent.value = item.rowData.studentList
  allStudentsDialogShow.value = true
}

const classstudentCloumn = [
  {
    dataKey: 'id',
    key: 'id',
    title: '学生id',
    width: 300
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '学生姓名',
    width: 300
  }
]

const tableColumns = [
  {
    dataKey: 'name',
    key: 'name',
    title: '课堂名称',
    width: 120
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '课程老师',
    width: 120
  },
  {
    dataKey: 'startTime',
    key: 'startTime',
    title: '课程开始时间',
    width: 250
  },
  {
    dataKey: 'duration',
    key: 'duration',
    title: '课程时长',
    width: 150
  },
  {
    dataKey: 'studentList',
    key: 'studentList',
    title: '接受学生',
    width: 200,
    cellRenderer: (item: any) => {
      return (
        <el-button type="primary" onClick={() => classStudents(item)} style='width:100px'>
          查看上课学生
        </el-button>
      )
    }
  },
  {
    dataKey: 'url',
    key: 'url',
    title: '课程地址',
    width: 200
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: (item: any) => (
      <>
        {/* <el-button link type="primary" class="" onClick={() => editliveclass(item)}>
          编辑
        </el-button> */}
        <el-button link type="danger" class="" onClick={() => deleteliveclass(item)}>
          删除
        </el-button>
      </>
    ),

    width: 120,
    fixed: 'right',
    align: 'left'
  }
]
const showDialog = ref(false)

const createliveclass = () => {
  showDialog.value = true
}

const deleteliveclass = (cellData: any) => {
  cellData.rowData.id
  deleteLiveclasses(cellData.rowData.id).
    then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功删除',
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
    }).catch()
}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

// var args = {
//   pageNum: paginationInfo.currentPage,
//   pageSize: paginationInfo.pageSize,
//   name: searchBarItems[1].value,
//   teacherId: searchBarItems[0].value
// }

const loadSelectOption = () => {
  allTeacher.length = 0
  getAllTeachers()
    .then((res) => {
      res.data.forEach((item: any) => {
        allTeacher.push(item)
      })
      console.log(allTeacher)
    }).catch()
}

const loadData = () => {
  loading.value = true
  loadSelectOption()
  var args
  searchBarItems[0].value == '' ?
    args = {
      pageNum: paginationInfo.currentPage,
      pageSize: paginationInfo.pageSize,
      name: searchBarItems[1].value
    }
    :
    args = {
      pageNum: paginationInfo.currentPage,
      pageSize: paginationInfo.pageSize,
      name: searchBarItems[1].value,
      teacherId: searchBarItems[0].value
    }

  console.log(args)
  getLiveClasses(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
      console.log(res)
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()

</script>

<template>
  <TablePage :loading="loading" class="page-container" @paginationChange="loadData" :columns="tableColumns"
    :itemsTotalLength="totalLength" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
    <div>
      <el-button class="new-live-class-button" type="primary" @click="createliveclass">新建课堂</el-button>
    </div>
  </TablePage>
  <el-dialog v-model="showDialog" width="370px" class="new-class-dialog">
    <div>
      <div class="div-input-element">
        <span class="dialog-span"> *课堂名称: </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span"> *老师姓名： </span>
        <el-select class="dialog-input" placeholder="请输入" v-model="newClassData.teacherId">
          <el-option v-for="item in allTeacher" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span"> *上课学生： </span>
        <el-select multiple class="dialog-input" placeholder="请输入" v-model="newClassData.studentIds">
          <el-option v-for="item in allStudent" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span"> *开课时间： </span>
        <el-date-picker type="datetime" placeholder="请选择" v-model="newClassData.startTime"
          value-format="YYYY-MM-DD HH:MM:00" style="width: 200px;" />
      </div>
      <div class="div-input-element">
        <span class="dialog-span"> *时长（分钟）： </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.duration">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span"> *链接 </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.url">
        </el-input>
      </div>
    </div>

    <template #header>
      <el-text>新建课堂</el-text>
    </template>

    <template #footer>
      <el-button @click="conformCreate" type="primary">确认</el-button>
      <el-button @click="showDialog = false">取消</el-button>
    </template>
  </el-dialog>



  <el-dialog class="new-class-dialog" width="370px" v-model="editliveclassDialogshow">
    <div class="div-input-element">
      <span class="dialog-span">
        <el-input disabled class="dialog-input" v-model="editliveclassData.id">
        </el-input>
      </span>
    </div>
    <div class="div-input-element">
      <span class="dialog-span">
        学科：
      </span>
      <el-input>

      </el-input>
    </div>
    <div class="div-input-element" style="margin-top: 10px;">
      <span class="dialog-span">
        学习阶段：
      </span>
      <el-select>
        <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
    </div>

    <template #header>
      <el-text>编辑</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>


  <el-dialog v-model="allStudentsDialogShow" class='dialog-container' style="width:630px">

    <TablePage :data="classStudent" :columns="classstudentCloumn" class="dialog-container">


    </TablePage>

    <template #header>
      <el-text>上课学生名单</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="allStudentsDialogShow = false">确定</el-button>
      <el-button @click="allStudentsDialogShow = false">
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
  >.div-search-bar {
    margin: $gap;
  }

  .new-live-class-button {
    margin-bottom: $gap;
    margin-left: $gap;
  }
}


.dialog-container {
  width: 600px;
  height: 500px;
}
</style>
