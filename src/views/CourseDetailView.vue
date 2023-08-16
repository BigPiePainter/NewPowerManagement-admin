<script setup lang="tsx">
import DisplayVideoCard from '../components/DisplayVideoCard.vue'
import { ref, reactive } from 'vue'
import { InputType } from '@/type'
import SearchBar from '@/components/SearchBar.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue';
import { useRoute } from 'vue-router'
import type { CheckboxValueType } from 'element-plus'
import { getMiniLessons, deleteMiniLessons, addMiniLessons, getMiniLesson } from '@/apis/minilessons'
import { ElCheckbox, ElNotification } from 'element-plus'
import { getAllTeachers } from '@/apis/teacher'

const route = useRoute()
const warningDialogshow = ref(false)
const deleteItemid = ref<any>()

const warningDialog = (cellData2: any) => {
  console.log(cellData2)
  warningDialogshow.value = true
  deleteItemid.value = cellData2
  console.log(deleteItemid.value)
}

const ConfirmdeleteMiniLesson = () => {
  deleteMiniLessons({ id: deleteItemid.value }).then((res: any) => {
    console.log(deleteItemid)
    if (res.code == 20000) {
      console.log('删除成功')

      loadData()
      warningDialogshow.value = false
    }
    else {
      warningDialogshow.value = false
      console.log('删除失败')
    }
  }).catch()
}

const addDialogShow = ref(false)
const newTeaData = ref<any>([])

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '课程管理', path: '/course-management' },
  { name: '课程详情', path: '' },
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
    dataKey: 'miniLessonName',
    key: 'miniLessonName',
    title: '名称',
    width: 200
  },

  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师姓名',
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
const loadTeacherData=()=>{
getAllTeachers()
  .then((res) => { (allTeacher.value = res.data), console.log(res) })
  .catch()
}


const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})


const loadData = () => {
  loading.value = true
  loadTeacherData()
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    courseId: route.query.id
  }

  getMiniLesson(args).then((res) => {

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




loadData()







const dialogTableData = ref<any>([])
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
        dialogTableData.value.forEach((i: any) => i.checked = value);
      }
      return <ElCheckbox onChange={onChange} modelValue={dialogTableData.value.every((i: any) => i.checked)} indeterminate={!dialogTableData.value.every((i: any) => i.checked) && dialogTableData.value.some((i: any) => i.checked)} />
    },
    checked: false,
  },
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 250
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '课程名',
    width: 250
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师姓名',
    width: 250,
  },
  {
    dataKey: 'teacherCourseId',
    key: 'teacherCourseId',
    title: '老师课程编号',
    width: 250,
  }


  
])


loadData()

const confirmAdd = () => {
  newTeaData.value = dialogTableData.value.filter((item: any) => item.checked)
  let data = newTeaData.value.map((item: any) => item.id)
  console.log(data)
  addMiniLessons({
    courseId: route.query.id,
    miniLessonId: data
  }).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: '添加微课到课程包成功',
        type: 'success'
      })
      addDialogShow.value = false
    } else {
      ElNotification({
        title: '添加失败',
        message: (res.msg),
        type: 'warning'
      })
    }

    loadData()
  }).catch
}
const allTeacher = ref<any>([])


const dialogSearchBarItems = reactive([
  { name: "微课名称", value: "", },
  { name: "老师课程编号", value: "", },
  { name: '老师姓名', value: '', type: InputType.Select, label: '请选择', options: allTeacher,single:true }
])





const loadDialogData = () => {

  


  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: dialogSearchBarItems[0].value,
    ownerId: dialogSearchBarItems[2].value,
    auditStatus:'3',
    teacherCourseId: dialogSearchBarItems[1].value,
  }
  getMiniLessons(args)
    .then((res) => {
      dialogTableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadDialogData()

</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div>
          <el-image class="image" fit="scale-down" :src="route.query.cover" className="shop-Preview" preview-src-list={{}}
            preview-teleported />

        </div>
        <div class="topPart1-3">
          <div class="topPart1-3-2">
            <div class="topPart1-3-2"><el-text style="font-size: 20px;">{{ route.query.name }}</el-text></div>
            <div class="topPart1-3-2"><el-text>更新时间:{{ route.query.updatedAt }}</el-text></div>
            <div class="topPart1-3-2"><el-text>阶段：{{ route.query.gradeName }}</el-text></div>
            <div class="topPart1-3-2"><el-text>学科：{{ route.query.subjectName }}</el-text></div>
            <div class="topPart1-3-2"><el-text>老师：{{ route.query.teacherName }}</el-text></div>
          </div>
        </div>


      </div>



      <div class="topPart1">
        <div class="topPart1-1"><el-text></el-text></div>
        <div class="topPart2-2"><el-text></el-text></div>
      </div>


      <div class="topPart1">
        <div class="topPart1-1"> <el-button>下发课程</el-button></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-button type="primary" @click="addDialogShow = true">添加微课</el-button></div>
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
        <el-button @click="warningDialogshow = false">Cancel</el-button>
        <el-button type="primary" @click="ConfirmdeleteMiniLesson">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>





















  <el-dialog class="teacher-group-detail-dialog" width="900px" v-model="addDialogShow">
    <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
      <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="loadDialogData()"></SearchBar>
    </TablePage>

    <template #header>
      <el-text>添加微课到课程包（只展示已通过审核微课）</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmAdd()">确定</el-button>
      <el-button @click="addDialogShow = false">
        取消
      </el-button>
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