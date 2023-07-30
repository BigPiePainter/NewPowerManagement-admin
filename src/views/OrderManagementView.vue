<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [{ name: '订单管理', path: '' }]

const items = reactive([
  { name: '订单号', value: '' },
  { name: '商品名称', value: '', label: '请输入' },
  { name: '商品类型', value: '', type: InputType.Select, label: '请选择' },
  { name: '订单状态', value: '', type: InputType.Select, label: '全部商品' },
  { name: '订单时间', value: '', type: InputType.Select, label: '请选择' },
])

const url = '/1.jpg'

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 100
  },
  {
    dataKey: 'poster',
    key: 'poster',
    title: '商品信息',
    width: 150,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.poster}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.poster]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 200
  },
  {
    dataKey: 'price',
    key: 'price',
    title: '价格',
    width: 200
  },
  {
    dataKey: 'categories',
    key: 'categories',
    title: '支付积分',
    width: 200
  },
  {
    dataKey: 'tag',
    key: 'tag',
    title: '订单编号',
    width: 200
  },

  {
    dataKey: 'shopStatue',
    key: 'shopStatue',
    title: '支付时间',
    Fwidth: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            退课
          </el-button>
        </>
      )
    },
    width: 370,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]

let fakeData = {
  id: '1',
  poster: '/1.jpg',
  userName: '超级提高题',
  tag: '120312312',
  studentName: '9',
  price: '200',
  categories: '23T币/',
  version: '提高版',
  sold: '2112',
  shopStatue: '2011-11-23'
}

const tableData: object[] = []

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  data.id += index
  tableData.push(data)
}

console.log(tableData)

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData" :row-height="59">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
    </div>
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-poster-button" type="primary">新建商品</el-button>
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
