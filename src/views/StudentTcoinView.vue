<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { changeTcoin } from '@/apis/Tcoin'
import { getStudent } from '@/apis/student'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGrades } from '@/apis/grade'
import { useRouter } from 'vue-router'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '积分管理', path: '' },
  { name: '学生积分', path: '' },
]

const author = JSON.parse(localStorage.author)
const tableData = ref<any>([])
const loading = ref(true)
const allGrade = ref<any>([])

const searchBarItems = reactive([
  { name: '用户姓名', value: '', label: "请输入" },
  { name: '学习阶段', value: '', type: InputType.Select, label: "请选择", options: allGrade, single: true },
])

const getselection = () => {
  getGrades()
    .then((res) => (allGrade.value = res.data.map((i: any) => i.subset).flat()))
    .catch()
}

const router = useRouter()
const clickDetail = (props: { rowData: { id: string } }) => {
  console.log(props);
  router.push({ path: 'tcoin-detail', query: { id: props.rowData.id } });
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '用户ID',
    width: 180
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '账号',
    width: 120,
    cellRenderer: (cellData: any) => (
      <el-text link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </el-text>)
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '用户姓名',
    width: 130
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    align: 'center',
    width: 80
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 150,
  },
  {
    dataKey: 'tcoin',
    key: 'tcoin',
    title: '当前T币数',
    width: 150,
  },
  // {
  //   key: 'option',
  //   title: '操作',

  //   cellRenderer: (item: any) => (
  //     <>
  //       <el-button disabled={!author.tCoinEdit} link type="primary" class="" onClick={() => editFund(item)}>
  //         变更T币数
  //       </el-button>
  //     </>
  //   ),

  //   width: 100,
  //   fixed: 'right',
  //   align: 'left'
  // }
]
const totalLength = ref<Number>()
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}
const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    gradeIds: searchBarItems[1].value[0],
  }

  getStudent(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

const allRevenuesType = [
  {
    id: 1,
    value: '1',
    label: '收入',
  },
  {
    id: 2,
    value: '2',
    label: '支出',
  },

]



const allSourceType = [
  {
    id: '1',
    value: '1',
    label: '下单',
  },
  {
    id: '2',
    value: '2',
    label: '后台赠送',
  },

]


const confirmEditDialog = () => {
  console.log(editStudentFund)
  editStudentFundDialog.value = false;
  changeTcoin(editStudentFund).
    then((res: any) => {
      console.log(editStudentFund)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '学生编辑成功',
          type: 'success'
        })
        editStudentFundDialog.value = false;
        loadData()
      } else {
        ElNotification({
          title: '编辑失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    }).catch()
}
const cancelEditDialog = () => {
  editStudentFundDialog.value = false;
}
const editStudentFundDialog = ref(false);

const editStudentFund = reactive<{ number: string, remark: string, revenuesType: string, sourceType: string, studentId: string }>({ number: '', studentId: '', sourceType: '', revenuesType: '', remark: '' });
const editFund = (props: { rowData: { id: string } }) => {
  console.log(props)
  editStudentFundDialog.value = true;
  editStudentFund.studentId = props.rowData.id

}

getselection()
loadData()
</script>

<template>
  <TablePage class="page-container" :loading="loading" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
  </TablePage>

  <el-dialog class="teacher-group-dialog" width="370px" v-model="editStudentFundDialog">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>变更数量：
        </span>
        <el-input class="dialog-input" v-model="editStudentFund.number">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>收支类型：
        </span>
        <el-select class="dialog-input" v-model="editStudentFund.revenuesType">
          <el-option v-for="item in allRevenuesType" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>来源类型 ：
        </span>
        <el-select class="dialog-input" v-model="editStudentFund.sourceType">
          <el-option v-for="item in allSourceType" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          备注：
        </span>
        <el-input class="dialog-input" v-model="editStudentFund.remark">
        </el-input>
      </div>
    </div>

    <template #header>
      <el-text>编辑T币数</el-text>
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
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;
}

.div-search-bar {
  margin: $gap;
}
</style>
