<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '积分管理', path: '' },
  { name: '学生积分', path: '' },
]

const items = reactive([
  { name: '班级', value: '', type:InputType.Select, label:"请选择"},
  { name: '用户姓名', value: '', type:InputType.Select, label:"请选择"},
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '用户ID',
    width: 120
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200,
  },
  {
    dataKey: 'studenName',
    key: 'studenName',
    title: '学生姓名',
    width: 150
  },
  {
    dataKey: 'studentGrade',
    key: 'studentGrade',
    title: '年级',
    width: 100
  },
  {
    dataKey: 'studentCellNumber',
    key: 'studentCellNumber',
    title: '手机号',
    width: 200,
  },
  {
    dataKey: 'accumulatePoint',
    key: 'accumulatePoint',
    title: '累计积分数',
    width: 100,
  },
  {
    dataKey: 'spentPoint',
    key: 'spentPoint',
    title: '消耗积分数',
    width: 100,
  }, 
   {
    dataKey: 'presentPoints',
    key: 'presentPoints',
    title: '当前积分数',
    width: 200,
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          变更积分数
        </el-button>
      </>
    ),

    width: 100,
    fixed: 'right',
    align: 'left'
  }
]

let fakeData = {
  id: '1',
  userName: 'askldjkasjdlkasld',
  studentCellNumber: '15536996997',
  studentGrade: '9',
  accumulatePoint:"2790",
  studenName: '张家豪',
  spentPoint:'2010',
  presentPoints:'780',
}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
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
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
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
