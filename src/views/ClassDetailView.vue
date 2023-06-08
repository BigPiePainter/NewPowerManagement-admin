<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'

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

const tableData: object[] = [{ id: '1456', studentName: 'Nick', userName: 'Nick191518' }]

const fakeData = { id: '123456', studentName: 'Nick', userName: 'Nick191518' }

const generateData = (data: object[], fakeItem: object) => {
  for (let i = 0; i < 1000; i++) {
    data.push(fakeItem)
  }
}
generateData(tableData, fakeData)
console.log(tableData)
</script>

<template>
  <div class="div-class-detail">
    <div class="card-left"></div>
    <div class="card-right">
      <TablePage class="table-page" :columns="tableColumns" :data="tableData">
        <div class="div-search-bar">
        
            

          <el-text class="search-bar-title">姓名/用户名</el-text>
          <el-input class="search-bar-input" placeholder="请输入"></el-input>
          <el-button class="search-bar-button">搜索</el-button>

          <div style="flex-grow: 1"></div>

          <el-button class="search-bar-button">添加成员</el-button>
        </div>
      </TablePage>

      <!-- <div class="div-table">
        <div class="div-table-2">
          <el-auto-resizer>
            <template #default="{ height, width }">
              <el-table-v2
                class="class-detail-table"
                :columns="tableColumns"
                :data="tableData"
                :height="height"
                :width="width"
              >
                <template #header-cell="props">
                  <el-button v-if="props.column.key == 'option'" @click="console.log(props)">{{
                    props.column.title
                  }}</el-button>
                  <span v-else>{{ props.column.title }}</span>
                </template>
              </el-table-v2>
            </template>
          </el-auto-resizer>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.div-class-detail {
  $card-left-width: 350px;

  height: $page-height;
  display: flex;

  > .card-left {
    width: $card-left-width;
    min-width: $card-left-width;
    max-width: $card-left-width;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    margin-right: $page-gap;
  }
  > .card-right {
    width: calc($page-width - $card-left-width - $page-gap);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    padding-left: 20px;
    flex-grow: 1;
    > .table-page {
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
  > .search-bar-title {
    margin-right: 8px;
    white-space: nowrap;
  }

  > .search-bar-input {
    max-width: 200px;
    max-height: 30px;
    margin-right: 12px;
  }

  > .search-bar-button {
    max-width: 70px;
    max-height: 30px;
  }
}

.div-table {
  margin-top: 15px;

  > .div-table-2 {
    height: calc($page-height - 100px);
    display: flex;

    > .class-detail-table {
    }
  }
}
</style>
