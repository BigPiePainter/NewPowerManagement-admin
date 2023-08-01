<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { ElButton } from 'element-plus'
import SearchBar from '../components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { InputType } from '@/type'
import { getSubjects } from '@/apis/subject'
import { ElNotification } from 'element-plus'
import { getClasses, createClass } from '@/apis/class'
import { editClasses, deleteClasses } from '@/apis/class'
import {getAllTeachers} from '@/apis/teacher'



import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '班级管理', path: '/class-management' }
]


const router = useRouter()
const loading = ref(true)
const tableData = ref<any>([])
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const allTeacher= ref<any>([])

const newClassData = reactive<{
  creationType: number
  endDate: string
  gradeId: string
  name: string
  startDate: string
  subjectId: string
  teacherId: string
}>({
  creationType: 2,
  endDate: '',
  gradeId: '',
  name: '',
  startDate: '',
  subjectId: '',
  teacherId: ''
})





const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const totalLength = ref<Number>()



const searchBarItems = reactive([
  { name: "班级名称", value: "", },
  { name: "负责老师",     type: InputType.Select,
    value: "", options: allTeacher},
  {
    name: "年级",
    type: InputType.Select,
    value: "",
    options: allGrades

  },

  {
    name: "学科",
    type: InputType.Select,
    value: "",
    options: allSubjects
  },
])



const getselection = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()

  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()
}

getselection()

const newClassDialogShow = ref(false);
const creatNewClass = () => {
  newClassDialogShow.value = true;
}
const confirmNewClass = () => {

  createClass(newClassData)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功创建',
          type: 'success'
        })
      } else {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
      }
    })
    .catch()

  newClassDialogShow.value = false
}

const cancelNewClass = () => {
  newClassDialogShow.value = false
}






const tableColumns = reactive([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '班级名称',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => clickDetail(item)}>{item.rowData.name}</ElButton>
        </div>
      )
    },
    width: 150
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '负责老师',
    width: 150
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '年级',
    width: 150
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 150
  },
  {
    dataKey: 'studentNumber',
    key: 'studentNumber',
    title: '班级学生数量',
    width: 150
  },
  {
    dataKey: 'endDate',
    key: 'endDate',
    title: '到期时间',
    width: 150
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => editClass(item)}>编辑</ElButton>
          <ElButton link type='primary' onClick={() => deleteClass(item)}>删除</ElButton>
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])
const clickDetail = (props: { rowData: { id: string } }) => {
  console.log(props);
  router.push({ path: 'class-detail', query: { id: props.rowData.id } });
}

const editClassDialogShow = ref(false);
const editClassData = reactive<{
  name: string,
  teacher: string,
  startDate: string,
  endDate: string,
  subjectId: string,
  gradeId: string,
}>({
  name: '',
  teacher: '',
  startDate: '',
  endDate: '',
  subjectId: '',
  gradeId: '',

});



const editClass = (props: {
  rowData: {
    name: string,
    teacher: string,
    startDate: string,
    endDate: string,
    subjectId: string,
    gradeId: string,
  }
}) => {
  console.log(props);
  editClassDialogShow.value = true;
  editClassData.name = props.rowData.name;
  editClassData.teacher = props.rowData.teacher;
  editClassData.startDate = props.rowData.startDate;
  editClassData.endDate = props.rowData.endDate;
  editClassData.subjectId = props.rowData.subjectId;
  editClassData.gradeId = props.rowData.gradeId;
}


const deleteClassDialogShow = ref(false);
const deleteClassData = reactive<{ name: string }>({ name: '' });
const deleteClass = (props: { rowData: { id: string, name: string } }) => {
  console.log(props);
  deleteClassDialogShow.value = true;
  deleteClassData.name = props.rowData.name
}

const confirmEditDialog = () => {
  console.log(editClassData)
  editClassDialogShow.value = false;
}
const cancelEditDialog = () => {
  editClassDialogShow.value = false;
}
const confirmDeleteDialog = () => {
  console.log(deleteClassData);
  deleteClassDialogShow.value = false;
}
const cancelDeleteDialog = () => {
  deleteClassDialogShow.value = false;
}

const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    teacherId: searchBarItems[1].value[0],
    gradeId: searchBarItems[2].value[0],
    subjectId: searchBarItems[3].value[0]
  }

  getClasses(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
}
const loadAllTeacher = ()=>{

var args={
  pageNum: paginationInfo.currentPage,
  pageSize: paginationInfo.pageSize,
  name: searchBarItems[1].value,
}
getAllTeachers(args)
.then((res) => {
    allTeacher.value = res.data
     })
     .catch()
}


loadData()
loadAllTeacher()

</script>

<template>
  <div class="div-class-management">
    <TablePage 
    class="table-page" 
    :loading="loading"
    :itemsTotalLength="totalLength"
    :columns="tableColumns" 
    @paginationChange="loadData"
    :data="tableData"
    >
      <div class="div-search-bar">
        <SearchBar :items="searchBarItems" @change="loadData()" />
      </div>
      <div>
        <el-button class="new-class-button" type="primary" @click="creatNewClass()">新建班级</el-button>
      </div>
    </TablePage>
  </div>

  <el-dialog class="new-class-dialog" width="370px" v-model="newClassDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *班级名称：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *负责老师：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.teacherId">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *起始时间：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *到期时间：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.endDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-select class="dialog-input" placeholder="请输入" v-model="newClassData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-select class="dialog-input" placeholder="请输入" v-model="newClassData.gradeId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>

    <template #header>
      <el-text>新建班级</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewClass()">确定</el-button>
      <el-button @click="cancelNewClass()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="editClassDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *班级名称：
        </span>
        <el-input class="dialog-input" v-model="editClassData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *负责老师：
        </span>
        <el-input class="dialog-input" v-model="editClassData.teacher">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *起始时间：
        </span>
        <el-input class="dialog-input" v-model="editClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *到期时间：
        </span>
        <el-input class="dialog-input" v-model="editClassData.endDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-select filterable class="dialog-input" v-model="editClassData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-select class="dialog-input" v-model="editClassData.gradeId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>编辑班级</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="deleteClassDialogShow">
    <template #header>
      <el-text>确定删除班级</el-text>
    </template>
    <span>
      {{ deleteClassData.name }}
    </span>
    <template #footer>
      <el-button type="danger" @click="confirmDeleteDialog()">确定</el-button>
      <el-button @click="cancelDeleteDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap : 15px;

.div-search-bar {
  margin: $gap;
}

.div-class-management {
  height: $page-height;
  flex-grow: 1;
}

.table-page {
  width: calc($page-width - $gap);
  margin-left: $gap;
}

.new-class-button {
  margin-left: $gap;
  margin-bottom: $gap;
}
</style>

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color
}

.new-class-dialog {
  >.el-dialog__body {

    display: flex;
    align-items: center;
    flex-direction: column;

    >div {
      width: fit-content;

      >.div-input-element {
        display: flex;
        align-items: center;
        justify-content: right;
        margin-bottom: 13px;

        >.dialog-span {
          margin-right: 10px;
        }

        >.dialog-input {
          width: 200px;
        }
      }
    }
  }
}
</style>