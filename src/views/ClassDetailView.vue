<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { getGrades } from '@/apis/grade'
import { useRoute } from 'vue-router'
import { ElNotification, ElCheckbox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getAllStudents, getStudent } from '@/apis/student'
import { getClassesStudent, deleteClassStudent, createClassStudent } from '@/apis/classStudent'
import router from '@/router'
const route = useRoute()

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '班级管理', path: '/class-management' },
  { name: '班级详情', path: '/class-detail' }
]

const allStudents = ref<any>([])
const allGrades = ref<any>([])
const allDetail = reactive<any>([])

const loading = ref(true)
const searchBarItems = reactive([
  { name: "用户", type: InputType.Select, value: "", options: allStudents, single: true, },
])

const loadSelectOption = () => {
  getGrades()
    .then((res) => allGrades.value = res.data.map((i: any) => i.subset).flat())
    .catch()

  getAllStudents()
    .then((res) => allStudents.value = res.data)
    .catch()
}

loadSelectOption()

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

// const loadDetail = () => {
//   loading.value = true

//   var args = {
//     pageNum: paginationInfo.currentPage,
//     pageSize: paginationInfo.pageSize,
//     id: route.query.id

//   }

//   getClasses(args)
//     .then((res) => { allDetail.push(res.data.records[0]) })
//     .catch()
//     .finally(() => {
//       loading.value = false
//     })
// }
// loadDetail()
const activeName = ref('officalStudent')


const normalDialogSearchBarItems = reactive([
  {
    name: "选择学习阶段",
    value: "",
    label: "请选择",
    type: InputType.Select,
    options: allGrades
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
    width: 100
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
    title: '用户名',
    width: 150
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 100
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '电话',
    width: 150
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '加入时间',
    width: 150
  },
])

const preDeleteStu = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回移除学生 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => {
      calcelDeleteTea(item)
      note.close()
    },
    onClose: () => deleteCS(item),
    type: 'warning'
  })
}

const deleteCS = (item: any) => {
  setTimeout(console.log, 0)
  deleteClassStudent({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.id + '学生删除成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
      loadData()
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '学生未成功删除',
        type: 'error'
      })
    })
}

const calcelDeleteTea = (item: any) => {
  item.rowData.id = null
}

const dialogTableData = ref<any>([])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 200
  },
  {
    dataKey: 'studentId',
    key: 'studentId',
    title: '用户名',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`移除学生${item.rowData.id}`}
            onConfirm={() => preDeleteStu(item)}
            v-slots={{
              reference: () => (
                <el-button link type="primary">
                  移除
                </el-button>
              )
            }}
          />
        </div>

      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
]

const tableData = ref<any>([])

const addStudentDialogShow = ref(false);

const addStudent = () => {
  addStudentDialogShow.value = true;
}

const dialogSearchBarRefresh = () => {
  loadSelectOption()
}

const newStudentData = ref<any>([])

const confirmNewStudent = () => {
  addStudentDialogShow.value = false
  newStudentData.value = dialogTableData.value.filter((item: any) => item.checked)
  let data = newStudentData.value.map((item: any) => item.id)
  console.log(data)

  createClassStudent({
    classId: route.query.id,
    studentIdArr: data
  }).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: '添加学生成功',
        type: 'success'
      })
    } else {
      ElNotification({
        title: '成功',
        message: '添加学生失败',
        type: 'success'
      })
    }

    loadData()
  }).catch
}

const cancelNewStudent = () => {
  addStudentDialogShow.value = false;
  dialogTableData.value.forEach((i: any) => i.checked = false);
}


const totalLength = ref<Number>()
const studentType = ref<number>()
const handleTabClick = (tab: any) => {

  if (tab.props.name == 'officalStudent') {
    studentType.value = 1
    loadData()
  }
  else studentType.value = 2
  loadData()
}

