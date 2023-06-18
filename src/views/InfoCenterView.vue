<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' },{name:'消息中心'}]

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '序号',
    width: 60
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 300
  },
  {
    dataKey: 'context',
    key: 'context',
    title: '内容',
    width: 800
  },
  {
    dataKey: 'reciver',
    key: 'reciver',
    title: '接收对象',
    width: 100
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 70,
    fixed: 'right',
    align: 'center',
  }
]

let fakeData = {
  id: '1',
  title: '超级提高题',
  context: '超级打折超级打折超级打折超级打折超级打折超级打折',
  reciver:'nick,mike'
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
  <TablePage class="msg-table" :columns="tableColumns" :data="tableData">
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-msg-button" type="primary">发消息</el-button>
    </div>
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.msg-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-msg-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
</style>
