<script setup lang="tsx">

import { getTeachers } from '@/apis/accountTeacherManagement'
import { getGrades } from '@/apis/getGrades'
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'


const router = useRouter()

const newClassData = reactive<{
  className: string,
  teacher: string,
  startDate: string,
  endDate: string,
  major: string,
  grade: string,

}>({

  className: '',
  teacher: '',
  startDate: '',
  endDate: '',
  major: '',
  grade: '',

});

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
]

const selectOptionGrades = reactive<any>([])
const searchBarItems = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
  { name: "年级", value: "", type: InputType.Select, label: "请选择", options: selectOptionGrades},
  { name: "学科", value: "", type: InputType.Select, label: "请选择", options: '' },
])

const clickName = (props: any) => {
  console.log(props)
  router.push({ path: 'teacher-detail-managament', query: { id: props.rowData.id } })
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '姓名',
    width: 200,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => clickName(cellData)} class="detailed">{cellData.cellData}</ElButton>,
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'teacherGrade',
    key: 'teacherGrade',
    title: '年级',
    width: 100
  },
  {
    dataKey: 'teacherSubject',
    key: 'teacherSubject',
    title: '学科',
    width: 100
  },
  {
    dataKey: 'teacherCellnumber',
    key: 'teacherCellnumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登录时间',
    width: 300,
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
          <el-button link type="primary" onClick={() => console.log(item)}>
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

const tableData = reactive<any>([])

console.log(tableData)

// const searchRequirements = reactive({
//   account: '',
//   name: '',
//   phoneNumber: '',
//   grade: '',
//   subject: ''
// })

const refresh = (prop:any) => {
  console.log(prop)
  // searchRequirements.account = prop[0].value,
  // searchRequirements.name = prop[1].value,
  // searchRequirements.phoneNumber = prop[2].value,
  // searchRequirements.grade = prop[3].value,
  // searchRequirements.subject = prop[4].value
  loadPageData(paginationInfo)
}

const showDialog = ref(false)

const createTeacher = () => {
  showDialog.value = true

}

const deleteTeacher = () => {
  showDialog.value = false

}

const conformTeacher = () => {
  showDialog.value = false

}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})

const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    var dataSample = {
      id: item.id,
      teacherName: item.name,
      userName: item.account,
      teacherGrade: item.gradeName,
      teacherSubject: item.subjectName,
      teacherCellnumber: item.phoneNumber,
      loginTime: item.lastLoginTime
    }
    tableData.push(dataSample)
  });
  console.log(tableData)
}

const totalLength = ref<Number>()

const loadSelectOption = () => {
  getGrades()
    .then((res) => {
      selectOptionGrades.length = 0
      res.data.forEach((item: any) => {
        // var dataSample = {
        //   id: item.id,
        //   level: item.level,
        //   name: item.name
        // }
        // selectOptionGrades.push(dataSample)

        item.subset.forEach((item: any) => {
          var dataSample = {
            id: item.id,
            level: item.level,
            name: item.name
          }
          selectOptionGrades.push(dataSample)
        })
      })
      console.log(selectOptionGrades)
    })
    .catch()
}
loadSelectOption()

const loadPageData = (prop: any) => {
  console.log(prop)
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    account: searchBarItems[0].value,
    name: searchBarItems[1].value,
    phoneNumber: searchBarItems[2].value,
    gradeId: searchBarItems[3].value,
    subjectId: searchBarItems[4].value
  }
  console.log(args)
  getTeachers(args).then((res) => {
    console.log(res)
    dataCompute(res)
    totalLength.value = res.data.records.length
  })
    .catch(() => {

    });
}
loadPageData(paginationInfo)
</script>


<template>
  <TablePage class="page-container" :msg="totalLength" @paginationChange="loadPageData" :columns="tableColumns"
    :data="tableData">
    <div class="div-search-bar ">
      <SearchBar :items="searchBarItems" @change="refresh" :selectOptions="selectOptionGrades"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="createTeacher">新建老师</el-button>
    </div>
  </TablePage>

  <el-dialog v-model="showDialog" width="370px" class="new-class-dialog">

    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *用户名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.className">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *姓名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.teacher">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *密码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.endDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.major">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          手机号码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.grade">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>新建老师</el-text>

    </template>


    <template #footer>


      <el-button @click='conformTeacher' type="primary">确认</el-button>
      <el-button @click="deleteTeacher">取消</el-button>
    </template>
  </el-dialog>
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



.ARMbutton {
  margin-top: $gap;
}

.header {
  height: 50px;
}

.new-class-dialog {
  >.el-dialog__body {

    display: flex;
    align-items: center;
    flex-direction: column;

    >div {
      width: fit-content;

      >.div-input-element {
        display: flex;
        align-items: center;
        justify-content: right;
        margin-bottom: 13px;

        >.dialog-span {
          margin-right: 10px;
        }

        >.dialog-input {
          width: 200px;
        }
      }
    }
  }
}
</style>
@/apis/grade@/apis/teacher