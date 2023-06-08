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
  { name: '学生管理', path: '/account-student-management' },
]
const items = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "", },
  { name: "电话", value: "" },

])


const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 60
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 80
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 160
  },
  {
    dataKey: 'expiryDate',
    key: 'expiryDate',
    title: '有效期',
    width: 70
  },
  {
    dataKey: 'studentGrade',
    key: 'Studentgrade',
    title: '年级',
    width: 70
  },
  {
    dataKey: 'studentCellnumber',
    key: 'studentCellnumber',
    title: '手机号码',
    width: 150
  },
  {
    dataKey: 'parentCellnumber',
    key: 'parentCellnumber',
    title: '手机号码',
    width: 160
  },
  {
    dataKey: 'gender',
    key: 'gender',
    title: '性别',
    width: 70
  },
  {
    dataKey: 'createTime',
    key: 'createTime',
    title: '创建时间',
    width: 160
  },
  {
    dataKey: 'note',
    key: 'note',
    title: '备注',
    width: 100
  },
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登陆时间',
    width: 200
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
          重置密码
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
  studentName: 'Aaron',
  expiryDate: '9y',
  userName: 'Aaron191518',
  studentCellnumber: "15536996997",
  gender: 'male',
  createTime: "2011-9-19 18:23",
  loginTime: "2012-12-22 19:23",
  studentGrade: "9",
  parentCellnumber: "1562342349800",
  note: "这里是备注"

}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index;
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
