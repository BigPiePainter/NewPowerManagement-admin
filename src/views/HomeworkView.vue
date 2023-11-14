<script setup lang="tsx">
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { getAllTeachers } from '@/apis/teacher'
import { ref, reactive } from 'vue'
import { ElButton, ElCheckbox, ElInput, ElNotification, ElTag, type CheckboxValueType } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getAllHomeworks, shareHomeworkToParents } from '@/apis/homework'
import { getAllStudents, getStudent } from '@/apis/student'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '设置', path: '' },
  { name: '作业情况分享', path: '/homework' }
]
const author = JSON.parse(localStorage.author)
const editStudentDialogShow = ref(false)
const loading = ref(true)
const tableData = reactive<any>([])
const dialogTableData = ref<any>([])
const allStudents = reactive<any>([])
const allSubjects = reactive<any>([])
const allGrades = reactive<any>([])
const allTeachers = reactive<any>([])
const homeworkId = ref<any>('')
const totalLength = ref<Number>()
const dialogTotalLength = ref<Number>()
const studentDialogShow = ref(false)
const dialogLoading = ref(false)
const studentData = ref<any>([])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const dialogPaginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const searchBarItems = reactive([
  { name: '作业名称', value: '' },
  { name: '老师名称', value: '', type: InputType.Select, label: '请选择', options: allTeachers },
  { name: '课程类目名称', value: '', type: InputType.Select, label: '请选择', options: allSubjects }
])

const dialogSearchBarItems = reactive([
  {
    name: "选择学习阶段",
    value: "",
    label: "请选择",
    type: InputType.Select,
    options: allGrades,
    single: true
  },
  { name: "姓名", value: "", },
])

const dialogTableColumns = reactive<any>([
  {
    key: 'selection',
    width: 50,
    cellRenderer: (item: any) => {
      const onChange = (value: CheckboxValueType) => item.rowData.checked = value
      return <ElCheckbox modelValue={item.rowData.checked} onChange={onChange} />
    },
    headerCellRenderer: () => {
      const onChange = (value: CheckboxValueType) => {
        dialogTableData.value.forEach((i: any) => i.checked = value);
      }
      return <ElCheckbox onChange={onChange} modelValue={dialogTableData.value.every((i: any) => i.checked)} indeterminate={!dialogTableData.value.every((i: any) => i.checked) && dialogTableData.value.some((i: any) => i.checked)} />
    },
    checked: false,
  },
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 180
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '学生姓名',
    width: 100
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '账号',
    width: 150
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 100
  }
])

const tableColumns = reactive([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 180
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '作业名称',
    width: 150,
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师',
    width: 100
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '课程类目',
    align: 'center',
    width: 80
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 160
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button disabled={!author.homeworkShare} link type="primary" onClick={() => share(item)}>
            分享给家长
          </el-button>
        </div>
      )
    },
    width: 80,
    fixed: 'right',
    align: 'left'
  }
])
//-----------------functions-----------------------
const share = (props: any) => {
  console.log(props)
  homeworkId.value = props.rowData.id
  loadDialogData()
  studentDialogShow.value = true
}

const shareConfirm = () => {
  studentData.value = dialogTableData.value.filter((item: any) => item.checked)
  let data = studentData.value.map((item: any) => item.id)
  console.log(data)
  shareHomeworkToParents({
    studentId: data,
    id: homeworkId.value
  })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '分享成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '分享失败',
          message: res.msg,
          type: 'error'
        })
      }
      studentDialogShow.value = false
    })
}

const loadSelectOption = () => {
  getSubjects()
    .then((res: any) => {
      allSubjects.length = 0
      res.data.forEach((item: any) => {
        allSubjects.push(item)
      })
      return getAllTeachers()
    })
    .then((res: any) => {
      allTeachers.length = 0
      res.data.forEach((item: any) => {
        allTeachers.push(item)
      })
      return getAllStudents()
    })
    .then((res: any) => {
      allStudents.length = 0
      res.data.forEach((item: any) => {
        allStudents.push(item)
      })
      return getGrades()
    })
    .then((res: any) => {
      allGrades.length = 0
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          var dataSample = {
            id: item.id,
            level: item.level,
            name: item.name
          }
          allGrades.push(dataSample)
        })
      })
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "搜索框选项未成功加载",
        type: 'error',
      })
    })
}
loadSelectOption()

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    subjectId: searchBarItems[1].value,
    teacherId: searchBarItems[2].value
  }
  getAllHomeworks(args)
    .then((res: any) => {
      if (res.code == 20000) {
        tableData.length = 0
        totalLength.value = res.data.total
        res.data.records.forEach((item: any) => {
          tableData.push(item)
        })
      } else {
        ElNotification({
          title: '加载失败',
          message: res.msg,
          type: 'error',
        })
      }
      loading.value = false
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error',
      })
      loading.value = false
    })
}
loadData()

const dialogPageChange = (val: any) => {
  dialogPaginationInfo.currentPage = val.currentPage
  dialogPaginationInfo.pageSize = val.pageSize
  loadDialogData()
}

const loadDialogData = () => {
  dialogLoading.value = true

  var args = {
    pageNum: dialogPaginationInfo.currentPage,
    pageSize: dialogPaginationInfo.pageSize,
    type: 1,
    name: dialogSearchBarItems[1].value,
    gradeIds: dialogSearchBarItems[0].value
  }
  console.log('dialog args', args)
  getStudent(args)
    .then((res) => {
      dialogTableData.value = res.data.records
      dialogTotalLength.value = res.data.total
      loading.value = false
    })
    .catch(() => { })
    .finally(() => {
      dialogLoading.value = false
    })
}

const preDeleteStu = (item: any) => {
}

const calcelDeleteStu = (item: any) => {
  item.rowData.id = null
}

const deleteStu = (item: any) => {
}

const conformCreate = () => {
}

const cancelDialog = () => {
  studentDialogShow.value = false
}

const pageChange = (val: any) => {
  console.log(val)
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}

const dataCompute = (items: any) => {
  items.forEach((i: any) => {
    i.sexName = i.sex == 1 ? '男' : '女'
  })
  tableData.value = items
}

const editStudentData = reactive<{
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

const cancelEditDialog = () => {
  editStudentDialogShow.value = false;
}
</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
    </div>
  </TablePage>

  <el-dialog style="width: 700px;" v-model="studentDialogShow">
    <template #header>
      <el-text>选择学生</el-text>
    </template>
    <TablePage style="width: 640px;" :loading="dialogLoading" class="dialog-page-container" :itemsTotalLength="dialogTotalLength" @paginationChange="dialogPageChange"
      :columns="dialogTableColumns" :data="dialogTableData">
      <div class="div-search-bar">
        <SearchBar :items="dialogSearchBarItems" @change="loadDialogData"></SearchBar>
      </div>
    </TablePage>
    <template #footer>
      <ElButton type="primary" @click="shareConfirm">分享</ElButton>
      <ElButton @click="cancelDialog">取消</ElButton>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
}

.dialog-page-container{
  width: 870px;
  height: 700px;
  margin-left: $gap;
}

.div-search-bar {
  margin: $gap;
}
</style>