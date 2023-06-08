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
  { name: '积分明细', path: '' },
]

const items = reactive([
  { name: '班级', value: '', type:InputType.Select, label:"请选择"},
  { name: '时间范围', value: '', type:InputType.Select, label:"请选择"},
  { name: '用户姓名', value:''}
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
    dataKey: 'studentType',
    key: 'studentType',
    title: '学生类型',
    width: 100,
  },
  {
    dataKey: 'pointReason',
    key: 'pointReason',
    title: '原因',
    width: 100,
  }, 
   {
    dataKey: 'userPointAmount',
    key: 'userPointAmount',
    title: '积分数',
    width: 200,
  },
  {
    dataKey: 'userPointTime',
    key: 'userPointTime',
    title: '时间',
    width: 200,
  }
]

let fakeData = {
  id: '1',
  userName: 'askldjkasjdlkasld',
  studentCellNumber: '15536996997',
  studentGrade: '9',
  studentType:"正式学生",
  studenName: '张家豪',
  pointReason:'购买课程',
  userPointAmount:'+10',
  userPointTime:'2022-11-11 20:23'
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
