<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'


const router = useRouter()

const studentName = (props: any) => {
  console.log(props)
  router.push({ path: 'student-detail-management', query: { id: props.rowData.id } })
}

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
    width: 80,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => studentName(cellData)}>{cellData.cellData}</ElButton>,
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
    width: 100
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
    width: 200
  },
  {
    dataKey: 'note',
    key: 'note',
    title: '备注',
    width: 120
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
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            重置密码
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </div>
      )
    },
    width: 170,
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
  createTime: "2023-9-19 18:23",
  loginTime: "2012-12-22 19:23",
  studentGrade: "9",
  parentCellnumber: "15623423498",
  note: "这里是备注"

}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index;
  tableData.push(data)
}

const showDialog = ref(false)

const createStudent = () => {
  showDialog.value = true
}
const confrom = () => {
  showDialog.value = false
}
const cancel = () => {
  showDialog.value = false
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
      <el-button class="ARMbutton" type="primary" @click="createStudent">新建学生</el-button>
    </div>
   
  </TablePage>



  <el-dialog v-model="showDialog" width="370px">
    <template #header>
      <el-text>新建学生</el-text>
    </template>
    <div style="height: 300px;">

      <div class="input">
        <div class="input-word">*用户名:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">*姓名:</div>
        <ElInput class="input-input" placeholder="请输入"/>
      </div>
      <div class="input">
        <div class="input-word">*密码:</div>
        <ElInput class="input-input" placeholder="6-20位,建议包含数字与字母"/>
      </div>
      <div class="input">
        <div class="input-word">年级:</div>
        <ElInput class="input-input" placeholder="请输入"/>
      </div>
      <div class="input">
        <div class="input-word">学科:</div>
        <ElInput class="input-input" placeholder="请输入"/>
      </div>
      <div class="input">
        <div class="input-word">手机号码:</div>
        <ElInput class="input-input" placeholder="请输入"/>
      </div>
    </div>
    <template #footer>
      <ElButton @click="confrom">取消</ElButton>

      <ElButton type="primary" @click="cancel">确认</ElButton>

    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.ARMbutton {
  margin-top: $gap;
}
.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;
}

.div-search-bar {
  margin: $gap;
}

.input {
  display: flex;
  flex-direction: row;
  width: 320px;
  margin-bottom: 10px;
  

}

.input-word{
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width :80px;
  padding-right: 10px;
  

}

.input-input{
  display: flex;
  justify-content: flex-start;
  width: 200px;
  height: 32px;
}



</style>