const loadDialogData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    type: studentType.value,
    name: normalDialogSearchBarItems[1].value,
    gradeIds: normalDialogSearchBarItems[0].value[0]
  }

  getStudent(args)
    .then((res) => {
      dialogTableData.value = res.data.records
      totalLength.value = res.data.records.length
      loading.value = false
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

const loadData = () => {
  loading.value = true
  loadDialogData()
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    classId: route.query.id,
    studentId: searchBarItems[0].value[0],
  }
  getClassesStudent(args)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()
</script>

<template>
  <div class="div-class-detail">
    <div class="card-left">
      <div class="div-card-left-title">
        <el-text>
          基本信息
        </el-text>
      </div>

      <div class="div-card-left-detail">
        <div class="detail-info">
          <el-text class="el-text-detail">
            班级名称：{{ route.query.name }}
          </el-text>
          <el-text class="el-text-detail">
            负责老师：{{ route.query.teacherName }}
          </el-text>
          <el-text class="el-text-detail">
            学科：{{ route.query.subjectName }}
          </el-text>
          <el-text class="el-text-detail">
            学习阶段：{{ route.query.gradeName }}
          </el-text>
        </div>
        <div class="detail-date">
          <el-text class="el-text-detail">
            起始日期：{{ route.query.startDate }}
          </el-text>
          <el-text class="el-text-detail">
            到期日期：{{ route.query.endDate }}
          </el-text>
        </div>
      </div>
    </div>
    <div class="card-right">
      <TablePage class="table-page" :itemsTotalLength="totalLength" :loading="loading" :columns="tableColumns"
        @paginationChange="loadData" :data="tableData">
        <div class="div-search-bar">
          <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
          <div style="flex-grow: 1"></div>
          <el-button class="search-bar-button" type="primary" @click="addStudent(), studentType = 1">添加成员</el-button>
        </div>
      </TablePage>
    </div>
  </div>

  <el-dialog class="class-detail-dialog" width="850px" v-model="addStudentDialogShow">
    <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleTabClick">
      <el-tab-pane label="正式学生" name="officalStudent">
        <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
          <SearchBar class="dialog-search-bar" :items="normalDialogSearchBarItems" @change="loadDialogData()">
          </SearchBar>
        </TablePage>
      </el-tab-pane>
      <el-tab-pane label="临时学生" name="inofficalStudent">
        <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
          <SearchBar class="dialog-search-bar" :items="normalDialogSearchBarItems" @change="loadDialogData()">
          </SearchBar>
        </TablePage>
      </el-tab-pane>
    </el-tabs>
    <template #header>
      <el-text>添加学生</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewStudent()">确定</el-button>
      <el-button @click="cancelNewStudent()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.div-class-detail {
  $card-left-width: 350px;
  height: $page-height;
  display: flex;

  >.card-left {
    width: $card-left-width;
    min-width: $card-left-width;
    max-width: $card-left-width;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    margin-right: $page-gap;

    >.div-card-left-title {
      margin-top: 20px;
      margin-left: 20px;
    }

    >.div-card-left-detail {
      margin-left: 20px;

      >.detail-info {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        justify-content: left;
      }

      >.detail-date {
        display: flex;
        flex-direction: column;
        margin-top: 25px;
      }

      >.detail-info>.el-text-detail,
      .detail-date>.el-text-detail {
        margin-top: 15px;
        align-self: flex-start;
      }
    }
  }

  >.card-right {
    width: calc($page-width - $card-left-width - $page-gap);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    padding-left: 20px;
    flex-grow: 1;

    >.table-page {
      height: $page-height;
      width: calc($page-width - $card-left-width - $page-gap - 20px);
    }
  }
}

.div-search-bar {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;

  >.search-bar-button {
    max-width: 70px;
    margin-left: 12px;
  }
}
</style>

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color;
  height: 50px;
}

.class-detail-dialog {
  >.el-dialog__body {

    .tabs-page {
      height: 550px;
      box-sizing: border-box;

      .dialog-table-page {
        height: calc(550px - 54px - 10px);
        width: 850px - 15px - 15px;
        margin-left: 0px;

        .dialog-search-bar {
          margin-left: 10px;
          margin-right: 8px;
          margin-bottom: 15px;
        }
      }
    }

    display: flex;
    align-items: center;
    flex-direction: column;

    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-top: 0px;

    >div {
      width: fit-content;
    }
  }
}
</style>