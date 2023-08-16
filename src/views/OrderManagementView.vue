<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getOrder, cancelOrder } from '@/apis/order'
import { getAllStudents } from '@/apis/student'
const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [{ name: '订单管理', path: '' }]
const allStudent = reactive<any>([])
const searchBarItems = reactive([
  { name: '订单编号', value: '' },
  {
    name: '支付渠道', value: '',
    type: InputType.Select,
    label: '请选择',
    options: [
      { name: '安卓', id: 1 },
      { name: 'IOS', id: 2 },
      { name: '后台下发', id: 3 }
    ],
    single: true
  },
  {
    name: '支付方式',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: [
      { name: '微信', id: 1 },
      { name: '支付宝', id: 2 },
      { name: '积分', id: 3 },
      { name: 'T币', id: 4 },
      { name: '后台下发', id: 5 }
    ],
    single: true
  },//1微信 2支付宝 3积分 4T币 5后台下发
  {
    name: '订单状态',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: [
      { id: '1', name: '待支付', },
      { id: '2', name: '已支付' },
      { id: '3', name: '已退课', }
    ],
    single: true
  },
  {
    name: '学生',
    value: '',
    type: InputType.Select,
    label: '请输入',
    options: allStudent,
    single: true
  },
])

const loading = ref(true)

const tableColumns = [
  {
    dataKey: 'orderSn',
    key: 'orderSn',
    title: '订单编号',
    width: 240
  },
  {
    dataKey: 'productCover',
    key: 'productCover',
    title: '商品封面',
    width: 100,
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
    width: 260
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    align: 'center',
    width: 100
  },
  {
    dataKey: 'totalAmount',
    key: 'totalAmount',
    title: '总价值',
    cellRenderer: (item: any) => {
      return (
        <>
          <span>{
            item.rowData.payType == 1 || item.rowData.payType == 2
              ? item.rowData.totalAmount + '分'
              : item.rowData.totalAmount + '￥'
          }</span>
        </>
      )
    },
    align: 'center',
    width: 70
  },
  {
    dataKey: 'payAmount',
    key: 'payAmount',
    title: '支付价格',
    cellRenderer: (item: any) => {
      return (
        <>
          <span>{
            item.rowData.payType == 1 || item.rowData.payType == 2 ? item.rowData.totalAmount + '分'
              : item.rowData.payType == 5 ? '后台下发'
                : item.rowData.totalAmount + '￥'
          }</span>
        </>
      )
    },
    align: 'center',
    width: 80
  },
  {
    dataKey: 'payType',
    key: 'payType',
    title: '支付方式',
    align: 'center',
    width: 100,
    cellRenderer: (cellData: any) => (
      <span>
        {
          cellData.cellData == 1 ? "微信"
            : cellData.cellData == 2 ? "支付宝"
              : cellData.cellData == 3 ? "积分"
                : cellData.cellData == 4 ? "T币"
                  : "后台下发"
        }
      </span>
    )
  },
  {
    dataKey: 'payChannel',
    key: 'payChannel',
    title: '支付渠道',
    align: 'center',
    width: 100,
    cellRenderer: (cellData: any) => (
      <span>
        {
          cellData.cellData == 1 ? "安卓"
            : cellData.cellData == 2 ? "IOS"
              : "后台下发"
        }
      </span>
    )
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    align: 'center',
    width: 100,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "已付款" : cellData.cellData == 2 ? "已付款" : "已退课"}
      </span>
    )
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
    payChannel: searchBarItems[1].value,
    payType: searchBarItems[2].value,
    status: searchBarItems[3].value,
    studentId: searchBarItems[4].value,
  }
  getOrder(args)
    .then((res) => {
      getAllStudents().then((res: any) => {
        allStudent.length = 0
        res.data.forEach((item: any) => {
          allStudent.push(item)
        })
      })
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()

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

const deleteTea = (item: any) => {
  cancelOrder({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.id + '退课成功',
          type: 'success'
        })
      } else if (item.rowData.status == 3) {
        ElNotification({
          title: '失败',
          message: '已经退课',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '退课失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '退课未成功',
        type: 'error'
      })
    })
    .finally(
      () => { loadData() }
    )
}

</script>

<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData" :loading="loading"
    :itemsTotalLength="totalLength" @paginationChange="loadData" :row-height="59">
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
