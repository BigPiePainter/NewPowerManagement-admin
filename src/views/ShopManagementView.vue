<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { deleteProduct, editProduct, getProduct, getAllPackages } from '@/apis/product'
import { freeOrderCreate } from '@/apis/freeOrder'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { getAllStudents } from '@/apis/student'

const router = useRouter()
const author = JSON.parse(localStorage.author)

//------------下发免费订单---------------
const snapShot = reactive<any>({})
const freeOrderDialogShow = ref(false)
const freeOrderInfo = reactive<any>({
  productId: '',
  studentId: '',
  totalAmount: ''
})
const allStudent = reactive<any>([])
const freeOrderClick = (item: any) => {
  freeOrderInfo.productId = item.rowData.id
  freeOrderInfo.studentId = ''
  freeOrderInfo.totalAmount = item.rowData.androidPrice
  snapShot.androidPoint = item.rowData.androidPoint
  snapShot.categoryId = item.rowData.categoryId
  snapShot.categoryName = item.rowData.categoryName
  snapShot.coursesQuestionPackagesId = []
  snapShot.cover = item.rowData.cover
  snapShot.gradeId = item.rowData.gradeId
  snapShot.gradeName = item.rowData.gradeName
  snapShot.id = item.rowData.id
  snapShot.iosPoint = item.rowData.iosPoint
  snapShot.name = item.rowData.name
  snapShot.subjectId = item.rowData.subjectId
  snapShot.subjectName = item.rowData.subjectName
  snapShot.type = item.rowData.type
  snapShot.version = item.rowData.version
  snapShot.versionType = item.rowData.versionType
  getAllStudents()
    .then((res: any) => {
      res.data.forEach((item: any) => {
        allStudent.push(item)
      })
      return getAllPackages(freeOrderInfo.productId)
    }).then((res: any) => {
      res.data.forEach((item: any) => {
        snapShot.coursesQuestionPackagesId.push(item.coursesQuestionPackagesId)
      })
      console.log(JSON.stringify(snapShot))
    })
  freeOrderDialogShow.value = true
}

const freeOrderCreateConfirm = () => {

  freeOrderDialogShow.value = false

  var args = {
    productId: freeOrderInfo.productId,
    productSnapshot: JSON.stringify(snapShot),
    studentId: freeOrderInfo.studentId,
    totalAmount: freeOrderInfo.totalAmount
  }
  freeOrderCreate(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: '下发失败',
          message: res.msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '成功',
          message: '商品下发成功',
          type: 'success'
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '下发失败',
        message: res.msg,
        type: 'error'
      })
    })
}
//--------------------------------------

const clickDetail = (props: any) => {
  console.log(props);
  router.push({
    path: 'product-detail',
    query: {
      id: props.rowData.id,
      type: props.rowData.type,
      cover: props.rowData.cover,
      createdAt: props.rowData.createdAt,
      subjectName: props.rowData.subjectName,
      teacherName: props.rowData.teacherName,
      gradeName: props.rowData.gradeName,
      updatedAt: props.rowData.updatedAt,
      name: props.rowData.name,
      categoryName: props.rowData.categoryName,
    }
  });
}

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '商城管理', path: '' }]
const allGrades = reactive<any>([])
const allSubjects = reactive<any>([])
const loading = ref(true)

const allstatus = [
  {
    id: '1',
    value: '1',
    name: '已上架',
  },
  {
    id: '2',
    value: '2',
    name: '未上架',
  },
]

const allVersion = [
  {
    id: '1',
    value: '1',
    name: '课程/好题A',
  },
  {
    id: '2',
    value: '2',
    name: '课程/好题B',
  },
  {
    id: '3',
    value: '3',
    name: '课程/好题C',
  },
  {
    id: '4',
    value: '4',
    name: '课程/好题D',
  },
]

const allType: any = [
  {
    id: '1',
    value: '1',
    name: '课程',
  },
  {
    id: '2',
    value: '2',
    name: '好题',
  },
]

