<script setup lang="tsx">
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 400
  }))

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const columns = generateColumns(10)
const data = generateData(columns, 1000)

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
    cellRenderer: ({ cellData: studentName }: any) => (
      <ElButton link type="primary">
        {studentName}
      </ElButton>
    )
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
    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="primary" class="">
          重置密码
        </el-button>
        <el-button link type="danger" class="">
          删除
        </el-button>
      </>
    ),
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
  studentCellnumber: '15536996997',
  gender: 'male',
  createTime: '2023-9-19 18:23',
  loginTime: '2012-12-22 19:23',
  studentGrade: '9',
  parentCellnumber: '15623423498',
  note: '这里是备注'
}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index
  tableData.push(data)
}
</script>

<template>测试测试</template>
