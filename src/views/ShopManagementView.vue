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
breadcrumbStore.data = [{ name: '商城管理', path: '' }]

const items = reactive([
  { name: '商品名称', value: '' },
  { name: '类型', value: '', type: InputType.Select, label: '请选择' },
  { name: '状态', value: '', type: InputType.Select, label: '请选择' },
  { name: '年级', value: '', type: InputType.Select, label: '请选择' },
  { name: '学科', value: '', type: InputType.Select, label: '请选择' },
  { name: '标签', value: '', type: InputType.Select, label: '请选择' }
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
    title: '海报',
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
    dataKey: 'shopName',
    key: 'shopName',
    title: '名称',
    width: 120
  },
  {
    dataKey: 'grade',
    key: 'grade',
    title: '年级',
    width: 80
  },
  {
    dataKey: 'className',
    key: 'className',
    title: '课程类目',
    width: 100
  },
  {
    dataKey: 'price',
    key: 'price',
    title: '价格',
    width: 80
  },
  {
    dataKey: 'categories',
    key: 'categories',
    title: '分类',
    width: 60
  },
  {
    dataKey: 'tag',
    key: 'tag',
    title: '标签',
    width: 60
  },

  {
    dataKey: 'version',
    key: 'version',
    title: '版本',
    width: 60
  },
  {
    dataKey: 'sold',
    key: 'sold',
    title: '已售',
    width: 60
  },
  {
    dataKey: 'shopStatue',
    key: 'shopStatue',
    title: '状态',
    Fwidth: 100
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            下发订单
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            添加为热门商品
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            上架/下架
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
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
  shopName: '超级提高题',
  tag: '数学',
  grade: '9',
  price: '200',
  categories: '数学',
  version: '提高版',
  sold: '2112',
  shopStatue: '在售中'
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