const searchBarItems = reactive([
  { name: '商品名称', value: '' },
  { name: '类型', value: '', type: InputType.Select, options: allType, single: true },
  { name: '状态', value: '', type: InputType.Select, options: allstatus, single: true },
  { name: '阶段', value: '', type: InputType.Select, options: allGrades, single: true },
  { name: '学科', value: '', type: InputType.Select, options: allSubjects, single: true },
  { name: '版本', value: '', type: InputType.Select, options: allVersion, single: true },
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 80
  },
  {
    dataKey: 'cover',
    key: 'cover',
    title: '海报',
    align: 'center',
    width: 100,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.cover}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.cover]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    width: 230,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    align: 'center',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData : '无'}</span>
    ),
    width: 80
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData : '无'}</span>
    ),
    width: 50
  },
  {
    dataKey: 'androidPoint',
    key: 'androidPoint',
    title: '安卓积分',
    align: 'center',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData : '无'}</span>
    ),
    width: 80
  },
  {
    dataKey: 'androidPrice',
    key: 'androidPrice',
    title: '安卓售价',
    align: 'center',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData / 100 + '￥' : '无'}</span>
    ),
    width: 80
  },
  {
    dataKey: 'iosPoint',
    key: 'iosPoint',
    title: 'ios积分',
    align: 'center',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData : '无'}</span>
    ),
    width: 80,
  },
  {
    dataKey: 'tcoin',
    key: 'tcoin',
    title: 'T币价格',
    align: 'center',
    cellRenderer: (cellData: any) => (
      <span>{cellData.cellData ? cellData.cellData : '无'}</span>
    ),
    width: 80,
  },
  {
    dataKey: 'type',
    key: 'type',
    title: '类型',
    width: 50,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "课程" : "好题"}
      </span>)
  },
  {
    dataKey: 'version',
    key: 'version',
    title: '版本',
    align: 'center',
    width: 100,
    cellRenderer: (item: any) => {
      return (
        <>
          <span>
            {
              item.rowData.type == 1 && item.rowData.version == 1 ? '课程A'
                : item.rowData.type == 2 && item.rowData.version == 1 ? '好题A'
                  : item.rowData.type == 1 && item.rowData.version == 2 ? '课程B'
                    : item.rowData.type == 2 && item.rowData.version == 2 ? '好题B'
                      : item.rowData.type == 1 && item.rowData.version == 3 ? '课程C'
                        : item.rowData.type == 2 && item.rowData.version == 3 ? '好题C'
                          : item.rowData.type == 1 && item.rowData.version == 4 ? '课程D'
                            : '好题D'
            }
          </span>
        </>
      )
    }
  },
  {
    dataKey: 'versionType',
    key: 'versionType',
    title: '版本类型',
    align: 'center',
    width: 80,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "基础版" : cellData.cellData == 2 ? "培优版" : "创新版"}
      </span>)
  },
  {
    dataKey: 'salesQuantity',
    key: 'salesQuantity',
    title: '已售',
    align: 'center',
    width: 50
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    width: 70,
    align: 'center',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-switch
            disabled={!author.shopEdit}
            v-model={cellData.rowData.status}
            active-value={1}
            inactive-value={2}
            onChange={() => editgoodOn(cellData)}
            inline-prompt
            active-text="已上架"
            inactive-text="未上架"
          />
        </div>
      )
    }
  },
  {
    dataKey: 'hot',
    key: 'hot',
    title: '热门',
    width: 70,
    align: 'center',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-switch
            disabled={!author.shopEdit}
            v-model={cellData.rowData.hot}
            active-value={1}
            inactive-value={2}
            onChange={() => editGoodsHot(cellData)}
            inline-prompt
            active-text="热门"
            inactive-text="非热门"
          />
        </div>
      )
    }
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button disabled={!author.shopEdit} link type="primary" onClick={() => freeOrderClick(item)}>
            下发
          </el-button>

          <el-button disabled={!author.shopEdit} link type="primary" onClick={() => editGoods(item)}>
            编辑
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`删除商品${item.rowData.name}`} onConfirm={() => preDeleteStu(item)} v-slots={deleteSlot} />
        </>
      )
    },
    width: 160,
    align: 'center',
    fixed: 'right'
  }
]

const deleteSlot = {
  reference: () => <el-button disabled={!author.shopEdit} link type="danger">删除</el-button>
}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}
const totalLength = ref<Number>()
const tableData = ref<any>([])

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    type: searchBarItems[1].value[0],
    status: searchBarItems[2].value[0],
    gradeId: searchBarItems[3].value[0],
    subjectId: searchBarItems[4].value[0],
    version: searchBarItems[5].value[0]
  }
  getProduct(args)
    .then((res) => {
      console.log(args)
      tableData.value = res.data.records
      totalLength.value = res.data.total
      return getGrades()
    }).then((res: any) => {
      allGrades.length = 0
      res.data.forEach((item: any) => {
        item.subset.forEach((item: any) => {
          var dataSample: { id: string, level: string, name: string } = {
            id: item.id,
            level: item.level,
            name: item.name
          }
          allGrades.push(dataSample)
        })
      })
      return getSubjects()
    }).then((res: any) => {
      allSubjects.length = 0
      res.data.forEach((item: any) => {
        var dataSample: { id: string, name: string } = {
          id: item.id,
          name: item.name
        }
        allSubjects.push(dataSample)
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
      console.log(allGrades)
      console.log(allSubjects)
    })
}
loadData()

//-------------------上下架----------------------//

const editgoodOn = (props: any) => {
  var args = {
    id: props.rowData.id,
    status: props.rowData.status
  }
  editProduct(args).
    then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '商品状态变更成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '编辑失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    }).catch()
  loadData()
  editDialogShow.value = false;
}
//------------------------编辑商品--------------
const editProductData = reactive<any>({
  id: '',
  iosPoint: '',
  androidPoint: '',
  androidPrice: '',
  name: '',
  tcoin: '',
});

