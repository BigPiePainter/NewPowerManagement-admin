<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' },{name:'考试时间'}]

const tableColumns = [
  {
    dataKey: 'studyState',
    key: 'studyState',
    title: '学习阶段',
    width: 80
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 300
  },  
  {
    dataKey: 'date',
    key: 'date',
    title: '时间',
    width: 120
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
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
  studyState: '初中',
  title: '距离中考时间',
  date: '287天',
}

const tableData: object[] = []

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  tableData.push(data)
}

console.log(tableData)
</script>

<template>
  <TablePage class="exam-date-table" :columns="tableColumns" :data="tableData">
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.exam-date-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;
}
</style>
