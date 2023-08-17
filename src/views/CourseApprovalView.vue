<script setup lang="tsx">
import { ref, reactive } from 'vue'
import type { ElButton } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue'
import { getMiniLessons, editMiniLessons, deleteMiniLessons } from '@/apis/minilessons'
import HeaderCellRenderer from 'element-plus/es/components/table-v2/src/renderers/header-cell'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '课程管理' }, { name: '微课审核' }]

const activeName = ref('pending')
const totalLength = ref<Number>()
const auditStatus = ref<Number>()
const warningDialogshow = ref(false)



const loading = ref(true)
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})






const editDialogShow = ref(false);

const editCourseData = reactive<{

  id: string,
  isTrial: string,
  name: string,

}>({

  id: '',
  isTrial: '',
  name: ''

});














const tableColumnsPending = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '标题',
    width: 200
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '上传者',
    width: 200
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    width: 200,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "草稿" : cellData.cellData == 2 ? "制作完成" : "已提交"}
      </span>
    )
  },

  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => (
      <>
        <el-button link type="primary" class="" onClick={() => pass(cellData)}>
          通过
        </el-button>
        <el-button link type="primary" class="" onClick={() => reject(cellData)}>
          拒绝
        </el-button>
        <el-button link type="primary" class="" onClick={() => edit(cellData)}>
          编辑
        </el-button>
        <el-button link type="danger" class="" onClick={() => warningDialog(cellData)}>
          删除
        </el-button>
      </>
    ),
    width: 200,
    fixed: 'right',
  }
]

const allOption = [
  {
    id: '1',
    value: '1',
    label: '支持试看',
  },
  {
    id: '2',
    value: '2',
    label: '不支持试看',
  },
]

const pass = (item: any) => {

  editMiniLessons({ id: item.rowData.id, auditStatus: 3, }).then((res: any) => {
    if (res.code == '20000') {
      console.log('已通过')
    }
    loadData()
  }).catch
}

const reject = (item: any) => {
 
  editMiniLessons({ id: item.rowData.id, auditStatus: 4, }).then((res: any) => {
    if (res.code == '20000') {
      console.log('已通过')
    }
    loadData()
  }).catch
}


const edit =
  (props: { rowData: { id: string, name: string, isTrial: string } }) => {
    editCourseData.id = props.rowData.id;
    editCourseData.isTrial = '';
    editCourseData.name = props.rowData.name;
    console.log(props)
    editDialogShow.value = true;
  }


const confirmEditDialog = () => {
  editMiniLessons(editCourseData).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
          title: '成功',
          message: '已成功编辑',
          type: 'success'
        })
        loadData()
        editDialogShow.value = false;
      } else {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
      
    }
  }).catch
}





const cancelEditDialog = () => {
  editDialogShow.value = false;
}

const tableDataPending = ref<any>([])

const tableDataApproved = ref<any>([])

const tableDataRejected = ref<any>([])



const loadPendingData = () => {
  loading.value = true

  var args = {

    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    auditStatus: 1

  }

  getMiniLessons(args)

    .then((res) => {
      tableDataPending.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}


const loadApprovalData = () => {
  loading.value = true
  var args = {

    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    auditStatus: 3,
  }

  getMiniLessons(args)

    .then((res) => {
      tableDataApproved.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadApprovalData()


const loadRejctData = () => {
  loading.value = true

  var args = {

    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    auditStatus: 4,
  }

  getMiniLessons(args)

    .then((res) => {
      tableDataRejected.value = res.data.records,
        totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
const deleteItemid = ref<any>()
const loadData = () => {
  loadPendingData()
  loadApprovalData()
  loadRejctData()

}

const warningDialog = (cellData2: any) => {
  console.log(cellData2)
  warningDialogshow.value = true
  deleteItemid.value = cellData2
  console.log(deleteItemid.value)
}
const ConfirmdeleteMiniLesson = () => {
  deleteMiniLessons({ id: deleteItemid.value.rowData.id }).then((res: any) => {
    console.log(deleteItemid)
    if (res.code == 20000) {
      console.log('删除成功')

      loadData()
      warningDialogshow.value = false
    }
    else {
      warningDialogshow.value = false
      console.log('删除失败')
    }
  }).catch()
}










loadData()

const handleClick = (tab: any) => {
  if (tab.props.name == 'pending') {
    auditStatus.value = 1
    loadPendingData()
  }
  else if (tab.props.name == 'approved') {
    auditStatus.value = 3
    loadApprovalData()
  }

  else {
    auditStatus.value = 4
    loadRejctData()
  }
}

</script>

<template>
  <div class="">
    <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="pending">
        <TablePage class="tabs-page-table" :columns="tableColumnsPending" :data="tableDataPending"></TablePage>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="approved">
        <TablePage class="tabs-page-table" :columns="tableColumnsPending" :data="tableDataApproved"></TablePage>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="rejected">
        <TablePage class="tabs-page-table" :columns="tableColumnsPending" :data="tableDataRejected"></TablePage>
      </el-tab-pane>
    </el-tabs>
  </div>




  <el-dialog class="new-class-dialog" width="370px" v-model="editDialogShow">
    <div class="div-input-element">
      <span class="dialog-span">
        <el-text disabled class="dialog-input" v-model="editCourseData.id">
        </el-text>
      </span>
    </div>

    <div class="div-input-element">
      <span class="dialog-span">
        课程名称：
      </span>
      <el-input filterable class="dialog-input" style="width: 220px;" v-model="editCourseData.name">
      </el-input>
    </div>


    <div class="div-input-element" style="margin-top: 10px;">
      <span class="dialog-span">
        可否预览：
      </span>
      <el-select class="dialog-input" v-model="editCourseData.isTrial">
        <el-option v-for="item in allOption" :key="item.id" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <template #header>
      <el-text>编辑老师</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>



  <el-dialog v-model="warningDialogshow" title="Warning" width="30%" center>
    <el-text disabled style="display: flex;align-items: center;justify-content: center;">
      是否确认删除课程
    </el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="warningDialogshow = false">Cancel</el-button>
        <el-button type="primary" @click="ConfirmdeleteMiniLesson">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<style scoped lang="scss">
$gap: 15px;

.tabs-page {
  padding-left: 30px;
  padding-top: 10px;
  height: $page-height;
  box-sizing: border-box;

  .tabs-page-table {
    height: calc($page-height - 54px - 10px);
  }
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
        margin: 10px;

        >.dialog-span {
          margin-right: 10px;
          margin: 10px
        }

        >.dialog-input {
          width: 100px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
