<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '角色管理', path: '/account-role-managment' },
]

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'roleName',
    key: 'roleName',
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
    dataKey: 'creatorName',
    key: 'creatorName',
    title: '创建者',
    width: 200
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    width: 200
  },
  {
    dataKey: 'Note',
    key: 'Note',
    title: '备注',
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
          关闭
        </el-button>
        <el-button link type="primary" class="">
          删除
        </el-button>
      </>
    ),
    width: 150,
    fixed: 'right',
    align: 'left'
  }
]

const tableData: object[] = [
  {
    id: '1',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '2',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '3',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '4',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '5',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '6',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '7',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '8',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '9',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '10',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '11',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '12',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '13',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  },
  {
    id: '14',
    roleName: 'Aaron',
    userName: 'Aaron191518',
    creatorName: '系统管理员',
    status: "启用",
    Note: "这里是备注"
  }
]

</script>


<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div>
      <el-button class="ARMbutton">新建学生</el-button>
    </div>

  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: calc($page-height);
  margin-left: $gap;
  //margin-right: $gap;
}

.ARMbutton {
  margin-left: 37.5px;
  margin-top: 15px;
  margin-bottom: 15px;

}
</style>
