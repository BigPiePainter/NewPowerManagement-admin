<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '账号设备管理', path: '/acount-equipment-management' }
]

const items = reactive([
  { name: '学生', value: '', label: '学生', type: InputType.Select },
  { name: '姓名/用户名', value: '' }
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },

  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 200
  },

  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },

  {
    dataKey: 'eqipmentModel',
    key: 'eqipmentModel',
    title: '设备型号',
    width: 200
  },

  {
    dataKey: 'systemModel',
    key: 'eqipmentModel',
    title: '系统版本号',
    width: 200
  },

  {
    dataKey: 'tiedTime',
    key: 'iedTime',
    title: '绑定时间',
    width: 200
  },
  
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登录时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          解绑
        </el-button>
      </>
    ),
    width: 60,
    fixed: 'right',
    align: 'center'
  }
]

const tableData: object[] = []

const fakeData = {
  id: '',
  studentName: 'Zack',
  userName: 'Aaron191518',
  eqipmentModel: '苹果12',
  systemModel: 'iphone',
  tiedTime: '2023-9-19 18:23:33',
  loginTime: '2012-12-22 19:23:22'
}

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
