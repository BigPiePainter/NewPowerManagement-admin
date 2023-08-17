<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGrades } from '@/apis/grade'
import { upload } from '@/apis/upload'
import {
  getCourseCategory,
  createCourseCategory,
  editCourseCategory,
  deleteCourseCategory
} from '@/apis/courseCategory'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '课程类目' }]

const action = ref<number>(0)
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 100
  },
  {
    dataKey: 'icon',
    key: 'icon',
    title: '图标',
    width: 150,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.icon}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.icon]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '课程类目',
    width: 120
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 80
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => editCategory(item.rowData.id)}>
            编辑
          </el-button>
          <el-button link type="danger" onClick={() => deleteCategory(item.rowData.id)}>
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

const editId = ref<any>()
const editCategory = (id: any) => {
  action.value = 2
  newCourseCategoryDialogShow.value = true
  editId.value = id
}

const deleteCategory = (id: any) => {
  var args = {
    id: id
  }
  deleteCourseCategory(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: '失败',
          message: res.msg,
          type: 'error',
        })
      } else {
        ElNotification({
          title: '删除成功',
          type: 'success',
        })
      }
    })
    .finally(() => {
      loadData()
    })
}

const newCourseCategoryContext = reactive<any>({
  title: '', url: ''
})
const newCourseCategoryDialogShow = ref(false)
const allGrades = reactive<any>([])
const newCourseCategory = () => {
  action.value = 1
  allGrades.length = 0
  getGrades().then((res: any) => {
    res.data.forEach((item: any) => {
      item.subset.forEach((item: any) => {
        var dataSample = {
          id: item.id,
          level: item.level,
          name: item.name
        }
        allGrades.push(dataSample)
      })
    })
  }).finally(() => {
    newCourseCategoryDialogShow.value = true
    newCourseCategoryContext.name = ''
    newCourseCategoryContext.icon = ''
    newCourseCategoryContext.gradeId = ''
  })
}

const confirmNewCourseCategory = () => {
  console.log(newCourseCategoryContext)

  if (action.value == 1) {
    var args = {
      name: newCourseCategoryContext.name,
      icon: newCourseCategoryContext.icon,
      gradeId: newCourseCategoryContext.gradeId
    }
    createCourseCategory(args)
      .then((res: any) => {
        if (res.code == 20000) {
          ElNotification({
            title: '成功',
            message: '课程类目新建成功',
            type: 'success',
          })
        } else {
          ElNotification({
            title: '失败',
            message: res.msg,
            type: 'error',
          })
        }
      })
      .catch()
      .finally(() => {
        loadData()
        newCourseCategoryDialogShow.value = false
      })
  } else if (action.value == 2) {
    var args2 = {
      id: editId.value,
      name: newCourseCategoryContext.name,
    }
    editCourseCategory(args2)
      .then((res: any) => {
        if (res.code == 20000) {
          ElNotification({
            title: '成功',
            message: '课程类目编辑成功',
            type: 'success',
          })
        } else {
          ElNotification({
            title: '失败',
            message: res.msg,
            type: 'error',
          })
        }
      })
      .catch()
      .finally(() => {
        loadData()
        newCourseCategoryDialogShow.value = false
      })
  }
}

const cancelNewCourseCategory = () => {
  newCourseCategoryDialogShow.value = false
}

const tableData = reactive<any>([])

const loadData = () => {
  getCourseCategory()
    .then((res: any) => {
      tableData.length = 0
      if (res.code != 20000) {
        ElNotification({
          title: 'error',
          message: res.msg,
          type: 'error',
        })
      } else {
        res.data.forEach((item: any) => {
          tableData.push(item)
        })
      }
    })
}
loadData()

const bgc = ref('#e2e5ec')
const mouseEnter = () => {
  bgc.value = '#BEC2CB'
}
const mouseLeave = () => {
  bgc.value = '#e2e5ec'
}

const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  //图片上传到服务器返回url
  //url在res.data.url
  if (currentTarget.files) {
    var imageSize = currentTarget.files[0].size
    var formData = new FormData()
    formData.append('file', currentTarget.files[0])
    if (imageSize < 1048576) {
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
            newCourseCategoryContext.icon = res.data.url
          }
        })
        .catch()
    } else {
      console.log("too big")
      ElNotification({
        title: '图片不能大于1MB',
        type: 'error'
      })
    }
  }
}
</script>

<template>
  <TablePage class="course-category-table" :columns="tableColumns" :data="tableData" :row-height="59">
    <div>
      <el-button @click="newCourseCategory" class="new-poster-button" type="primary">新增</el-button>
    </div>
  </TablePage>

  <el-dialog class="new-class-dialog" width="370px" v-model="newCourseCategoryDialogShow">
    <div>
      <div v-if="action == 1" v-bind:style="{ backgroundColor: bgc }" class="upload-file-area" @mouseenter="mouseEnter"
        @mouseleave="mouseLeave" @dragenter="mouseEnter" @dragleave="mouseLeave">
        <img class="show-img" id="show_img" :src="newCourseCategoryContext.icon" />
        <div class="upload-file-area-text">
          <el-text>点击此处或拖拽上传icon</el-text>
          <el-text>图片不大于1MB</el-text>
          <el-text>只接受 *.png *.jpg *.jpeg</el-text>
        </div>
        <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
          @change="handleFileChange" />
      </div>
      <div class="div-input-element">
        <span class="dialog-span" style="color: #fa1010;">
          类目名称：
        </span>
        <el-input class="dialog-input" v-model="newCourseCategoryContext.name">
        </el-input>
      </div>
      <div v-if="action == 1" class="div-input-element" style="color: #fa1010;">
        <span class="dialog-span">
          学习阶段：
        </span>
        <el-select class="dialog-input" placeholder="请选择学习阶段" v-model="newCourseCategoryContext.gradeId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>{{ action == 1 ? '新建课程类目' : '编辑课程类目' }}</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewCourseCategory">确定</el-button>
      <el-button @click="cancelNewCourseCategory">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.upload-file-area {
  // text-align: center;
  width: 300px;
  min-height: 200px;
  //height: 300px;
  background-color: v-bind(bgc);
  margin-bottom: 15px;
  //border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;

  // &:hover{
  //   background-color: green;
  // }
  >.show-img {
    //height: 300px;
    width: 300px;
    height: auto;
    //border-radius: 5px;
    pointer-events: none;
    //position: absolute;
    //top: 80px;
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

.displaypic {
  width: 100px;
  height: 100px;
}

.course-category-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-poster-button {
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
