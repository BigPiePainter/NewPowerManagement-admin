<script setup lang="tsx">
import { ref, reactive } from 'vue'
import SearchBar from '@/components/SearchBar.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue';
import { useRoute } from 'vue-router'
import { InputType } from '@/type'
import { getProductContent, addProduct, deleteProductContent } from '@/apis/product';
import type { CheckboxValueType } from 'element-plus'
import { ElCheckbox, ElNotification } from 'element-plus'
import { getCourseQuestionPackage } from '@/apis/coursequestionpackage';
import { getGrades } from '@/apis/grade';
import { getSubjects } from '@/apis/subject';

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '商城管理', path: 'shop-management' },
  { name: '商品详情', path: '/teacher-detail-managament' },
]
const author = JSON.parse(localStorage.author)
const route = useRoute()
const warningDialogshow = ref(false)
const deleteItemid = ref<any>()
const tableData = ref<any>([])
const loading = ref(true)
const totalLength = ref<Number>()

const warningDialog = (cellData2: any) => {
  console.log(cellData2)
  warningDialogshow.value = true
  deleteItemid.value = cellData2
  console.log(deleteItemid.value)
}
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}
const dialogTableData = ref<any>([])
const addProductDialog = ref(false)
const newTeaData = ref<any>([])

const confirmDelete = () => {
  deleteProductContent({ id: deleteItemid.value }).then((res: any) => {
    console.log(deleteItemid)
    if (res.code == 20000) {
      console.log('删除成功')
      ElNotification({
        title: '成功',
        message: '课程删除成功',
        type: 'success'
      })
      loadData()
    } else {
      ElNotification({
        title: '删除失败',
        message: '删除失败' + res.msg,
        type: 'error'
      })
    }
    loadData()
    warningDialogshow.value = false

  }).catch()
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'packageName',
    key: 'packageName',
    title: '名称',
    width: 500,
    cellRenderer: (item: any) => {
      if (item.rowData.labelName != null) {
        return (
          <>
            <span>{item.rowData.packageName}</span>
            <el-tag style="margin-left:5px">{item.rowData.labelName}</el-tag>
          </>
        )
      } else {
        return (
          <>
            <span>{item.rowData.packageName}</span>
          </>
        )
      }
    }
  },
  {
    dataKey: 'packageDifficultyLevel',
    key: 'packageDifficultyLevel',
    title: '难度',
    width: 80,
    cellRenderer: (cellData: any) => (
      <span>
        {
          cellData.cellData == 0 ? "无"
            : cellData.cellData == 1 ? "容易"
              : cellData.cellData == 2 ? "较易"
                : cellData.cellData == 3 ? "普通"
                  : cellData.cellData == 4 ? "较难"
                    : '困难'
        }
      </span>)
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'packageDescription',
    key: 'packageDescription',
    title: '课程描述',
    width: 200
  },

  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          {/* <el-button link type="primary" onClick={() => console.log(cellData)}>
            预览
          </el-button>
          <el-button link type="primary" onClick={() => console.log(cellData)}>
            禁止快进
          </el-button> */}
          <el-button disabled={!author.shopEdit} link type="danger" onClick={() => warningDialog(cellData.rowData.id)}>
            删除
          </el-button>
        </div>
      )
    },
    width: 50,
    fixed: 'right',
    align: 'left'
  }
]

//---------------获取dialog内数据-----------

const dialogPaginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const dialogPageChange = (val: any) => {
  dialogPaginationInfo.currentPage = val.currentPage
  dialogPaginationInfo.pageSize = val.pageSize
  loadDialogData()
}
const dialogTotalLength = ref()
const allGrades = reactive<any>([])
const allSubjects = reactive<any>([])
const dialogSearchBarItems = reactive([
  { name: "课程名", value: "", },
  {
    name: "学习阶段",
    type: InputType.Select,
    value: "",
    label: "请选择",
    options: allGrades,
    single: true
  },
  {
    name: "学科",
    type: InputType.Select,
    value: "",
    label: "请选择",
    options: allSubjects,
    single: true
  },
  {
    name: "难度系数",
    type: InputType.Select,
    value: "",
    label: "请选择",
    options: [
      { name: "容易", id: 1 },
      { name: "较易", id: 2 },
      { name: "普通", id: 3 },
      { name: "较难", id: 4 },
      { name: "困难", id: 5 }
    ],
    single: true
  },
])
const loadDialogData = () => {
  getGrades().then((res: any) => {
    allGrades.length = 0
    res.data.forEach((item: any) => {
      allGrades.push(item)
    })
  })
  getSubjects().then((res: any) => {
    allSubjects.length = 0
    res.data.forEach((item: any) => {
      allSubjects.push(item)
    })
  })
  addProductDialog.value = true
  var args = {
    pageNum: dialogPaginationInfo.currentPage,
    pageSize: dialogPaginationInfo.pageSize,
    type: route.query.type,
    name: dialogSearchBarItems[0].value,
    gradeId: dialogSearchBarItems[1].value,
    subjectId: dialogSearchBarItems[2].value,
    difficultyLevel: dialogSearchBarItems[3].value,
  }
  getCourseQuestionPackage(args)
    .then((res) => {
      console.log(dialogSearchBarItems)
      console.log(res)
      dialogTableData.value = res.data.records
      dialogTotalLength.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

//---------------获取表格数据-----------
const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    productId: route.query.id,
  }
  getProductContent(args).then((res) => {
    console.log(args)
    console.log(res)
    tableData.value = res.data.records
    totalLength.value = res.data.total
  })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()


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
  // {
  //   dataKey: 'id',
  //   key: 'id',
  //   title: 'ID',
  //   width: 200
  // },
  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    cellRenderer: (item: any) => {
      if (item.rowData.labelName != null) {
        return (
          <>
            <span>{item.rowData.name}</span>
            <el-tag>{item.rowData.labelName}</el-tag>
          </>
        )
      } else {
        return (
          <>
            <span>{item.rowData.name}</span>
          </>
        )
      }
    },
    width: 200
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    algin: 'center',
    width: 100
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    algin: 'center',
    width: 100
  },
  {
    dataKey: 'difficultyLevel',
    key: 'difficultyLevel',
    title: '难度',
    cellRenderer: (cellData: any) => (
      <span>
        {
          cellData.cellData == 0 ? "无"
            : cellData.cellData == 1 ? "容易"
              : cellData.cellData == 2 ? "较易"
                : cellData.cellData == 3 ? "普通"
                  : cellData.cellData == 4 ? "较难"
                    : '困难'
        }
      </span>),
    algin: 'center',
    width: 100
  },
  {
    dataKey: 'description',
    key: 'description',
    title: '描述',
    width: 200
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师名',
    algin: 'center',
    width: 100
  }
])

const confirmAdd = () => {
  newTeaData.value = dialogTableData.value.filter((item: any) => item.checked)
  let data = newTeaData.value.map((item: any) => item.id)
  addProductDialog.value = false
  console.log(data)
  addProduct({
    productId: route.query.id,
    coursesQuestionPackagesIds: data
  }).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: '添加成功',
        type: 'success'
      })
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
            <div class="topPart1-3-2"><el-text>科目：{{ route.query.categoryName }}</el-text></div>
            <div class="topPart1-3-2"><el-text>老师：{{ route.query.teacherName }}</el-text></div>
          </div>
        </div>
      </div>

      <div class="topPart1">
        <div class="topPart1-1"><el-text></el-text></div>
        <div class="topPart2-2"><el-text></el-text></div>
      </div>
    </div>

    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1">
          <el-button :disabled='!author.shopEdit' style="margin-left: 18px;" @click="loadDialogData()" type="primary">
            {{ route.query.type == '1' ? '添加课程' : '添加好题' }}</el-button>
        </div>
      </div>
    </div>
    <div class="botPart1-2">
      <TablePage style="height: 620px;" :loading="loading" class="page-container" :itemsTotalLength="totalLength"
        @paginationChange="pageChange" :columns="tableColumns" :data="tableData">
      </TablePage>
    </div>
  </div>

  <el-dialog v-model="warningDialogshow" title="Warning" width="30%" center>
    <el-text disabled style="display: flex;align-items: center;justify-content: center;">
      {{ route.query.type == '1' ? '是否确认从商品内删除课程' : '是否确认从商品内删除好题' }}
    </el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="warningDialogshow = false">取消</el-button>
        <el-button type="primary" @click="confirmDelete">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog class="teacher-group-detail-dialog" width="900px" v-model="addProductDialog">
    <TablePage class="dialog-table-page" :itemsTotalLength="dialogTotalLength" @paginationChange="dialogPageChange"
      :columns="dialogTableColumns" :data="dialogTableData">
      <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="loadDialogData()"></SearchBar>
    </TablePage>

    <template #header>
      <el-text>{{ route.query.type == '1' ? '添加课程到商品' : '添加好题到商品' }}</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmAdd()">确定</el-button>
      <el-button @click="addProductDialog = false">
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