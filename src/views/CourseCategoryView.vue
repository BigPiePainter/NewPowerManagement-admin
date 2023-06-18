<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { ElButton } from 'element-plus'
import SearchBar from '../components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const router = useRouter()


const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '班级管理', path: '/class-management' }
]

const items = reactive([
  { name: "班级名称", value: "", },
  { name: "负责老师", value: "" },
  { name: "年级", value: "" },
  { name: "学科", value: "" },
])

const newClassDialogShow = ref(false);
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
const creatNewClass = () => {
  newClassDialogShow.value = true;
}
const confirmNewClass = () => {
  console.log(newClassData)
  newClassDialogShow.value = false
}
const cancelNewClass = () => {
  newClassDialogShow.value = false
}

const tableData = reactive<object[]>([
  {
    id: 12345,
    className: '666',
    teacher: '庄老师',
    grade: '9年级',
    major: '语文',
    studentNum: '20',
    endDate: '2021-12-02',
  }
])

const pushData = () => {
  for (let i = 10086; i < 10200; i++) {
    var fakeData = {
      id: i,
      className: '智能中高考',
      teacher: '庄老师',
      grade: '9年级',
      major: '语文',
      studentNum: '20',
      endDate: '2021-12-02',
    }
    tableData.push(fakeData)
  }
}
pushData()

const tableColumns = reactive([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'className',
    key: 'className',
    title: '班级名称',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => clickDetail(item)}>{item.rowData.className}</ElButton>
        </div>
      )
    },
    width: 150
  },
  {
    dataKey: 'teacher',
    key: 'teacher',
    title: '负责老师',
    width: 150
  },
  {
    dataKey: 'grade',
    key: 'grade',
    title: '年级',
    width: 150
  },
  {
    dataKey: 'major',
    key: 'major',
    title: '学科',
    width: 150
  },
  {
    dataKey: 'studentNum',
    key: 'studentNum',
    title: '班级学生数量',
    width: 150
  },
  {
    dataKey: 'endDate',
    key: 'endDate',
    title: '到期时间',
    width: 150
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => editClass(item)}>编辑</ElButton>
          <ElButton link type='primary' onClick={() => deleteClass(item)}>删除</ElButton>
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])
const clickDetail = (props: { rowData: { id: string } }) => {
  console.log(props);
  router.push({ path: 'class-detail', query: { id: props.rowData.id } });
}

const editClassDialogShow = ref(false);
const editClassData = reactive<{
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
const editClass = (props: {
  rowData: {
    className: string,
    teacher: string,
    startDate: string,
    endDate: string,
    major: string,
    grade: string,
  }
}) => {
  console.log(props);
  editClassDialogShow.value = true;
  editClassData.className = props.rowData.className;
  editClassData.teacher = props.rowData.teacher;
  editClassData.startDate = props.rowData.startDate;
  editClassData.endDate = props.rowData.endDate;
  editClassData.major = props.rowData.major;
  editClassData.grade = props.rowData.grade;
}

const deleteClassDialogShow = ref(false);
const deleteClassData = reactive<{ className: string }>({ className: '' });
const deleteClass = (props: { rowData: { id:string, className: string}}) => {
  console.log(props);
  deleteClassDialogShow.value = true;
  deleteClassData.className = props.rowData.className
}

const confirmEditDialog = () => {
  console.log(editClassData)
  editClassDialogShow.value = false;
}
const cancelEditDialog = () => {
  editClassDialogShow.value = false;
}
const confirmDeleteDialog = () => {
  console.log(deleteClassData);
  deleteClassDialogShow.value = false;
}
const cancelDeleteDialog = () => {
  deleteClassDialogShow.value = false;
}

const refresh = () => {
  console.log(items);
}
</script>

<template>
  <div class="div-class-management">
    <TablePage class="table-page" :columns="tableColumns" :data="tableData">
      <div class="div-search-bar">
        <SearchBar :items="items" @change="refresh()" />
      </div>
      <div class="table-div">
        <el-button class="new-class-button" type="primary" @click="creatNewClass()">新建班级</el-button>
      </div>
    </TablePage>
  </div>

  <el-dialog class="new-class-dialog" width="370px" v-model="newClassDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *班级名称：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.className">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *负责老师：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.teacher">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *起始时间：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *到期时间：
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
          年级：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.grade">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>新建班级</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewClass()">确定</el-button>
      <el-button @click="cancelNewClass()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="editClassDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *班级名称：
        </span>
        <el-input class="dialog-input" v-model="editClassData.className">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *负责老师：
        </span>
        <el-input class="dialog-input" v-model="editClassData.teacher">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *起始时间：
        </span>
        <el-input class="dialog-input" v-model="editClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *到期时间：
        </span>
        <el-input class="dialog-input" v-model="editClassData.endDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-input class="dialog-input" v-model="editClassData.major">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-input class="dialog-input" v-model="editClassData.grade">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>编辑班级</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="deleteClassDialogShow">
    <template #header>
      <el-text>确定删除班级</el-text>
    </template>
    <span>
      {{ deleteClassData.className }}
    </span>
    <template #footer>
      <el-button type="danger" @click="confirmDeleteDialog()">确定</el-button>
      <el-button @click="cancelDeleteDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap : 15px;

.div-search-bar {
  margin: $gap;
}

.div-class-management {
  height: $page-height;
  flex-grow: 1;
}

.table-page {
  width: calc($page-width - $gap);
  margin-left: $gap;
}

.new-class-button {
  margin-left: $gap;
  margin-bottom: $gap;
}
</style>

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color
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