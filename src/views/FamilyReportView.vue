<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' },{ name: '家长报告', path: '' }]

const items = reactive([
  { name: 'AI课名称', value: '' },
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 100
  },
  {
    dataKey: 'courseName',
    key: 'courseName',
    title: '名称',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            {item.rowData.courseName}
          </el-button>
          <el-tag>
            {item.rowData.tag}
          </el-tag>
        </>
      )
    },
    width: 300
  },
  {
    dataKey: 'creatDate',
    key: 'creatDate',
    title: '创建时间',
    width: 180
  },
  {
    dataKey: 'wacthed',
    key: 'wacthed',
    title: '已看',
    width: 100
  },
  {
    dataKey: 'unwacthed',
    key: 'unwacthed',
    title: '未看',
    width: 80
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            查看学习报告
          </el-button>
        </>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]

let fakeData = {
  id: '1',
  courseName: '超级提高题',
  tag:'AI课',
  creatDate: '2023-01-09',
  wacthed: '200',
  unwacthed: '58',
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
  <TablePage class="report-page" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
    </div>
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.report-page {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;

  .div-search-bar {
    margin: $gap;
  }
}
</style>
