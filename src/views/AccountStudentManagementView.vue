<script setup lang="tsx">
import { getGrades } from '@/apis/grade'
import { ref, reactive } from 'vue'
import { ElButton, ElInput, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getStudent, restStudentPsw, deleteStudent } from '@/apis/student'

const router = useRouter()

const studentName = (props: any) => {
  console.log(props)
  router.push({ path: 'student-detail-management', query: { id: props.rowData.id } })
}

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '学生管理', path: '/account-student-management' }
]

const loading = ref(true)

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 60
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '姓名',
    width: 80,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => studentName(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 170
  },
  {
    dataKey: 'expiration',
    key: 'expiration',
    title: '有效期',
    width: 140
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '年级',
    width: 70
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'sexName',
    key: 'sexName',
    title: '性别',
    width: 70
  },
  {
    dataKey: 'phoneNumberOfParent',
    key: 'phoneNumberOfParent',
    title: '家长手机号码',
    width: 180
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 120
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },

  {
    dataKey: 'lastLoginTime',
    key: 'lastLoginTime',
    title: '最后登陆时间',
    width: 200
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

          <el-popconfirm hide-after={0} width='170' title={`删除学生${item.rowData.name}`} onConfirm={() => preDeleteStu(item)} v-slots={deleteSlot} />
        </div >
      )
    },
    width: 170,
    fixed: 'right',
    align: 'left'
  }
]

const tableData = ref<object[]>([])

const restPsw = (item: any) => {
  var args = { studentId: item.rowData.id }
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
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
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

const calcelDeleteStu = (item:any) => {
  item.rowData.id = null
}

const deleteStu = (item:any) => {
  setTimeout(console.log, 0)
  deleteStudent({ studentId: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
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

const showDialog = ref(false)

const createStudent = () => {
  showDialog.value = true
}
const confrom = () => {
  showDialog.value = false
}
const cancel = () => {
  showDialog.value = false
}

const selectOptionGrades = reactive<any>([])
const searchBarItems = reactive([
  { name: '用户名', value: '' },
  { name: '姓名', value: '' },
  { name: '手机号', value: '', label: '' },
  { name: '学习阶段', value: '', type: InputType.Select, label: '请选择', options: selectOptionGrades }
])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 1
})

const dataCompute = (items: any) => {
  items.forEach((i: any) => {
    i.sexName = i.sex == 1 ? '男' : '女'
  })
  tableData.value = items
}

const totalLength = ref<Number>()

const loadData = (prop: any) => {
  loading.value = true
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    type: paginationInfo.type,
    account: searchBarItems[2].value,
    name: searchBarItems[0].value,
    phoneNumber: searchBarItems[1].value,
    gradeIds: searchBarItems[3].value
  }
  getStudent(args)
    .then((res) => {
      dataCompute(res.data.records)
      loading.value = false
      totalLength.value = res.data.records.length
    })
    .catch()
}
loadData(paginationInfo)

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
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "搜索框选项未成功加载",
        type: 'error',
      })
    })
}
loadSelectOption()

const refresh = () => {
  console.log(searchBarItems)
  loadData(paginationInfo)
}
</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="refresh"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="createStudent">新建学生</el-button>
    </div>
  </TablePage>

  <el-dialog v-model="showDialog" width="370px">
    <template #header>
      <el-text>新建学生</el-text>
    </template>
    <div style="height: 300px">
      <div class="input">
        <div class="input-word">*用户名:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">*姓名:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">*密码:</div>
        <ElInput class="input-input" placeholder="6-20位,建议包含数字与字母" />
      </div>
      <div class="input">
        <div class="input-word">年级:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">学科:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">手机号码:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
    </div>
    <template #footer>
      <ElButton @click="confrom">取消</ElButton>

      <ElButton type="primary" @click="cancel">确认</ElButton>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.ARMbutton {
  margin-top: $gap;
}

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;
}

.div-search-bar {
  margin: $gap;
}

.input {
  display: flex;
  flex-direction: row;
  width: 320px;
  margin-bottom: 10px;
}

.input-word {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  padding-right: 10px;
}

.input-input {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  height: 32px;
}
</style>