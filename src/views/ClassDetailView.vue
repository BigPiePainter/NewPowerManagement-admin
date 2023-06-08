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
  { name: '班级管理', path: '/class-management' },
  { name: '班级详情', path: '/class-detail' }
]


const route = useRoute()

const items = reactive([
  { name: "姓名/用户名", value: "" },
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
  console.log(items)
}

const detailItem = reactive({
  className: '中考冲刺',
  teacher: 'Mr.庄',
  major: '科学',
  grade: '初三',
  startDate: '2023-01-01',
  endDate: '2023-06-01',
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
            班级名称：{{ detailItem.className }}
          </span>
          <span class="span-detail">
            负责老师：{{ detailItem.teacher }}
          </span>
          <span class="span-detail">
            学科：{{ detailItem.major }}
          </span>
          <span class="span-detail">
            年级：{{ detailItem.grade }}
          </span>
        </div>
        <div class="detail-date">
          <span class="span-detail">
            起始日期：{{ detailItem.startDate }}
          </span>
          <span class="span-detail">
            到期日期：{{ detailItem.endDate }}
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