const editGoods = (props: any) => {
  editProductData.id = props.rowData.id;
  if (props.rowData.iosPoint == null) {
    editProductData.iosPoint = ''
  } else {
    editProductData.iosPoint = props.rowData.iosPoint;
  }
  if (props.rowData.tcoin == null) {
    editProductData.tcoin = ''
  } else {
    editProductData.tcoin = props.rowData.tcoin;
  }
  if (props.rowData.androidPoint == null) {
    editProductData.androidPoint = ''
  } else {
    editProductData.androidPoint = props.rowData.androidPoint;
  }
  if (props.rowData.androidPrice == null) {
    editProductData.androidPrice = ''
  } else {
    editProductData.androidPrice = props.rowData.androidPrice / 100;
  }
  // editProductData.iosPoint = props.rowData.iosPoint;
  // editProductData.tcoin = props.rowData.tcoin;
  // editProductData.androidPoint = props.rowData.androidPoint;
  // editProductData.androidPrice = Number(props.rowData.androidPrice / 100);
  editProductData.name = props.rowData.name
  console.log(editProductData)
  editDialogShow.value = true;
}

const editDialogShow = ref(false)

const confirmEditDialog = () => {
  var args: any = {
    name: editProductData.name,
    id: editProductData.id
  }
  console.log(args)
  if (editProductData.iosPoint == '') {
    Object.assign(args, { iosPoint: null })
  } else {
    Object.assign(args, { iosPoint: editProductData.iosPoint })
  }
  if (editProductData.tcoin == '') {
    Object.assign(args, { tcoin: null })
  } else {
    Object.assign(args, { tcoin: editProductData.tcoin })
  }
  if (editProductData.androidPoint == '') {
    Object.assign(args, { androidPoint: null })
  } else {
    Object.assign(args, { androidPoint: editProductData.androidPoint })
  }
  if (editProductData.androidPrice == '') {
    Object.assign(args, { androidPrice: null })
  } else {
    Object.assign(args, { androidPrice: Number(editProductData.androidPrice) * 100 })
  }
  console.log(args)
  editProduct(args).
    then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '商品编辑成功',
          type: 'success'
        })
        editDialogShow.value = false;
        loadData()
      } else {
        ElNotification({
          title: '编辑失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    }).catch()
}
//----------------------------删除商品----------

const preDeleteStu = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除商品 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => { calcelDeleteStu(item), note.close() },
    onClose: () => deleteStu(item),
    type: 'warning',
  })
}

const calcelDeleteStu = (item: any) => {
  item.rowData.id = null
}

const deleteStu = (item: any) => {
  setTimeout(console.log, 0)
  deleteProduct({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.name + '商品删除成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error',
        })
      }
      loadData()
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "商品未成功删除",
        type: 'error',
      })
    })
}
//----------------------------添加热门----------
const editGoodsHot = (props: any) => {
  var args = {
    id: props.rowData.id,
    hot: props.rowData.hot
  }
  editProduct(args).
    then((res: any) => {
      console.log(editProductData)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '商品热度变更成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '编辑失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
    }).catch()
  loadData()
  editDialogShow.value = false;
}

</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData" :row-height="59">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-poster-button" type="primary">新建商品</el-button>
    </div>
  </TablePage>

  <el-dialog class="teacher-group-dialog" width="600px" v-model="editDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>商品名称：
        </span>
        <el-input class="dialog-input" v-model="editProductData.name">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>ios积分价格：
        </span>
        <el-input :disabled="editProductData.tcoin != ''" class="dialog-input" v-model="editProductData.iosPoint">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>T币价格：
        </span>
        <el-input :disabled="editProductData.iosPoint != ''" class="dialog-input" v-model="editProductData.tcoin">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>安卓积分价格：
        </span>
        <el-input :disabled="editProductData.androidPrice != ''" class="dialog-input"
          v-model="editProductData.androidPoint">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>安卓价格(￥)：
        </span>
        <el-input :disabled="editProductData.androidPoint != ''" class="dialog-input"
          v-model="editProductData.androidPrice">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>编辑商品</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="editDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="teacher-group-dialog" width="400px" v-model="freeOrderDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>选择学生：
        </span>
        <el-select filterable class="dialog-input" v-model="freeOrderInfo.studentId">
          <el-option v-for="item in allStudent" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>下发商品</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="freeOrderCreateConfirm()">确定</el-button>
      <el-button @click="freeOrderDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;

  .div-search-bar {
    margin: $gap;
  }

  .new-poster-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }

  .displaypic {
    width: 100px;
    height: 100px;
  }

  .el-image {
    width: 59px;
  }
}
</style>
