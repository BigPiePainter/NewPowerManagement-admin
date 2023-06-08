<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import {InputType} from '@/type'


const items = reactive([
  { name: "", value: "",label:"学生", type: InputType.Select },
  { name: "姓名/用户名", value:""}
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
    width: 150,
    fixed: 'right',
    align: 'center'
  }
]

const tableData: object[] = [{ id: '1456', studentName: 'Aaron', userName: 'Aaron191518',eqipmentModel:'iphone',tiedTime: "2011-9-19 18:23", loginTime:"2012-12-22 19:23" }]

const fakeData = { id: '123456', studentName: 'Aaron', userName: 'Aaron191518' ,eqipmentModel:'android',tiedTime: "2011-9-19 18:23", loginTime:"2012-12-22 19:23" }

const generateData = (data: object[], fakeItem: object) => {
  for (let i = 0; i < 1000; i++) {
    data.push(fakeItem)
  }
}


generateData(tableData, fakeData)
console.log(tableData)

const refresh = () => {
  console.log(items)
}

</script>


<template>
    <div>
<div class="div-search-bar ">
    <SearchBar :items="items" @change="refresh()"></SearchBar>
</div>

  </div>

  <TablePage class="table" :columns="tableColumns" :data="tableData">
      </TablePage>
</template>

<style scoped lang="scss">

  .table{

  }


.div-search-bar {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;

  > .search-bar-button {
    max-width: 70px;
    max-height: 30px;
    margin-left: 12px;
  }

}
</style>
