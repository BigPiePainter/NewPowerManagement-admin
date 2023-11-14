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

const author = JSON.parse(localStorage.author)
const totalLength = ref<Number>()
const tableData = reactive<any>([])
const loading = ref(true)
const allStudent = reactive<any>([])
const searchBarItems = reactive([
  { name: '订单编号', value: '' },
  {
    name: '支付渠道',
    value: '',
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

const tableColumns = reactive([
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
    cellRenderer: (item: any) => {
      return (
        <el-image
          fit="scale-down"
          src={item.rowData.productCover ? item.rowData.productCover : item.rowData.coursesQuestionPackagesCover}
          //onClick={()=>console.log(item)}
          className="shop-Preview"
          preview-src-list={[item.rowData.productCover ? item.rowData.productCover : item.rowData.coursesQuestionPackagesCover]}
          preview-teleported
        />
      )
    }
  },
  {
    dataKey: 'productName',
    key: 'productName',
    title: '商品名称',
    width: 180,
    cellRenderer: (item: any) => {
      return (
        <span>{item.rowData.productName ? item.rowData.productName : item.rowData.coursesQuestionPackagesName}</span>
      )
    }
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
            item.rowData.payType == 1 || item.rowData.payType == 2 ? Number(item.rowData.totalAmount / 100) + '￥'
              : item.rowData.payType == 3 ? item.rowData.totalAmount + '积分'
                : item.rowData.payType == 4 ? item.rowData.totalAmount + 'T币'
                  : '后台下发'
          }</span>
        </>
      )
    },
    align: 'center',
    width: 80
  },
  {
    dataKey: 'payAmount',
    key: 'payAmount',
    title: '支付价格',
    cellRenderer: (item: any) => {
      return (
        <>
          <span>{
            item.rowData.payType == 1 || item.rowData.payType == 2 ? Number(item.rowData.payAmount / 100) + '￥'
              : item.rowData.payType == 3 ? item.rowData.payAmount + '积分'
                : item.rowData.payType == 4 ? item.rowData.payAmount + 'T币'
                  : '后台下发'
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
    width: 80,
    cellRenderer: (item: any) => {
      return (
        <span>
          {
            item.rowData.payType == 1 ? "微信"
              : item.rowData.payType == 2 ? "支付宝"
                : item.rowData.payType == 3 ? "积分"
                  : item.rowData.payType == 4 ? "T币"
                    : "后台下发"
          }
        </span>
      )
    }
  },
  {
    dataKey: 'payChannel',
    key: 'payChannel',
    title: '支付渠道',
    align: 'center',
    width: 100,
    cellRenderer: (item: any) => {
      return (
        <span>
          {
            item.rowData.payChannel == 1 ? "安卓"
              : item.rowData.payChannel == 2 ? "IOS"
                : "后台下发"
          }
        </span>
      )
    }
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    align: 'center',
    width: 100,
    cellRenderer: (item: any) => {
      return (
        <span>
          {item.rowData.status == 1 ? "已付款" : item.rowData.status == 2 ? "已付款" : "已退课"}
        </span>
      )
    }
  },
  {
    dataKey: 'payTime',
    key: 'payTime',
    title: '支付时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      const deleteSlot = {
        reference: () => <el-button disabled={!author.orderEdit} link type="danger">退课</el-button>
      }
      return (
        <>
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`将 ${item.rowData.studentName} 的 ${item.rowData.productName ? item.rowData.productName : item.rowData.coursesQuestionPackagesName} 退课吗`}
            onConfirm={() => deleteBought(item)}
            v-slots={deleteSlot}
          />
        </>
      )
    },
    width: 70,
    fixed: 'right',
    align: 'center'
  }
])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}

const deleteBought = (item: any) => {
  cancelOrder({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '退课成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '退课失败',
          message: res.msg,
          type: 'error'
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    })
}

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
  console.log(args)
  getOrder(args)
    .then((res: any) => {
      tableData.length = 0
      res.data.records.forEach((item: any) => {
        tableData.push(item)
      })
      console.log(tableData)
      totalLength.value = res.data.total
      return getAllStudents() 
    })
    .then((res: any) => {
      allStudent.length = 0
      res.data.forEach((item: any) => {
        allStudent.push(item)
      })
      loading.value = false
    })
    .catch()
}
loadData()
</script>

<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData" :loading="loading"
    :itemsTotalLength="totalLength" @paginationChange="pageChange" :row-height="59">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
  </TablePage>
</template>

<style lang="scss" scoped>
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
