<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { ElButton } from 'element-plus'
import SearchBar from '../components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useBreadcrumbStore } from '@/stores/breadcrumb'
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

const dialogShow = ref(false);
const creatNewClass = () => {
  dialogShow.value = true;
}

const tableData = reactive<object[]>([
  {
    id: 12345,
    className: '666',
    teacher: '庄老师',
    grade: '9年级',
    major: '语文',
    studentNum: '20',
    untilDate: '2021-12-02',
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
      untilDate: '2021-12-02',
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
    dataKey: 'untilDate',
    key: 'untilDate',
    title: '到期时间',
    width: 150
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => editItem(item)}>编辑</ElButton>
          <ElButton link type='primary' onClick={() => deleteItem(item)}>删除</ElButton>
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

const editItem = (props: object) => {
  console.log(props);
}

const deleteItem = (props: object) => {
  console.log(props);
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
        <el-button class="new-class-button" @click="creatNewClass()">新建班级</el-button>
      </div>
    </TablePage>
  </div>

  <el-dialog class="new-class-dialog" width="370px" v-model="dialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *班级名称：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *负责老师：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *起始时间：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *到期时间：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-input class="dialog-input" placeholder="请输入">

        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>新建班级</el-text>
    </template>
    <template #footer>
      <el-button type="primary">确定</el-button>
      <el-button>
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