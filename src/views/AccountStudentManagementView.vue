<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getStudent } from '@/apis/studentManagement'


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
const searchBarItemsitems = reactive([
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
    width: 170
  },
  {
    dataKey: 'expiryDate',
    key: 'expiryDate',
    title: '有效期',
    width: 140
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
    width: 200
  },
  {
    dataKey: 'gender',
    key: 'gender',
    title: '性别',
    width: 70
  },
  {
    dataKey: 'parentCellnumber',
    key: 'parentCellnumber',
    title: '家长手机号码',
    width: 180
  },
  {
    dataKey: 'note',
    key: 'note',
    title: '备注',
    width: 120
  },
  {
    dataKey: 'createTime',
    key: 'createTime',
    title: '创建时间',
    width: 200
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



const tableData = reactive([{}])

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
const selectOptionGrades = reactive<any>([])

const searchBarItems = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 1
})


const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    var dataSample = {
      id: '',
      studentName: '',
      userName: '',
      studentCellnumber: '',
      note: '',
      gender: '',
      expiryDate: '',
      parentCellnumber: '',
      studentGrade: '',

    }


    dataSample.id = item.id
    dataSample.studentName = item.name
    dataSample.userName = item.account
    dataSample.studentCellnumber = item.phoneNumber
    dataSample.note = item.remark
    

    if (item.sex == 1) {
      item.sex = '男'
    }
    else {
      item.sex = '女'
    }
    //1为男生 2为女生 

    dataSample.gender = item.sex


    dataSample.expiryDate = item.expiration
    dataSample.parentCellnumber = item.phoneNumberOfParent
    dataSample.studentGrade = item.grade


    tableData.push(dataSample)
  });
  console.log(tableData)
}



const totalLength = ref<Number>()

const loadData = (prop: any) => {
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    account: searchBarItems[2].value,
    name: searchBarItems[0].value,
    phoneNumber: searchBarItems[1].value
  }
  getStudent(args).then((res) => {
    dataCompute(res)
    totalLength.value = res.data.records.length
  })
    .catch();
}

loadData(paginationInfo)

const refresh = () => {
  console.log(searchBarItems)
  loadData(paginationInfo)
}
</script>


<template>
  <TablePage class="page-container" :msg="totalLength" @paginationChange="loadData" :columns="tableColumns"
    :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" :selectOptions="selectOptionGrades" @change="refresh"></SearchBar>
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
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">*密码:</div>
        <ElInput class="input-input" placeholder="6-20位,建议包含数字与字母" />
      </div>
      <div class="input">
        <div class="input-word">年级:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">学科:</div>
        <ElInput class="input-input" placeholder="请输入" />
      </div>
      <div class="input">
        <div class="input-word">手机号码:</div>
        <ElInput class="input-input" placeholder="请输入" />
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

.input-word {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  padding-right: 10px;


}

.input-input {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  height: 32px;
}
</style>
@/apis/accountStudentManagement