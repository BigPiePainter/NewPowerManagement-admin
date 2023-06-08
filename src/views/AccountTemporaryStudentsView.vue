<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'


const items = reactive([
  { name: "姓名", value: "" },
  { name: "手机", value: ""}

])


const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200,
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 200,
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 200,
  },
  {
    dataKey: 'school',
    key: 'school',
    title: '学校',
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
        <el-button link type="primary" class="">
          删除
        </el-button>
      </>
    ),
    
    width: 300,
  fixed: 'right',
    align: 'center'
  }
]


let fakeData = {
  id: '1',
  studentName: 'Aaron',
  school: '上虞中学',
  phoneNumber: '155799928891',
  createTime: "2011-9-19 18:23",
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
  <div class="div-search-bar ">
    <SearchBar :items="items" @change="refresh()"></SearchBar>

  </div>
  <TablePage class="table-page table" :columns="tableColumns" :data="tableData">
  </TablePage>
</template>

<style scoped lang="scss">
.table {
  // margin-left: 15px;
  // margin-top: 15px;

  width: $page-width;
  height: $page-height;
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
