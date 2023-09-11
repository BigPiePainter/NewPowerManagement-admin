<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getManager, eidtManager, deleteManager } from '@/apis/manager'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '管理员管理', path: '/account-role-managment' }
]
const author = JSON.parse(localStorage.author)
const loading = ref(true)
const router = useRouter()
const tableData = ref<any>([])

//-------------获取角色数据---------------------
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}

const totalLength = ref<Number>()
const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,

  }
  getManager(args)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.total
      console.log(res.data.records.menuList[0].id)
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()

//----------------更改角色数据-------------------
const editTeacherData = reactive<any>({
  id: '',
  account: '',
  phoneNumber: '',
  password: '',
  remark: ''
});

const editTeacherDialogShow = ref(false)
const originalAccount = ref('')
const originalPhone = ref('')
const editTeacher = (props: any) => {
  editTeacherData.id = props.rowData.id;
  editTeacherData.phoneNumber = props.rowData.phoneNumber;
  editTeacherData.account = props.rowData.account;
  editTeacherData.password = props.rowData.password;
  editTeacherData.remark = props.rowData.remark;
  originalAccount.value = props.rowData.account;
  originalPhone.value = props.rowData.phoneNumber;
  console.log(props)
  editTeacherDialogShow.value = true;
}

const confirmEditDialog = () => {
  var args = {
    id: editTeacherData.id,
    phoneNumber: editTeacherData.phoneNumber == originalPhone.value ? null : editTeacherData.phoneNumber,
    account: editTeacherData.account == originalAccount.value ? null : editTeacherData.account,
    password: editTeacherData.password,
    remark: editTeacherData.remark
  }
  eidtManager(args).
    then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '管理员编辑成功',
          type: 'success'
        })
        loadData()
      } else {

        ElNotification({
          title: '编辑失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch()
  loadData()
  editTeacherDialogShow.value = false;
}

const cancelEditDialog = () => {
  editTeacherDialogShow.value = false;
}

const detail = (props: any) => {
  router.push({
    path: 'author',
    query: {
      id: props.rowData.id,
      remark: props.rowData.remark,
      account: props.rowData.account,
      phoneNumber: props.rowData.phoneNumber,
    }
  })
}

//------------新建角色数据------------------------
const roleDetail = () => {
  router.push({ path: '/role-detail-managment' })
}
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '账号',
    cellRenderer: (item: any) => {
      return (
        <el-button link type="primary" onClick={() => detail(item)}>
          {item.rowData.account}
        </el-button>
      )
    },
    width: 200
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button disabled={!author.managerEdit} link type="primary" onClick={() => editTeacher(item)}>
            编辑
          </el-button>
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`删除管理员${item.rowData.id}`}
            onConfirm={() => preDeleteTea(item)}
            v-slots={{
              reference: () => (
                <el-button disabled={!author.managerEdit} link type="danger">
                  删除
                </el-button>
              )
            }}
          />
        </div>
      )
    },
    width: 100,
    fixed: 'right',
    align: 'left'
  }
]

//-------------------删除角色--------------------------
const preDeleteTea = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除角色 ${item.rowData.name}`,
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
  deleteManager({ id: item.rowData.id }).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: item.rowData.name + '管理员删除成功',
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
        message: '管理员未成功删除',
        type: 'error'
      })
    })
}
</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div>
      <el-button :disabled="!author.managerEdit" class="ARMbutton" type="primary" @click="roleDetail">新建角色</el-button>
    </div>
  </TablePage>

  <el-dialog class="new-class-dialog" width="370px" v-model="editTeacherDialogShow">

    <div class="div-input-element">
      <span style="white-space: nowrap; margin-top:5px">
        账号：
      </span>
      <el-input v-model="editTeacherData.account">
      </el-input>
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <span style="white-space: nowrap; margin-top:5px">
        密码：
      </span>
      <el-input v-model="editTeacherData.password">
      </el-input>
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <span style="white-space: nowrap; margin-top:5px">
        手机：
      </span>
      <el-input v-model="editTeacherData.phoneNumber">
      </el-input>
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <span style="white-space: nowrap; margin-top:5px">
        备注：
      </span>
      <el-input v-model="editTeacherData.remark">
      </el-input>
    </div>

    <el-text style="margin-top:5px; margin-left:15px" size="small">修改权限请点击管理员进入详情</el-text>

    <template #header>
      <el-text>编辑管理员</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.div-input-element {
  flex-direction: row;
  display: flex;
}

.page-container {
  width: calc($page-width - $gap);
  height: calc($page-height);
  margin-left: $gap;
  //margin-right: $gap;
}

.ARMbutton {
  margin-left: $gap;
  margin-top: $gap;
  margin-bottom: $gap;
}
</style>
