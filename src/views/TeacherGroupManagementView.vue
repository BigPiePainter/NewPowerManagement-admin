<script setup lang="ts">
import { ref, reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue'
import {useRouter} from 'vue-router'
const router = useRouter()

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '学校管理', path: '' }, { name: '教研组管理', path: '/class-management' }]

const items = reactive([
  { name: "教研组名称", value: "" },
  { name: "教研组组长", value: "" },
])

const tableData = reactive<object[]>([{
  id: '12345',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
},{
  id: '54321',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
},{
  id: '666345',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}])
const fakeData = reactive([{
  id: '12345',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}])
const pushData = () => {
  for (let i = 0; i < 10; i++) {
    tableData.push(fakeData[0])
  }
  console.log(tableData)
}
pushData()

const clickDetail = (rowData:string) => {
  console.log(rowData)
  router.push('teacher-group-detail')
}
const editItem = () => { }
const deleteItem = () => { }

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <div class="div-teacher-group-management">
    <div>
      <SearchBar class="search-bar" :items="items" @change="refresh()" />
    </div>
    <div class="table-div">
      <el-button class="new-teacher-group-button">新建教研组</el-button>
      <el-table class="table-teacher-group-management" :data="tableData">
        <el-table-column fixed prop="id" label="ID" />
        <el-table-column prop="teacherGroupName" label="教研组名称">
          <template #default="scope">
            <el-button link type="primary" @click="clickDetail(scope.row.id)">{{ scope.row.teacherGroupName }} </el-button>
          </template>
        </el-table-column>
        <el-table-column prop="groupLeader" label="教研组组长" />
        <el-table-column prop="memberNum" label="成员人数" />
        <el-table-column prop="createDate" label="创建时间" />
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
.div-teacher-group-management{
  height: $page-height;
  flex-grow: 1;
}
.table-teacher-group-management {
  margin-top: 15px;
  margin-left: 15px;
  padding-bottom: 20px;
  width: calc($page-width - 20px);
  box-sizing: border-box;
}
.new-teacher-group-button {
  margin-top: 15px;
  margin-left: 15px;
  max-height: 30px;
}
</style>