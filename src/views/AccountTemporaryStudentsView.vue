<script setup lang="tsx">
import { getStudent, restStudentPsw, deleteStudent, toNormalStudent } from '@/apis/student'
import { getGrades } from '@/apis/grade'
import { ref, reactive, h } from 'vue'
import { ElNotification, ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '临时学生管理', path: '/account-temoorary-student' },
]
const author = JSON.parse(localStorage.author)
const selectOptionGrades = reactive<any>([])
const searchBarItems = reactive([
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
])

const loading = ref(true)
const router = useRouter()
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
    title: '姓名',
    width: 130,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 150
  },
  {
    dataKey: 'school',
    key: 'school',
    title: '学校',
    width: 150
  },
  {
    dataKey: 'lastLoginTime',
    key: 'lastLoginTime',
    title: '最后登陆时间',
    width: 200,
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {

      const resetPswSlot = {
        reference: () => <el-button disabled={!author.temoryStudentEdit} link type="primary">重置密码</el-button>
      }

      const deleteSlot = {
        reference: () => <el-button disabled={!author.temoryStudentEdit} link type="danger">删除</el-button>
      }

      const toNormalSlot = {
        reference: () => <el-button disabled={!author.temoryStudentEdit} link type="primary">转正</el-button>
      }
      return (
        <div>
          <el-popconfirm hide-after={0} width='170' title={`将${item.rowData.name}转正`} onConfirm={() => toNormalStu(item)} v-slots={toNormalSlot} />

          <el-popconfirm hide-after={0} width='170' title={`重置${item.rowData.name}密码`} onConfirm={() => restPsw(item)} v-slots={resetPswSlot} />

          <el-popconfirm hide-after={0} width='170' title={`删除学生${item.rowData.name}`} onConfirm={() => preDeleteStu(item)} v-slots={deleteSlot} />
        </div>
      )
    },
    width: 200,
    fixed: 'right',
    align: 'left'
  }
])


const clickDetail = (props: any) => {
  console.log(props)
  router.push({
    path: 'student-detail-management',
    query: {
      id: props.rowData.id,
      name: props.rowData.name,
      account: props.rowData.account,
      phoneNumber: props.rowData.phoneNumber,
      phoneNumberOfParent: props.rowData.phoneNumberOfParent,
      gradeName: props.rowData.gradeName,
      createdAt: props.rowData.createdAt,
      expiration: props.rowData.expiration
    }
  })
}

const tableData = reactive<any>([])
const restPsw = (item: any) => {
  var args = { id: item.rowData.id }
  restStudentPsw(args)
    .then((res: any) => {
      if (res.msg == 'success') {
        ElNotification({
          title: '重置成功',
          message: item.rowData.name + ' 密码已重置为 666666',
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

const preDeleteStu = (item: any) => {
  tableData.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.splice(tableData.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除学生 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => { calcelDeleteStu(item), note.close() },
    onClose: () => deleteStu(item),
    type: 'warning',
  })
}

const calcelDeleteStu = (item: any) => {
  item.rowData.id = null
}

const deleteStu = (item: any) => {
  setTimeout(console.log, 0)
  deleteStudent({ id: item.rowData.id })
    .then((res: any) => {
      console.log(res)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          duration: 2000,
          message: item.rowData.name + '学生删除成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error',
        })
      }
      loadData(paginationInfo)
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "学生未成功删除",
        type: 'error',
      })
    })
}

const toNormalStu = (item: any) => {
  var args = { id: item.rowData.id }
  console.log(args)
  toNormalStudent(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.name + '学生转正成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '转正失败',
          type: 'error',
        })
      }
      loadData(paginationInfo)
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "学生未成功转正",
        type: 'error',
      })
    })
}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 2 //临时学生type为2
})

const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    tableData.push(item)
  });
  console.log(tableData)
}

const totalLength = ref<Number>()

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
}
loadSelectOption()

const loadData = (prop: any) => {
  loading.value = true
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    type: paginationInfo.type,
    name: searchBarItems[0].value,
    phoneNumber: searchBarItems[1].value,
  }

  getStudent(args).then((res) => {
    dataCompute(res)
    loading.value = false
    totalLength.value = res.data.total
  })
    .catch()
}
loadData(paginationInfo)

console.log(tableData)

const refresh = () => {
  console.log(searchBarItems)
  loadData(paginationInfo)
}
</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="refresh" :selectOptions="selectOptionGrades"></SearchBar>
    </div>
  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
}

.div-search-bar {
  margin: $gap;
}
</style>
@/apis/student@/apis/grade