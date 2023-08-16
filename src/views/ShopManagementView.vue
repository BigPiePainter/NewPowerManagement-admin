<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { deleteProduct, editProduct, getProduct } from '@/apis/product'
import { freeOrderCreate } from '@/apis/freeOrder'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { getAllStudents } from '@/apis/student'

const router = useRouter()

//------------下发免费订单---------------
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
  getAllStudents()
    .then((res: any) => {
      res.data.forEach((item: any) => {
        allStudent.push(item)
      })
    })
  freeOrderDialogShow.value = true
}
const freeOrderCreateConfirm = () => {
  freeOrderDialogShow.value = false
  var args = {
    productId: freeOrderInfo.productId,
    studentId: freeOrderInfo.studentId,
    totalAmount: freeOrderInfo.totalAmount
  }
  freeOrderCreate(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: '赠送失败',
          message: res.msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '成功',
          message: '商品赠送成功',
          type: 'success'
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '赠送失败',
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
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const loading = ref(true)

const allstatus = [
  {
    id: '1',
    value: 1,
    name: '已上架',
  },
  {
    id: '2',
    value: 2,
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

const allversionType = [
  {
    id: '1',
    value: '1',
    name: '基础版',
  },
  {
    id: '2',
    value: '2',
    name: '培优版',
  },
  {
    id: '3',
    value: '3',
    name: '创新版',
  }
]


const loadSelectOption = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()

  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()
}

const allType: any = [
  {
    id: '1',
    value: 1,
    name: '课程',
  },
  {
    id: '2',
    value: 2,
    name: '好题',
  },
]

const allHot: any = [
  {
    id: '1',
    value: 1,
    name: '热门',
  },
  {
    id: '2',
    value: 2,
    name: '非热门',
  },
]

const searchBarItems = reactive([
  { name: '商品名称', value: '' },
  { name: '类型', value: '', type: InputType.Select, options: allType, },
  { name: '状态', value: '', type: InputType.Select, options: allstatus },
  { name: '阶段', value: '', type: InputType.Select, options: allGrades },
  { name: '学科', value: '', type: InputType.Select, options: allSubjects },
  { name: '版本', value: '', type: InputType.Select, options: allVersion },
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
      <span>{cellData.cellData ? cellData.cellData + '￥' : '无'}</span>
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
    Fwidth: 50,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "已上架" : "未上架"}
      </span>
    )
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => freeOrderClick(item)}>
            赠送
          </el-button>

          <el-button link type="primary" onClick={() => editGoods(item)}>
            编辑
          </el-button>

          <el-button link type="primary" onClick={() => editGoodsHot(item)}>
            添加为热门
          </el-button>

          <el-button link type="primary" onClick={() => editgoodOn(item)}>
            上架/下架
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`删除学生${item.rowData.name}`} onConfirm={() => preDeleteStu(item)} v-slots={deleteSlot} />
        </>
      )
    },
    width: 300,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]


const deleteSlot = {
  reference: () => <el-button link type="danger">删除</el-button>
}


const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})

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
      loadSelectOption()
      console.log(args)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()

console.log(tableData)


//-------------------上下架----------------------//

