<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'


const items = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
  { name: "年级", value: "", type: InputType.Select, label: "请选择" },
  { name: "学科", value: "", type: InputType.Select, label: "请选择" },

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

const tableData: object[] = [
  {
    id: '1',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '2',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },

  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    studentName: 'Aaron',
    userName: 'Aaron191518',
    eqipmentModel: 'iphone',
    tiedTime: "2011-9-19 18:23",
    loginTime: "2012-12-22 19:23"
  }
  
]



console.log(tableData)

const refresh = () => {
  console.log(items)
}

</script>


<template>
  <TablePage class="table-page table" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar ">
      <SearchBar :items="items" @change="refresh()"></SearchBar>


    </div>
  </TablePage>
</template>

<style scoped lang="scss">

.table {

  width: $page-width;
  height: 82.5vh;
}



.div-search-bar {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;

  >.search-bar-button {
    max-width: 70px;
    max-height: 30px;
    margin-left: 12px;
  }

}
</style>
