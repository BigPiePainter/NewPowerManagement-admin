<script setup lang="tsx">
import { ref, reactive } from 'vue'
import TablePage from '@/components/TablePage.vue'
import { useRoute } from 'vue-router'
import { getTcoinRecord } from '@/apis/Tcoin'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '积分管理', path: '' },
  { name: '积分明细', path: '' },
]
const loading = ref(true)
const route = useRoute()
const tableData = ref<any>([])
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'id',
    width: 120
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 200,
  },
  {
    dataKey: 'number',
    key: 'number',
    title: 'T币变动数量',
    width: 150
  },
  {
    dataKey: 'revenuesType',
    key: 'revenuesType',
    title: '收支类型',
    width: 200,
    cellRenderer: (cellData: any) =>
      <span>
        {cellData.cellData == 1 ? "收入" : "支出"}
      </span>
  },
  {
    dataKey: 'sourceType',
    key: 'sourceType',
    title: '来源类型',
    width: 200,
    cellRenderer: (cellData: any) =>
      <span>
        {cellData.cellData == 1 ? "下单" : "后台赠送"}
      </span>
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 200,
  },

]
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 1
})
const totalLength = ref<Number>()
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
    studentId: route.query.id,
  }
  getTcoinRecord(args)
    .then((res) => {
      console.log(args)
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()
</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">

    </div>
  </TablePage>
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
