<script setup lang="tsx">
import { reactive, } from 'vue'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGrades, UpdataExamDay } from '@/apis/grade';
import { ElNotification } from 'element-plus';
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '考试时间' }]

//--------------gobal variable----------
const author = JSON.parse(localStorage.author)
const tableData = reactive<any>([])
const tableColumns = reactive<any>([
  {
    dataKey: 'name',
    key: 'name',
    title: '学习阶段',
    align: 'center',
    width: 120
  },
  {
    dataKey: 'dayRemainingUntilExamsWord',
    key: 'dayRemainingUntilExamsWord',
    title: '标题',
    cellRenderer: (cellData: any) => {
      const slots = {
        append: () =>
          <el-button disabled={!author.examDateEdit} onClick={() => changeTitle(cellData)}>设置</el-button>
      }
      return (
        <div>
          <el-input disabled={!author.examDateEdit} style='width:380px' v-model={cellData.rowData.dayRemainingUntilExamsWord} type='string' v-slots={slots}>
          </el-input>
        </div>
      )
    },
    width: 400
  },
  {
    dataKey: 'dayRemainingUntilExams',
    key: 'dayRemainingUntilExams',
    title: '距离考试时间(每日自动减少)',
    cellRenderer: (cellData: any) => {
      const slots = {
        append: () =>
          <el-button disabled={!author.examDateEdit} onClick={() => changeDate(cellData)}>设置</el-button>
      }
      return (
        <div>
          <el-input disabled={!author.examDateEdit} style='width:130px' v-model={cellData.rowData.dayRemainingUntilExams} type='number' step={1} min={0} v-slots={slots}>
          </el-input>
        </div>
      )
    },
    width: 200
  },
])

//--------------created------------------
const loadData = () => {
  tableData.length = 0
  getGrades()
    .then((res: any) => {
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          tableData.push(item)
        })
      })
    })
}
loadData()

//----------------修改标题------------------
const changeTitle = (cellData: any) => {
  var args = {
    id: cellData.rowData.id,
    dayRemainingUntilExamsWord: cellData.rowData.dayRemainingUntilExamsWord,
    dayRemainingUntilExams: cellData.rowData.dayRemainingUntilExams
  }
  console.log(args)
  UpdataExamDay(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '修改成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    }).finally(() => {
      loadData()
    })
}

//----------------修改日期------------------
const changeDate = (cellData: any) => {
  var args = {
    id: cellData.rowData.id,
    dayRemainingUntilExamsWord: cellData.rowData.dayRemainingUntilExamsWord,
    dayRemainingUntilExams: cellData.rowData.dayRemainingUntilExams
  }
  console.log(args)
  UpdataExamDay(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '修改成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '修改失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    }).finally(() => {
      loadData()
    })
}
</script>

<template>
  <TablePage class="exam-date-table" :columns="tableColumns" :data="tableData">
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.exam-date-table {
  width: calc($page-width - $gap);
  height: calc($page-height - $gap);
  margin-left: $gap;
  margin-top: $gap;
}
</style>
