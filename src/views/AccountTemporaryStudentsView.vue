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
  { name: '临时学生管理', path: '/account-temoorary-student' },
]

const items = reactive([
  { name: '姓名', value: '' },
  { name: '手机', value: '' }
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 200
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 200
  },
  {
    dataKey: 'school',
    key: 'school',
    title: '学校',
    width: 200
  },
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登陆时间',
    width: 200,
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="primary" class="">
          转为正式学生
        </el-button>
        <el-button link type="primary" class="">
          重置密码
        </el-button>
        <el-button link type="danger" class="">
          删除
        </el-button>
      </>
    ),

    width: 270,
    fixed: 'right',
    align: 'left'
  }
]

let fakeData = {
  id: '1',
  studentName: 'Aaron',
  school: '上虞中学',
  phoneNumber: '155799928891',
  loginTime: '2023-9-19 18:23'
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
}

.div-search-bar {
  margin: $gap;
}
</style>
