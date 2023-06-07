<script lang="ts" setup>
import { ref, reactive } from 'vue';

const test = reactive([
  { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" },
  { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" }, { id: "123456", roleName: "jlxmfzrjoisjd", creator: "系统管理员", status: "启用", note: "分校管理员" },
  { id: "234567", roleName: "jlxmfzrjoisjx", creator: "系统管理员", status: "关闭", note: "超级管理员" },
])

const handleClick = () => {
  console.log('click')
}

//预留接口
//  const tableData = reactive([{
//   id: "",
//   roleName: "",
//   creator: "",
//   status: "",
//   note: "",
// }])

// const giveData = () => {
//   for (let i = 0; i < 10; i++) {
//     tableData[i].id = "136494"
//     tableData[i].roleName = "nick"
//     tableData[i].creator = "nick"
//     tableData[i].status = "china"
//     tableData[i].note = "6"
//   }
// }



</script>



<template>
  <div class="page-container">
    
    <el-row class="account-management-button">
      <el-button>新建角色</el-button>
    </el-row>
    <el-table :data="test" class="account-management-table">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="roleName" label="角色名称" />
      <el-table-column prop="creator" label="创建人" />
      <el-table-column prop="status" label="状态" />
      <el-table-column prop="note" label="备注" />
      <el-table-column label="操作">
        <template #default>

          <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button link type="primary" size="small">关闭</el-button>
          <el-button link type="primary" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>



<style scoped lang="scss">
.page-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - $header-height - 50px);


  >.account-management-button {
    margin-left: 15px;
    margin-top: 28px;
  }

  >.account-management-table {
    display: flex;
    justify-content: flex-start;
    margin-left: 15px;
    margin-top: 10px;

    width: calc(100vw - $sidebar-width - 15px);

    flex-grow: 1;

  }
}
</style>