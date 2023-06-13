<script setup lang="tsx">
import { ref, reactive, pushScopeId } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { functionExpression, react } from '@babel/types'
import { ElTag, ElImage } from 'element-plus'
import type { styleType } from 'element-plus/es/components/table-v2/src/common'
import { findLastIndex } from 'lodash'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '题目管理', path: '' }]

const items = reactive([
  { name: '商品名称', value: '' },
  { name: '类型', value: '', type: InputType.Select, label: "请选择" },
  { name: '年级', value: '', type: InputType.Select, label: "请选择" },
  { name: '状态', value: '', type: InputType.Select, label: "请选择" },
  { name: '学科', value: '', type: InputType.Select, label: "请选择" },
  { name: '标签', value: '', type: InputType.Select, label: "请选择" }
])

const url = '../public/1.jpg'

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 120,
    image: 1
  },

  {
    dataKey: 'poster',
    key: 'poster',
    title: '商品',
    width: 200
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
    width: 100
  },
  {
    dataKey: 'grade',
    key: 'grade',
    title: '年级',
    width: 150,
  },
  {
    dataKey: 'categories',
    key: 'categories',
    title: '课程类目',
    width: 100
  },
  {
    dataKey: 'price',
    key: 'price',
    title: '价格',
    width: 100,
  },
  {
    dataKey: 'classfiction',
    key: 'classfiction',
    title: '难度',
    width: 100
  },
  {
    dataKey: 'tag',
    key: 'tag',
    title: '标签',
    width: 100
  },
  {
    dataKey: 'questionCreatTime',
    key: 'questionCreatTime',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'lastChangeTime',
    key: 'lastChangeTime',
    title: '最后更新时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',

  },
  {
    dataKey: 'sold',
    key: 'sold',
    title: '已售',
    width: 200,
    // cellRenderer: ({ cellData: sold }) => <ElTag>{sold}</ElTag>,
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
  },        width: 300,
        fixed: 'right',
        align: 'center',
        height: 500
        
        },
      
    

]

let fakeData = {
  id: '1',
  poster: '超级提高题',
  studentSubject: '数学',
  studentGrade: '9',
  questionDifficulty: '★★★★',
  questionAmount: '20',
  lastChangeTime: '2019-8-17 20:082',
  questionCreatTime: '2019-8-17 20:082',
  questionTag: '-'
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

<template slot-scope="scope">
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
    </div>
    <div>
      <el-button class="new-poster-button" type="primary">新建商品</el-button>
    </div>
  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
}

.div-search-bar {
  margin: $gap;
}

.new-poster-button{
  margin-left: $gap;
  margin-bottom: $gap;
}

.displaypic {
  width: 100px;
  height: 100px;
}
</style>
