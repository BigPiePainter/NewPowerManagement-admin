<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' },{name:'考试咨询'}]

const tableColumns = [
  {
    dataKey: 'context',
    key: 'context',
    title: '咨询内容（最长25字）',
    width: 500
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
  id: '1',
  context: 'hhhoddly轮廓考六级类目利口酒立刻没离开4旅客零开局3老娘们课件3零空间',
}

const tableData: object[] = []

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  data.id += index
  tableData.push(data)
}

console.log(tableData)
</script>

<template>
  <TablePage class="info-table" :columns="tableColumns" :data="tableData">
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-info-button" type="primary">新增</el-button>
    </div>
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.info-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-info-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
</style>
