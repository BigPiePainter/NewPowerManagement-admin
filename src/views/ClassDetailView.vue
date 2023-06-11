<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRoute } from 'vue-router'
import { ElCheckbox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '班级管理', path: '/class-management' },
  { name: '班级详情', path: '/class-detail' }
]


const route = useRoute()

const searchBarItems = reactive([
  { name: "姓名/用户名", value: "" },
])
const activeName = ref('officalStudent')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
const dialogSearchBarItems = reactive([
  { name: "选择年级", value: "", label: "请选择", type: InputType.Select },
  { name: "姓名/用户名/电话", value: "", },
])

const dialogTableColumns = reactive<any>([
  {
    key: 'selection',
    width: 50,
    cellRenderer: (item: any) => {
      const onChange = (value: CheckboxValueType) => item.rowData.checked = value
      return <ElCheckbox modelValue={item.rowData.checked} onChange={onChange} />
    },
    headerCellRenderer: () => {
      const onChange = (value: CheckboxValueType) => {
        dialogTableData.forEach((i: any) => i.checked = value);
      }
      return <ElCheckbox onChange={onChange} modelValue={dialogTableData.every((i: any) => i.checked)} indeterminate={!dialogTableData.every((i: any) => i.checked) && dialogTableData.some((i: any) => i.checked)} />
    },
    checked: false,
  },
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 150
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'grade',
    key: 'grade',
    title: '年级',
    width: 150
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '电话',
    width: 200
  },
  {
    dataKey: 'joinDate',
    key: 'joinDate',
    title: '加入时间',
    width: 200
  },
])

const dialogTableData = reactive<any>([
  {
    checked: false,
    id: '1456',
    studentName: 'Mr.庄',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13294715926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '25',
    studentName: 'Mr.ir',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '12365415926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '457',
    studentName: 'Mr.空间',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13987415926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '22463',
    studentName: 'Mr.如图',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '15691415926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '568769',
    studentName: 'Mr.是的',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13856495926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '23536',
    studentName: 'Mr.进方',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13298989926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '45684',
    studentName: 'Mr.搞定',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13291415926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '2467',
    studentName: 'Mr.三个',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '12391415926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '97007',
    studentName: 'Mr.刷单',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '1329355926',
    joinDate: '2022-10-10'
  },
  {
    checked: false,
    id: '59664',
    studentName: 'Mr.锕',
    userName: 'Nick191518',
    grade: '高二',
    phoneNumber: '13291415926',
    joinDate: '2022-10-10'
  },
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '学生姓名',
    width: 200
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => deleteStudent(item)}>移除</ElButton>
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
]

const detailItem = reactive({
  className: '中考冲刺',
  teacher: 'Mr.庄',
  major: '科学',
  grade: '初三',
  startDate: '2023-01-01',
  endDate: '2023-06-01',
})

const deleteStudent = (props: object) => {
  console.log(props)
}
// const leftCardData: object = {}
console.log(route.query.id)
const tableData: object[] = [{ id: '1456', studentName: 'Nick', userName: 'Nick191518' }]

const fakeData = { id: '123456', studentName: 'Nick', userName: 'Nick191518' }

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index;
  tableData.push(data)
}

const refresh = () => {
  console.log(searchBarItems)
}

const addStudentDialogShow = ref(false);
const addStudent = () => {
  addStudentDialogShow.value = true;
}
const dialogSearchBarRefresh = () => {
  console.log(dialogSearchBarItems)
}
const confirmNewStudent = () => {
  let selectedRows = dialogTableData.filter((item: any) => item.checked)
  console.log(selectedRows)
  addStudentDialogShow.value = false
  dialogTableData.forEach((i: any) => i.checked = false);
}
const cancelNewStudent = () => {
  addStudentDialogShow.value = false;
  dialogTableData.forEach((i: any) => i.checked = false);
}
</script>

<template>
  <div class="div-class-detail">
    <div class="card-left">
      <div class="div-card-left-title">
        <el-text>
          基本信息
        </el-text>
      </div>

      <div class="div-card-left-detail">
        <div class="detail-info">
          <el-text class="el-text-detail">
            班级名称：{{ detailItem.className }}
          </el-text>
          <el-text class="el-text-detail">
            负责老师：{{ detailItem.teacher }}
          </el-text>
          <el-text class="el-text-detail">
            学科：{{ detailItem.major }}
          </el-text>
          <el-text class="el-text-detail">
            年级：{{ detailItem.grade }}
          </el-text>
        </div>
        <div class="detail-date">
          <el-text class="el-text-detail">
            起始日期：{{ detailItem.startDate }}
          </el-text>
          <el-text class="el-text-detail">
            到期日期：{{ detailItem.endDate }}
          </el-text>
        </div>

      </div>

    </div>
    <div class="card-right">
      <TablePage class="table-page" :columns="tableColumns" :data="tableData">
        <div class="div-search-bar">
          <SearchBar :items="searchBarItems" @change="refresh()"></SearchBar>
          <div style="flex-grow: 1"></div>
          <el-button class="search-bar-button" type="primary" @click="addStudent()">添加成员</el-button>
        </div>
      </TablePage>
    </div>
  </div>

  <el-dialog class="class-detail-dialog" width="850px" v-model="addStudentDialogShow">
    <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick">
      <el-tab-pane label="正式学生" name="officalStudent">
        <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
          <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="dialogSearchBarRefresh()">
          </SearchBar>
        </TablePage>
      </el-tab-pane>
      <el-tab-pane label="临时学生" name="inofficalStudent">
        <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
          <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="dialogSearchBarRefresh()">
          </SearchBar>
        </TablePage>
      </el-tab-pane>
    </el-tabs>
    <template #header>
      <el-text>添加学生</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewStudent()">确定</el-button>
      <el-button @click="cancelNewStudent()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.div-class-detail {
  $card-left-width: 350px;
  height: $page-height;
  display: flex;

  >.card-left {
    width: $card-left-width;
    min-width: $card-left-width;
    max-width: $card-left-width;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    margin-right: $page-gap;

    >.div-card-left-title {
      margin-top: 20px;
      margin-left: 20px;
    }

    >.div-card-left-detail {
      margin-left: 20px;

      >.detail-info {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        justify-content: left;
      }

      >.detail-date {
        display: flex;
        flex-direction: column;
        margin-top: 25px;
      }

      >.detail-info>.el-text-detail,
      .detail-date>.el-text-detail {
        margin-top: 15px;
        align-self: flex-start;
      }
    }
  }

  >.card-right {
    width: calc($page-width - $card-left-width - $page-gap);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    padding-left: 20px;
    flex-grow: 1;

    >.table-page {
      height: $page-height;
      width: calc($page-width - $card-left-width - $page-gap - 20px);
    }
  }
}

.div-search-bar {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;

  >.search-bar-button {
    max-width: 70px;
    margin-left: 12px;
  }
}
</style>

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color;
  height: 50px;
}

.class-detail-dialog {
  >.el-dialog__body {

    .tabs-page {
      height: 550px;
      box-sizing: border-box;

      .dialog-table-page {
        height: calc(550px - 54px - 10px);
        width: 850px - 15px - 15px;
        margin-left: 0px;

        .dialog-search-bar {
          margin-left: 10px;
          margin-right: 8px;
          margin-bottom: 15px;
        }
      }
    }
    display: flex;
    align-items: center;
    flex-direction: column;

    padding-left: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-top: 0px;

    >div {
      width: fit-content;
    }
  }
}
</style>