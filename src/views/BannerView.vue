<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' },{name:'banner'}]

const tableColumns = [
  {
    dataKey: 'poster',
    key: 'poster',
    title: '海报',
    width: 150,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.poster}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={['/1.jpg']}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 300
  },
  {
    dataKey: 'jump',
    key: 'jump',
    title: '跳转',
    width: 80
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]

let fakeData = {
  poster: '/1.jpg',
  title: '超级提高题',
  jump: '是',
}

const tableData: object[] = []

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  tableData.push(data)
}

console.log(tableData)
</script>

<template>
  <TablePage class="banner-table" :columns="tableColumns" :data="tableData" :row-height="59">
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-banner-button" type="primary">新增</el-button>
    </div>
  </TablePage>
</template>

<style lang="scss">
$gap: 15px;

.banner-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-banner-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
.displaypic {
    width: 100px;
    height: 100px;
  }

  .el-image {
    width: 59px;
  }
</style>
