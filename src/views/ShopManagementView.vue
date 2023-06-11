<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { react } from '@babel/types'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '题目管理', path: '' },
]

const items = reactive([
  { name: '商品名称', value:''},
  { name: '类型', value: '', type:InputType.Select, label:"请选择"},
  { name: '年级', value: '', type:InputType.Select, label:"请选择"},
  { name: '状态', value: '', type:InputType.Select, label:"请选择"},
  { name: '学科', value: '', type:InputType.Select, label:"请选择"},
  { name: '标签', value:'', type:InputType.Select, label:"请选择"}
])


const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 120
  },
  {
    dataKey: 'poster',
    key: 'poster',
    title: "商品",
    width: 200,
   
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
  poster: '超级提高题',
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

<template  slot-scope="scope">
    <div class="demo-image__preview">
    <el-image

    />
  </div>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
    </div>
    <div>
      <el-button type="primary">新建商品</el-button>
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

.displaypic{
      width: 100px;
       height: 100px;
}

</style>
