<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '题目管理', path: '' },
]

const items = reactive([
  { name: '年级', value: '', type:InputType.Select, label:"请选择"},
  { name: '学科', value: '', type:InputType.Select, label:"请选择"},
  { name: '难度', value: '', type:InputType.Select, label:"请选择"},
  { name: '好题名称', value:''}
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 120
  },
  {
    dataKey: 'questionName',
    key: 'questionName',
    title: '好题名称',
    width: 200,
    cellRenderer: ({ cellData: questionName }:any) => <ElButton link type='primary'>{questionName}</ElButton>,
  },
  {
    dataKey: 'questionAmount',
    key: 'questionAmount',
    title: '好题数量',
    width: 150
  },
  {
    dataKey: 'studentGrade',
    key: 'studentGrade',
    title: '年级',
    width: 100
  },
  {
    dataKey: 'studentSubject',
    key: 'studentSubject',
    title: '学科',
    width: 100,
  },
  {
    dataKey: 'questionDifficulty',
    key: 'questionDifficulty',
    title: '难度',
    width: 100,
  },
  {
    dataKey: 'questionTag',
    key: 'questionTag',
    title: '标签',
    width: 100,
  }, 
   {
    dataKey: 'questionCreatTime',
    key: 'questionCreatTime',
    title: '创建时间',
    width: 200,
  },
  {
    dataKey: 'lastChangeTime',
    key: 'lastChangeTime',
    title: '最后更新时间',
    width: 200,
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          下发
        </el-button>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="primary" class="">
          删除
        </el-button>
      </>
    ),

    width: 180,
    fixed: 'right',
    align: 'left'
  }
]

let fakeData = {
  id: '1',
  questionName: '超级提高题',
  studentSubject: '数学',
  studentGrade: '9',
  questionDifficulty:"★★★★",
  questionAmount: '20',
  lastChangeTime:'2019-8-17 20:082',
  questionCreatTime: '2019-8-17 20:082',
  questionTag: '-'
}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.studentGrade += index
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
    <div>
      <el-button>新建好题</el-button>
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