const editgoodOn = (props: { rowData: { status: string, id: string, iosPoint: string, tcoin: string, androidPoint: string, androidPrice: string, name: string, hot: string, subjectId: string, type: string, version: string, versionType: string } }) => {
  editProductData.id = props.rowData.id;
  editProductData.iosPoint = props.rowData.iosPoint;
  editProductData.tcoin = props.rowData.tcoin;
  editProductData.androidPoint = props.rowData.androidPoint;
  editProductData.androidPrice = props.rowData.androidPrice;
  editProductData.name = props.rowData.name
  editProductData.hot = props.rowData.hot
  editProductData.subjectId = props.rowData.subjectId
  editProductData.type = props.rowData.type
  editProductData.version = props.rowData.version
  editProductData.versionType = props.rowData.versionType
  editProductData.status = props.rowData.status
  console.log(props)


  if (props.rowData.status == '1') {
    editProductData.status = '2'
  }
  else if (props.rowData.status == '2') {
    editProductData.status = '1'
  }
  editProduct(editProductData).
    then((res: any) => {
      console.log(editProductData)
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
const editProductData = reactive<{

  id: string,
  iosPoint: string,
  androidPoint: string,
  androidPrice: string,
  hot: string,
  name: string,
  status: string,
  subjectId: string,
  tcoin: string,
  type: string,
  version: string,
  versionType: string,

}>({

  id: '',
  iosPoint: '',
  androidPoint: '',
  androidPrice: '',
  hot: '',
  name: '',
  status: '',
  subjectId: '',
  tcoin: '',
  type: '',
  version: '',
  versionType: '',

});


const editGoods =
  (props: { rowData: { id: string, iosPoint: string, tcoin: string, androidPoint: string, androidPrice: string, name: string, hot: string, subjectId: string, type: string, version: string, versionType: string } }) => {
    editProductData.id = props.rowData.id;
    editProductData.iosPoint = props.rowData.iosPoint;
    editProductData.tcoin = props.rowData.tcoin;
    editProductData.androidPoint = props.rowData.androidPoint;
    editProductData.androidPrice = props.rowData.androidPrice;
    editProductData.name = props.rowData.name
    editProductData.hot = props.rowData.hot
    editProductData.subjectId = props.rowData.subjectId
    editProductData.type = props.rowData.type
    editProductData.version = props.rowData.version
    editProductData.versionType = props.rowData.versionType
    console.log(props)
    editDialogShow.value = true;
  }


const editDialogShow = ref(false)



const confirmEditDialog = () => {
  editProduct(editProductData).
    then((res: any) => {
      console.log(editProductData)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '商品编辑成功',
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
const editGoodsHot = (props: { rowData: { status: string, id: string, iosPoint: string, tcoin: string, androidPoint: string, androidPrice: string, name: string, hot: string, subjectId: string, type: string, version: string, versionType: string } }) => {
  editProductData.id = props.rowData.id;
  editProductData.iosPoint = props.rowData.iosPoint;
  editProductData.tcoin = props.rowData.tcoin;
  editProductData.androidPoint = props.rowData.androidPoint;
  editProductData.androidPrice = props.rowData.androidPrice;
  editProductData.name = props.rowData.name
  editProductData.hot = props.rowData.hot
  editProductData.subjectId = props.rowData.subjectId
  editProductData.type = props.rowData.type
  editProductData.version = props.rowData.version
  editProductData.versionType = props.rowData.versionType
  editProductData.status = props.rowData.status
  console.log(props)

  if (props.rowData.hot == '1') {
    editProductData.hot = '1'
  }
  else if (props.rowData.hot == '2') {
    editProductData.hot = '1'
  }
  editProduct(editProductData).
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
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
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
          *商品名称：
        </span>
        <el-input class="dialog-input" v-model="editProductData.name">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          *商品ios积分价格：
        </span>
        <el-input class="dialog-input" v-model="editProductData.iosPoint">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          *商品T币价格：
        </span>
        <el-input class="dialog-input" v-model="editProductData.tcoin">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          *商品安卓积分价格：
        </span>
        <el-input class="dialog-input" v-model="editProductData.androidPoint">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          状态：
        </span>
        <el-select class="dialog-input" v-model="editProductData.androidPrice">
          <el-option v-for="item in allstatus" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          *是否是热门商品：
        </span>
        <el-select class="dialog-input" v-model="editProductData.hot">
          <el-option v-for="item in allHot" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          *学科：
        </span>
        <el-select class="dialog-input" v-model="editProductData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          商品种类
        </span>
        <el-select class="dialog-input" v-model="editProductData.type">
          <el-option v-for="item in allType" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          商品版本
        </span>
        <el-select class="dialog-input" v-model="editProductData.version">
          <el-option v-for="item in allVersion" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          商品版本类型
        </span>
        <el-select class="dialog-input" v-model="editProductData.versionType">
          <el-option v-for="item in allversionType" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
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
          *选择学生：
        </span>
        <el-select filterable class="dialog-input" v-model="freeOrderInfo.studentId">
          <el-option v-for="item in allStudent" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>赠送商品</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="freeOrderCreateConfirm()">确定</el-button>
      <el-button @click="freeOrderDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scop>
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
