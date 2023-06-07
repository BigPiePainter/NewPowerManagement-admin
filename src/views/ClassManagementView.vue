<script setup lang="ts">
import { ref, reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue'

const items = reactive([
  { name: "班级名称", value: "" },
  { name: "负责老师", value: "" },
  { name: "年级", value: "" },
  { name: "学科", value: "" },
])

const tableData = reactive<object[]>([])
const fakeData = reactive([{
  id: '12345',
  className: '智能中高考',
  teacher: '庄老师',
  grade: '9年级',
  major: '语文',
  studentNum: '20',
  untilDate: '2021-12-02',
}])
const pushData = () => {
  for (let i = 0; i < 1000; i++) {
    tableData.push(fakeData[0])
  }
  console.log(tableData)
}
pushData()

const editItem = () => { }
const deleteItem = () => { }

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <div>
    <div>
      <SearchBar class="search-bar" :items="items" @change="refresh()" />
    </div>
    <div class="table-div">
      <el-button class="new-class-button">新建班级</el-button>
      <el-table class="table-class-management" :data="tableData">
        <el-table-column fixed prop="id" label="ID" />
        <el-table-column prop="className" label="班级名称" />
        <el-table-column prop="teacher" label="负责老师" />
        <el-table-column prop="grade" label="年级" />
        <el-table-column prop="major" label="学科" />
        <el-table-column prop="studentNum" label="班级学生数量" />
        <el-table-column prop="untilDate" label="到期时间" />
        <el-table-column fixed="right" label="操作" align="right">
          <template #default>
            <el-button link type="primary" size="small" @click="editItem()">编辑</el-button>
            <el-button link type="primary" size="small" @click="deleteItem()">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  margin-top: 15px;
  margin-left: 17px;
  margin-right: 15px;
}

.cell {
  margin-right: 10px;
}

.table-class-management {
  margin-top: 15px;
  margin-left: 15px;
  padding-bottom: 20px;
  height: 650px;
  width: calc(100vw - $sidebar-width - 15px);
  box-sizing: border-box;
}

.new-class-button {
  margin-top: 15px;
  margin-left: 15px;
  max-height: 30px;
}
</style>