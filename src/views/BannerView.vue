<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: 'banner' }]

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

const newBannerContext = reactive({
  poster: '', title: '', link: ''
})

const newBannerDialogShow = ref(false)
const newBanner = () => {
  newBannerDialogShow.value = true
}

const confirmNewBanner = () => {
  console.log(newBannerContext)
  newBannerDialogShow.value = false
  newBannerContext.poster = ''
  newBannerContext.title = ''
  newBannerContext.link = ''
}

const cancelNewBanner = () => {
  newBannerDialogShow.value = false
  newBannerContext.poster = ''
  newBannerContext.title = ''
  newBannerContext.link = ''
}
</script>

<template>
  <div>
    <TablePage class="banner-table" :columns="tableColumns" :data="tableData" :row-height="59">
      <div>
        <el-button @click="newBanner" class="new-banner-button" type="primary">新增</el-button>
      </div>
    </TablePage>

    <el-dialog class="new-class-dialog" width="370px" v-model="newBannerDialogShow">
      <div>
        <div>
          <span>
            *海报：
          </span>
        </div>

        <div style="text-align: center;width: 300px;height: 300px;background-color: #BEC2CB;margin-bottom: 15px">
          <img id="img" src="" />
          <text style="white-space: nowrap;pointer-events: none">点击此处或拖拽上传</text>
          <input style="width: 100%;height: 100%;opacity: 0" type="file" ref="img" />
        </div>

        <div class="div-input-element">
          <span class="dialog-span">
            *标题：
          </span>
          <el-input class="dialog-input" v-model="newBannerContext.title">
          </el-input>
        </div>
        <div class="div-input-element">
          <span class="dialog-span">
            *跳转链接：
          </span>
          <el-input class="dialog-input" v-model="newBannerContext.link">
          </el-input>
        </div>
      </div>
      <template #header>
        <el-text>编辑班级</el-text>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmNewBanner">确定</el-button>
        <el-button @click="cancelNewBanner">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
$gap: 15px;

.banner-table {
  width: calc($page-width - $gap - 15px);
  height: calc($page-height - $gap);
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

.div-input-element {
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
</style>
