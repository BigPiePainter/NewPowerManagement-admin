<script setup lang="tsx">

import { getTeachers, deleteTeacher, resetTeacherPsw } from '@/apis/teacher'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { createTeacher } from '@/apis/teacher'
import { ElNotification } from 'element-plus'


const router = useRouter()

const loading = ref(true)
const newTeacherData = reactive<{
  account: string,
  name: string,
  password: string,
  phoneNumber: number,
  gradeId: number,
  subjectId: number

}>({
  account: '',
  name: '',
  password: '',
  phoneNumber: 0,
  gradeId: 0,
  subjectId: 0
});

const conformCreate = () => {
  createTeacher(newTeacherData).then((res: any) => {
    if (res.code == 20000) {
      open1()
    }
    else {
      ElNotification({
        title: 'Warning',
        message: res.msg,
        type: 'warning',
      })
    }
  }).catch()

  console.log(newTeacherData)
  showDialog.value = false
}

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
]

const selectOptionGrades = reactive<any>([])
const selectOptionSubjects = reactive<any>([])
const searchBarItems = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
  { name: "年级", value: "", type: InputType.Select, label: "请选择", options: selectOptionGrades },
  { name: "学科", value: "", type: InputType.Select, label: "请选择", options: selectOptionSubjects },
])

const clickName = (props: any) => {
  console.log(props)
  router.push({ path: 'teacher-detail-managament', query: { id: props.rowData.id } })
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
    title: '姓名',
    width: 200,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => clickName(cellData)} class="detailed">{cellData.cellData}</ElButton>,
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 200
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
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'lastLoginTime',
    key: 'lastLoginTime',
    title: '最后登录时间',
    width: 300,
  },

  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {

      const resetPswSlot = {
        reference: () => <el-button link type="primary">重置密码</el-button>
      }

      const deleteSlot = {
        reference: () => <el-button link type="danger">删除</el-button>
      }

      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`重置${item.rowData.name}密码`} onConfirm={() => restPsw(item)} v-slots={resetPswSlot} />

          <el-popconfirm hide-after={0} width='170' title={`删除老师${item.rowData.name}`} onConfirm={() => preDeleteTea(item)} v-slots={deleteSlot} />
        </div>
      )
    },
    width: 170,
    fixed: 'right',
    align: 'left'
  }
]

const tableData = reactive<any>([])

const restPsw = (item: any) => {
  var args = { teacherId: item.rowData.id }
  resetTeacherPsw(args)
    .then((res: any) => {
      if (res.msg == 'success') {
        ElNotification({
          title: '重置成功',
          message: item.rowData.name + ' 密码已重置为 888888',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '重置失败',
          type: 'error',
        })
      }
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        type: 'error',
      })
    })
}

const preDeleteTea = (item: any) => {
  tableData.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.splice(tableData.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除老师 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => { calcelDeleteTea(item), note.close() },
    onClose: () => deleteTea(item),
    type: 'warning',
  })
}

const calcelDeleteTea = (item:any) => {
  item.rowData.id = null
}

const deleteTea = (item:any) => {
  setTimeout(console.log, 0)
  deleteTeacher({ teacherId: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.name + '老师删除成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error',
        })
      }
      loadPageData(paginationInfo)
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "学生未成功删除",
        type: 'error',
      })
    })
}


const refresh = (prop: any) => {
  console.log(prop)
  loadPageData(paginationInfo)
}

const showDialog = ref(false)

const createteachers = () => {
  showDialog.value = true

}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})

const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    tableData.push(item)
  });
  console.log(tableData)
}

const totalLength = ref<Number>()

const open1 = () => {
  ElNotification({
    title: '成功',
    message: '已成功创建',
    type: 'success',
  })
}

const loadSelectOption = () => {
  getGrades()
    .then((res) => {
      selectOptionGrades.length = 0
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          var dataSample = {
            id: item.id,
            level: item.level,
            name: item.name
          }
          selectOptionGrades.push(dataSample)
        })
      })
      console.log(selectOptionGrades)
    })
    .catch()

  getSubjects()
    .then((res) => {
      console.log(res)
      selectOptionSubjects.length = 0
      res.data.forEach((item: any) => {
        var dataSample = {
          id: item.id,
          name: item.name
        }
        selectOptionSubjects.push(dataSample)
      })
      console.log(selectOptionSubjects)
    })
    .catch()
}
loadSelectOption()

const loadPageData = (prop: any) => {
  loading.value = true
  console.log(prop)
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    account: searchBarItems[0].value,
    name: searchBarItems[1].value,
    phoneNumber: searchBarItems[2].value,
    gradeIds: searchBarItems[3].value,
    subjectIds: searchBarItems[4].value
  }
  console.log(args)
  getTeachers(args).then((res) => {
    console.log(res)
    dataCompute(res)
    loading.value = false
    totalLength.value = res.data.records.length
  })
    .catch(() => {

    });
}
loadPageData(paginationInfo)
</script>


<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadPageData"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar ">
      <SearchBar :items="searchBarItems" @change="refresh"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="createteachers">新建老师</el-button>
    </div>
  </TablePage>

  <el-dialog v-model="showDialog" width="370px" class="new-class-dialog">

    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *用户名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newTeacherData.account">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *姓名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newTeacherData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *密码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newTeacherData.password">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *学习阶段：
        </span>
        <el-select class="dialog-input" placeholder="请选择" v-model="newTeacherData.gradeId" type: InputType.Select>
          <el-input v-for="index in selectOptionGrades" :key="index" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *学科：
        </span>
        <el-select class="dialog-input" placeholder="请选择" v-model="newTeacherData.subjectId" type: InputType.Select>
          <el-input v-for="index in selectOptionSubjects" :key="index" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *手机号码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newTeacherData.phoneNumber">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>新建老师</el-text>
    </template>

    <template #footer>
      <el-button @click='conformCreate' type="primary">确认</el-button>
      <el-button>取消</el-button>
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
}

.div-search-bar {
  margin: $gap;
}



.ARMbutton {
  margin-top: $gap;
}

.header {
  height: 50px;
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
@/apis/grade@/apis/teacher