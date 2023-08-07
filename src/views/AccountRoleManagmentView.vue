<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, formContextKey,ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getManager, createManager, eidtManager, deleteManager } from '@/apis/manager'

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '角色管理', path: '/account-role-managment' }
]

const loading = ref(true)
const router = useRouter()

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

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
      totalLength.value = res.data.records.length
      console.log(res.data.records.menuList[0].id)

    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()


const editTeacherData = reactive<{

id: string,
account: string,
phoneNumber: string,
password:string,
managerRoleId:string

}>({
id: '',
account: '',
phoneNumber: '',
password:'',
managerRoleId:''
});

const editTeacherDialogShow=ref(false)


const editTeacher =
  (props: { rowData: { id: string, phoneNumber: string, account: string } }) => {
    editTeacherData.id = props.rowData.id;
    editTeacherData.phoneNumber = props.rowData.phoneNumber;
    editTeacherData.account= props.rowData.account;
    console.log(props)
    editTeacherDialogShow.value = true;
  }

const confirmEditDialog = () => {

  eidtManager(editTeacherData).
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
        message: '请求错误或删除被撤回',
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
    width: 200
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '创建者',
    width: 200
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'msg',
    key: 'msg',
    title: '备注',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => editTeacher(item)}>
            编辑
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            关闭
          </el-button>
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`删除管理员${item.rowData.id}`}
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

const tableData=ref<any>([])
 






const preDeleteTea = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除老师 ${item.rowData.name}`,
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
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div>
      <el-button class="ARMbutton" type="primary" @click="roleDetail">新建角色</el-button>
    </div>
  </TablePage>





  <el-dialog class="new-class-dialog" width="370px" v-model="editTeacherDialogShow">
    <div class="div-input-element">
      <span class="dialog-span">
        <el-text disabled class="dialog-input" v-model="editTeacherData.id">
        </el-text>
      </span>
    </div>

    <div class="div-input-element">
      <span class="dialog-span">
        账号：
      </span>
      <el-input filterable class="dialog-input" v-model="editTeacherData.account">
      </el-input>
    </div>





    <div class="div-input-element">
      <span class="dialog-span">
        权限：
      </span>
      <el-input filterable class="dialog-input" v-model="editTeacherData.managerRoleId">
      </el-input>
    </div>

    
    <div class="div-input-element" style="margin-top: 10px;">
      <span class="dialog-span">
        密码：
      </span>
      <el-input class="dialog-input" v-model="editTeacherData.password" >
      </el-input>
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <span class="dialog-span">
        手机：
      </span>
      <el-input class="dialog-input" v-model="editTeacherData.phoneNumber" >
      </el-input>
    </div>

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
