<script setup lang="tsx">
import DisplayVideoCard from '../components/DisplayVideoCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue';
import { useRoute } from 'vue-router'
import { getMiniLessons, deleteMiniLessons, editMiniLessons } from '@/apis/minilessons'





const route = useRoute()


const warningDialogshow = ref(false)

const deleteItemid = ref<any>()

const warningDialog=(cellData2:any)=>{
  console.log(cellData2)
  warningDialogshow.value = true
  deleteItemid.value=cellData2
  console.log(deleteItemid.value)
}

const ConfirmdeleteMiniLesson = () => {
  deleteMiniLessons({id:deleteItemid.value}).then((res: any) => {
    console.log(deleteItemid)
    if (res.code == 20000) {
      console.log('删除成功')

      loadData()
      warningDialogshow.value=false
    }
    else {
      warningDialogshow.value=false
      console.log('删除失败')
    }
  }).catch()
}












const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
  { name: '老师详情', path: '/teacher-detail-managament' },
]


const tableData = ref<any>([])

const loading = ref(true)
const totalLength = ref<Number>()

const tableColumns = [

  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },

  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    width: 200
  },

  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },

  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(cellData)}>
            预览
          </el-button>
          <el-button link type="primary" onClick={() => console.log(cellData)}>
            禁止快进
          </el-button>
          <el-button link type="danger" onClick={() => warningDialog(cellData.rowData.id)}>
            删除
          </el-button>
        </div>
      )
    },
    width: 250,
    fixed: 'right',
    align: 'left'
  }
]



const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})


const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    teacherCourseId: route.query.id
  }

  getMiniLessons(args).then((res) => {

    console.log(args)
    console.log(res)
    tableData.value = res.data.records
    totalLength.value = res.data.records.length
  })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
  }



const concel=(item:any)=>{
console.log(item)
}

  loadData()

</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div>
          <el-image
        class="image"
        fit="scale-down"
        src={{tableData.cover}}
        className="shop-Preview"
        preview-src-list={{tableData.cover}}
        preview-teleported
        
      />

        </div>
        <div class="topPart1-3">
          <div class="topPart1-3-2">
            <div class="topPart1-3-2"><el-text style="font-size: 20px;">{{tableData.cover}}</el-text></div>
            <div class="topPart1-3-2"><el-text>年级：三年级</el-text></div>
            <div class="topPart1-3-2"><el-text>学科：语文</el-text></div>
            <div class="topPart1-3-2"><el-text>标签：难系数很高</el-text></div>
            <div class="topPart1-3-2"><el-text @click="concel(tableData)">老师：庄老师</el-text></div>
          </div>
        </div>


      </div>



      <div class="topPart1">
        <div class="topPart1-1"><el-text></el-text></div>
        <div class="topPart2-2"><el-text></el-text></div>
      </div>


      <div class="topPart1">
        <div class="topPart1-1"><el-button type="primary">编辑</el-button> <el-button>下发课程</el-button></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-button type="primary">添加视频</el-button></div>
      </div>
    </div>
    <div class="botPart1-2">
      <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
        :columns="tableColumns" :data="tableData">
      </TablePage>
    </div>

  </div>



  <el-dialog v-model="warningDialogshow" title="Warning" width="30%" center>
    <el-text disabled style="display: flex;align-items: center;justify-content: center;">
      是否确认删除课程
    </el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="warningDialogshow=false">Cancel</el-button>
        <el-button type="primary" @click="ConfirmdeleteMiniLesson">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>

</template>

<style scoped lang="scss">
$scale: 0.88;
$gap: 15px;


.page-container {

  margin-left: $gap;
  margin-top: 15px;
  height: 430px;
  //margin-right: $gap;
}

.whole {
  display: flex;
  flex-direction: column;
  width: calc($page-width - $gap);
  height: calc($page-height);
}


.topPart {
  display: flex;
  flex-direction: row;
  height: 220px * $scale;
}

.topPart1 {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.topPart1-1 {
  display: flex;
  height: 40px * $scale;
  margin-top: 15px * $scale;
  justify-content: flex-end;

}

.topPart2-2 {
  display: flex;
  margin-top: 10px * $scale;

  margin-left: 15px;
}

.top-Part1-2-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;

}

.image {
  display: flex;
  flex-direction: row;
  width: 193.6px;
  height: 193.6px;
}

.row-divider {
  width: 100%;
  border-bottom: 7px #f0f2f5 solid;
  box-sizing: border-box;
  margin: 0;
}

.top-Part1-2-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-Part1-1-1 {
  display: flex;

}

.topPart1-2 {
  display: flex;
  flex-direction: row;
  height: 80px * $scale;
}

.topPart1-3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px* $scale;

}


.topPart1-3-2 {
  margin: 10px;

}

.botPart1-1 {
  display: flex;
  flex-direction: row;
  height: 50px * $scale;
  align-content: center;
}

.botPart1-1-1 {
  display: flex;
  flex-direction: row;
  width: 80px * $scale;
  align-items: center;
  justify-content: center;
  padding-left: 5px * $scale;
  margin-left: 18px;

}

.botPart1-1-2 {
  display: flex;
  flex-direction: row;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;

}

.botPart1-1-3 {
  display: flex;
  flex-direction: row;
  margin-left: 120px * $scale;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;
}


.botPart1-2 {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: wrap;
  margin-top: -10px * $scale;
}

.divider-height {
  height: 88%;
  align-self: center;
  border-left: 3px #f0f2f5 solid;
  box-sizing: border-box;
}
</style>