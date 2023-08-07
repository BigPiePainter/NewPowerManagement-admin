<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getOrder, cancelOrder } from '@/apis/order'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [{ name: '订单管理', path: '' }]

const allStute = [
  {
    id: '1',
    name: '待支付',
  },
  {
    id: '2',
    name: '已支付'
  },
  {
    id: '3',
    name: '已退课',
  }
]

const searchBarItems = reactive([
  { name: '订单号', value: '' },
  { name: '商品名称', value: '', label: '请输入' },
  { name: '商品类型', value: '', type: InputType.Select, label: '请选择' },
  { name: '订单状态', value: '', type: InputType.Select, label: '', options: allStute },
  { name: '订单时间', value: '', type: InputType.Select, label: '请选择' },
])

const loading = ref(true)

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 100
  },
  {
    dataKey: 'productCover',
    key: 'productCover',
    title: '商品信息',
    width: 150,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.productCover}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.productCover]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'productName',
    key: 'productName',
    title: '商品名称',
    width: 400

  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 100
  },
  {
    dataKey: 'totalAmount',
    key: 'totalAmount',
    title: '价格',
    width: 100
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    width: 100,
    cellRenderer:(cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "已付款" : cellData.cellData == 2 ? "已付款" : "已退课"}
      </span>
      )
  
  },
{
  dataKey: 'orderSn',
    key: 'orderSn',
      title: '订单编号',
        width: 120
},
{
  dataKey: 'payTime',
    key: 'payTime',
      title: '支付时间',
        Fwidth: 200
},
{
  key: 'option',
    title: '操作',
      cellRenderer: (item: any) => {
        return (
          <>
            <el-popconfirm
              hide-after={0}
              width="170"
              title={`将${item.rowData.productName}退课吗`}
              onConfirm={() => preDeleteTea(item)}
              v-slots={{
                reference: () => (
                  <el-button link type="danger">
                    退课
                  </el-button>
                )
              }}
            />
          </>
        )
      },
        width: 100,
          fixed: 'right',
            align: 'center',
              height: 500
}
]
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const totalLength = ref<Number>()

const tableData = ref<any>([])
const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    orderSn: searchBarItems[0].value,
    name: searchBarItems[1].value,
    phoneNumber: searchBarItems[2].value,
    status: searchBarItems[3].value[0],
    payType: searchBarItems[4].value
  }
  getOrder(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
const preDeleteTea = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回退课 ${item.rowData.id}`,
    duration: 5000,
    onClick: () => {
      calcelDeleteTea(item)
      note.close()

    },
    onClose: () => deleteTea(item),
    type: 'warning',

  })
}

const calcelDeleteTea = (item: any) => {
  item.rowData.id = null
}

const value = ref('')


const deleteTea = (item: any) => {
  cancelOrder({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.id + '退课成功',
          type: 'success'
        })
        loadData()
      } else if(item.rowData.status == 3){
        ElNotification({
          title: '失败',
          message: '已经退课',
          type: 'success'
        })
        loadData()
       }else{
        ElNotification({
          title: '退课失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
 }})
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '退课未成功',
        type: 'error'
      })
      loadData()
    })
}
loadData()




</script>

<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData" :loading="loading"
    @paginationChange="loadData" :row-height="59">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
  </TablePage>
</template>

<style lang="scss" scop>
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;

  .div-search-bar {
    margin: $gap;
  }

  .new-poster-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }

  .displaypic {
    width: 100px;
    height: 100px;
  }

  .el-image {
    width: 59px;
  }
}
</style>
