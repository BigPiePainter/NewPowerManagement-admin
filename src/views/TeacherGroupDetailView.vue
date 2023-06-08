<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRoute } from 'vue-router'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '教研组管理', path: '/teacher-group-management' },
  { name: '教研组详情', path: '/teacher-group-detail' }
]

const route = useRoute()

const items = reactive([
  { name: "姓名/用户名", value: "", },
])

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
    title: '教师姓名',
    width: 200
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
    width: 200
  },
  {
    dataKey: 'major',
    key: 'major',
    title: '学科',
    width: 200
  },
  {
    dataKey: 'joinDate',
    key: 'joinDate',
    title: '加入时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: () => (
      <>
        <el-button link type="primary">
          移除
        </el-button>
      </>
    ),
    width: 150,
    fixed: 'right',
    align: 'center'
  }
]

console.log(route.query.id)
const tableData: object[] = [{
  id: '1456',
  teacherName: 'Mr.庄',
  userName: 'Nick191518',
  grade: '高二',
  major: '英语',
  joinDate: '2022-10-10'
}]

const fakeData = {
  id: '500551',
  teacherName: 'Mr.YuTaKa',
  userName: 'Young191518',
  grade: '高二',
  major: '数学',
  joinDate: '2022-10-10'
}

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index;
  tableData.push(data)
}

const refresh = () => {
  console.log(items)
}

const detailItem = reactive({
  teacherGroupName: '中考冲刺',
  groupLeader: 'Mr.庄',
})
</script>

<template>
  <div class="div-class-detail">
    <div class="card-left">
      <div class="div-card-left-title">
        <span style=";">
          基本信息
        </span>
      </div>

      <div class="div-card-left-detail">
        <div class="detail-info">
          <span class="span-detail">
            教研组名称：{{ detailItem.teacherGroupName }}
          </span>
          <span class="span-detail">
            组长：{{ detailItem.groupLeader }}
          </span>
        </div>
      </div>

    </div>
    <div class="card-right">
      <TablePage class="table-page" :columns="tableColumns" :data="tableData">
        <div class="div-search-bar">

          <SearchBar :items="items" @change="refresh()"></SearchBar>

          <div style="flex-grow: 1"></div>

          <el-button class="search-bar-button">添加成员</el-button>
        </div>
      </TablePage>

    </div>
  </div>
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

        >.span-detail {
          margin-top: 15px;
        }
      }

      >.detail-date {
        display: flex;
        flex-direction: column;
        margin-top: 25px;

        >.span-detail {
          margin-top: 15px;
        }
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
