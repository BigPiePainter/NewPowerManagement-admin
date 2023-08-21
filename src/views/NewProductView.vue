<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref, reactive } from 'vue'
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue'
import { upload } from '@/apis/upload';
import { getGrades } from '@/apis/grade';
import { getSubjects } from '@/apis/subject';
import { createProduct, addProduct } from '@/apis/product';
import { getCourseQuestionPackage } from '@/apis/coursequestionpackage';
import TablePage from '@/components/TablePage.vue'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import { ElButton, ElNotification, ElCheckbox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '商城管理', path: '/shop-management' },
  { name: '新建商品', path: '' }
]

const searchBarItems = reactive([
  { name: "课程名称:", value: "", },
  {
    name: '难度:',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: [
      { name: "容易", id: 1 },
      { name: "较易", id: 2 },
      { name: "普通", id: 3 },
      { name: "较难", id: 4 },
      { name: "困难", id: 5 }
    ],
    single: true
  }
])

const next = () => {
  if (active.value >= 0 && active.value < 2) {
    active.value = active.value + 1
  }
  if (active.value == 1)
    loadData()
}

const up = () => {
  if (active.value > 0 && active.value <= 2) {
    active.value = active.value - 1
  }
  if (active.value == 1)
    loadData()
}

const loading = ref(false)
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const totalLength = ref<number>()
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const tableData = reactive<any>([])
const loadData = () => {
  tableData.length = 0
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    type: newProductData.type,
    subjectId: newProductData.subjectId,
    gradeId: newProductData.gradeId,
    difficultyLevel: searchBarItems[1].value,
    name: searchBarItems[0].value
  }
  getCourseQuestionPackage(args)
    .then((res: any) => {
      totalLength.value = res.data.total
      res.data.records.forEach((item: any) => {
        tableData.push(item)
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

const tableColumn = reactive<any>([
  {
    key: 'selection',
    width: 50,
    cellRenderer: (item: any) => {
      const onChange = (value: CheckboxValueType) => item.rowData.checked = value
      return <ElCheckbox modelValue={item.rowData.checked} onChange={onChange} />
    },
    headerCellRenderer: () => {
      const onChange = (value: CheckboxValueType) => {
        tableData.forEach((i: any) => i.checked = value);
      }
      return <ElCheckbox
        onChange={onChange}
        modelValue={tableData.every((i: any) => i.checked)}
        indeterminate={!tableData.every((i: any) => i.checked)
          && tableData.some((i: any) => i.checked)}
      />
    },
    checked: false,
  },
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 180
  },
  {
    dataKey: 'cover',
    key: 'cover',
    title: '封面',
    width: 100,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.cover}
        className="shop-Preview"
        preview-src-list={[item.rowData.cover]}
        preview-teleported
      />)
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '标题',
    width: 180
  },
  {
    dataKey: 'description',
    key: 'description',
    title: '描述',
    width: 180
  },
  {
    dataKey: 'difficultyLevel',
    key: 'difficultyLevel',
    title: '难度',
    cellRenderer: (cellData: any) => (
      <span>
        {
          cellData.cellData == 0 ? "容易"
            : cellData.cellData == 1 ? "较易"
              : cellData.cellData == 2 ? "普通"
                : cellData.cellData == 3 ? "较难"
                  : cellData.cellData == 4 ? "难"
                    : '困难'
        }
      </span>),
    width: 100
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师',
    width: 80
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 80
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 80
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 100
  },
  {
    dataKey: 'updatedAt',
    key: 'updatedAt',
    title: '更新时间',
    width: 100
  }
])

const allstatus = [
  {
    id: '1',
    value: 1,
    name: '立即上架',
  },
  {
    id: '2',
    value: 2,
    name: '稍后上架',
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
    .then((res) => {
      allGrades.value = res.data.map((i: any) => i.subset).flat()
      return getSubjects()
    })
    .then((res) => {
      allSubjects.value = res.data
    })
    .catch()
}
loadSelectOption()

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

const newCoverUrl = ref('')
const showImgSrc = ref<string>('')
const active = ref(0)

const bgc = ref('#e2e5ec')
const mouseEnter = () => {
  bgc.value = '#BEC2CB'
}
const mouseLeave = () => {
  bgc.value = '#e2e5ec'
}
const imageFile = reactive<{ file: Blob | null }>({ file: null })
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  //图片上传到服务器返回url
  //url在res.data.url
  if (currentTarget.files) {
    imageFile.file = currentTarget.files[0]
    var imageSize = currentTarget.files[0].size
    var formData = new FormData()
    formData.append('file', currentTarget.files[0])
    if (imageSize < 1048576) {
      console.log("ok")
      upload(formData)
        .then((res: any) => {
          if (res.code != 20000) {
            console.log(res)
            console.log("失败")
            ElNotification({
              title: '封面上传失败',
              message: res.msg,
              type: 'error'
            })
          } else {
            console.log(res)
            newCoverUrl.value = res.data.url
          }
        })
        .catch(res => {
          ElNotification({
            title: '封面上传失败',
            message: res.msg,
            type: 'error'
          })
        })
      console.log(imageFile.file)
      var reader = new FileReader();
      reader.readAsDataURL(imageFile.file);
      reader.onload = () => {
        showImgSrc.value = reader.result as string;
      }
    } else {
      console.log("too big")
      imageFile.file = null
      ElNotification({
        title: '图片不能大于1MB',
        type: 'error'
      })
    }
  }
}

const newProductData = reactive<any>({
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
  gradeId: '',
  cover: newCoverUrl.value
});

const newContentData = ref<any>([])

const create = () => {
  newContentData.value = tableData.filter((item: any) => item.checked)
  let data = newContentData.value.map((item: any) => item.id)
  console.log(data)
  createProduct(newProductData)
    .then((res: any) => {
      if (res.code == 20000) {
        addProduct({
          productId: res.msg,
          coursesQuestionPackagesIds: data
        }).then((res: any) => {
          if (res.code == 20000) {
            ElNotification({
              title: '新建商品成功',
              type: 'success',
            })
          } else {
            ElNotification({
              title: '未知错误',
              message: '加入课程包时' + res.msg,
              type: 'error',
            })
          }
        })
          .catch((res: any) => {
            ElNotification({
              title: '未知错误',
              message: res.msg,
              type: 'error',
            })
          })
      } else {
        ElNotification({
          title: '新建失败',
          message: '创建商品时' + res.msg,
          type: 'error',
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error',
      })
    })
}
</script>

<template>
  <div class="page">
    <el-steps :active="active" align-center finish-status="success" class="steps">
      <el-step title="基本信息" />
      <el-step title="选择课程包" />
      <el-step title="价格信息" />
    </el-steps>
    <el-divider></el-divider>

    <div class="step-1" v-if="active == 0">
      <div class="image-row">
        <div class="image-row-image"></div>
        <div class="image-row-button">
          <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
            @dragleave="mouseLeave">
            <img class="show-img" id="show_img" :src="showImgSrc" />
            <div class="upload-file-area-text">
              <el-text>点击此处或拖拽上传封面</el-text>
              <el-text>图片不大于1MB</el-text>
              <el-text>只接受 *.png *.jpg *.jpeg</el-text>
            </div>
            <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
              @change="handleFileChange" />
          </div>
        </div>
      </div>
      <div class="input-row">
        <div class="input-title">
          <el-text style="">商品名称：</el-text>
        </div>
        <div class="input-container">
          <el-input class="input-input" v-model="newProductData.name" />
        </div>
      </div>
      <div class="input-row">
        <div class="input-title">
          <el-text style="">分类：</el-text>
        </div>
        <div class="input-container">
          <el-select class="input-input" placeholder="请选择学习阶段" v-model="newProductData.gradeId">
            <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select class="input-input" placeholder="请选择学科阶段" v-model="newProductData.subjectId">
            <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select class="input-input" placeholder="请选择版本" v-model="newProductData.version">
            <el-option v-for="item in allVersion" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
          <el-select class="input-input" placeholder="请选择商品种类" v-model="newProductData.type">
            <el-option v-for="item in allType" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
      </div>
      <div style="margin-left: 10px;" class="input-row">
        <div class="input-title">
          <el-text>详细：</el-text>
        </div>
        <el-select class="input-input" placeholder="请选择是否热门" v-model="newProductData.hot">
          <el-option v-for="item in allHot" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-select style="margin-left: 15px;" class="input-input" placeholder="请选择版本种类"
          v-model="newProductData.versionType">
          <el-option v-for="item in allversionType" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="next-button-row">
        <el-button class="next-button-row-button" type="text" @click="next">下一步<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon></el-button>
      </div>
    </div>

    <TablePage class="table-class" :loading="loading" :itemsTotalLength="totalLength" :columns="tableColumn"
      :data="tableData" @paginationChange="loadData" v-else-if="active == 1">
      <SearchBar class="search-bar" :items="searchBarItems" @change="loadData"></SearchBar>
      <div style="white-space:nowrap;margin-left: 5px;margin-top: 15px;margin-bottom: 15px;">
        <!-- <el-button type="primary"
          style="max-width: 150px;margin-left: 5px;margin-top: 15px;margin-bottom: 15px;">将课程包加入商品</el-button> -->
        <el-button class="next-button-row-button" type="text" @click="up"><el-icon class="el-icon--left">
            <ArrowLeft />
          </el-icon>上一步</el-button>
        <el-button class="next-button-row-button" type="text" @click="next">下一步<el-icon class="el-icon--right">
            <ArrowRight />
          </el-icon></el-button>
      </div>
    </TablePage>

    <div class="step-2" v-else-if="active == 2">
      <div style="margin-left: 15px;" class="next-button-row">
        <el-button class="next-button-row-button" type="text" @click="up"><el-icon class="el-icon--left">
            <ArrowLeft />
          </el-icon>上一步</el-button>
      </div>
      <div class="part2" style="margin-top: 20px; margin-left: 160px;">

        <el-text style="margin-left: 15px;">商品价格: </el-text>

        <div style="margin-top:3px">
          <el-text>安卓: </el-text>
          <el-input class="input-length" placeholder="请输入(元)" v-model="newProductData.androidPrice">元</el-input>
          / <el-input class="input-length" placeholder="请输入（积分）" v-model="newProductData.androidPoint">积分</el-input>
        </div>

        <div style="margin-left: 30px;">
          <el-text>IOS: </el-text>
          <el-input class="input-length" placeholder="请输入T币价格" v-model="newProductData.tcoin">T币</el-input>
          / <el-input class="input-length" placeholder="请输入（积分）" v-model="newProductData.iosPoint">积分</el-input>
        </div>
      </div>

      <div style="margin-left: 175px; margin-top:50px;">
        <el-text>是否上架: </el-text>

        <el-select style="margin-left: 27px;" input-length class="input-input" placeholder="请选择是否立即上架"
          v-model="newProductData.status">
          <el-option v-for="item in allstatus" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
        <el-button style="margin-left: 20px;" type="primary" @click="create()">确认新建商品</el-button>
      </div>

      <!-- <div style="margin-top: 200px;margin-right: 40px;">
        <el-button type="primary" @click="up()">上一页</el-button>
      </div> -->
    </div>

  </div>
</template>

<style scoped lang="scss">
.upload-file-area {
  width: 300px;
  min-height: 200px;
  background-color: v-bind(bgc);
  margin-bottom: 15px;
  position: relative;
  display: flex;
  align-items: center;

  >.show-img {
    width: 300px;
    height: auto;
    pointer-events: none;
    z-index: 3;
  }

  >.upload-file-area-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  >.upload-file-input {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
}

.page {
  width: calc($page-width - 10px);
  height: calc($page-height - 10px);
  display: flex;
  flex-direction: column;

  >.steps {
    padding-top: 50px;
  }

  .step-1 {
    >.image-row {
      margin-bottom: 20px;
      display: flex;
      align-items: flex-end;

      >.image-row-image {
        margin-left: 20px;
        width: 400px;
        height: calc(400px / 16 * 9);
      }

      >.image-row-button {
        margin-left: 20px;
      }
    }

    >.input-row {
      margin-bottom: 20px;
      min-height: 50px;
      display: flex;
      align-items: center;

      >.input-title {
        min-width: 100px;
        display: flex;
        justify-content: flex-end;
      }

      >.input-container {
        >.input-input {
          width: 220px;
          margin: 9px;
        }
      }
    }

    >.next-button-row {
      flex-grow: 1;

      >.next-button-row-button {
        margin-left: 20px;
      }
    }
  }
}

.search-bar {
  width: calc($page-width - 30px);
  margin-left: 5px;
}

.table-class {
  margin-left: 5px;
  height: calc($page-height - 160px);
}

.part2 {
  display: flex;
  flex-direction: row;
}

.input-length {
  width: 120px;
}
</style>
