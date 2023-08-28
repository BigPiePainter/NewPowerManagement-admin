<script setup lang="tsx">
import { getBanners, createBanner, deleteBanner } from '@/apis/banner'
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { upload } from '@/apis/upload';

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: 'banner' }]
const loading = ref(true)
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
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
        preview-src-list={[item.poster]}
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
    dataKey: 'url',
    key: 'url',
    title: '链接',
    width: 500
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      const deleteSlot = {
        reference: () => <el-button link type="danger">删除</el-button>
      }
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`删除banner ${item.rowData.title}`} onConfirm={() => bannerDelete(item)} v-slots={deleteSlot} />
        </>
      )
    },
    width: 100,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]
const tableData: object[] = reactive([])

const newBannerContext = reactive({
  title: '', url: ''
})
const newBannerDialogShow = ref(false)
const showImgSrc = ref<string>('')

const newBanner = () => {
  newBannerDialogShow.value = true
  newBannerContext.title = ''
  newBannerContext.url = ''
  showImgSrc.value = ''
}

const confirmNewBanner = () => {
  console.log(newBannerContext)

  var args = {
    title: newBannerContext.title,
    url: newBannerContext.url,
    poster: showImgSrc.value
  }
  createBanner(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: 'banner已上传',
          type: 'success',
        })
        newBannerDialogShow.value = false
        loadData()
      } else {
        ElNotification({
          title: '上传失败',
          message: res.msg,
          type: 'error',
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
}

const cancelNewBanner = () => {
  newBannerDialogShow.value = false
}

const bannerDelete = (item: any) => {
  var args = {
    id: item.rowData.id
  }
  deleteBanner(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: `banner ${item.rowData.title} 已删除`,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          type: 'error',
        })
      }
      loadData()
    })
    .catch()
}

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
    console.log(currentTarget.files[0])
    var imageSize = currentTarget.files[0].size
    var formData = new FormData()
    formData.append('file', currentTarget.files[0])
    console.log(formData)
    if (imageSize < 1048576) {
      upload(formData)
        .then((res: any) => {
          if (res.code != 20000) {
            ElNotification({
              title: '封面上传失败',
              message: res.msg,
              type: 'error'
            })
          } else {
            showImgSrc.value = res.data.url
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

const dataCompute = (data: any) => {
  tableData.length = 0
  data.data.forEach((item: any) => {
    tableData.push(item)
  });
}

const loadData = () => {
  loading.value = true
  getBanners()
    .then((res) => {
      dataCompute(res)
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
}
loadData()

</script>

<template>
  <div>
    <TablePage class="banner-table" :loading="loading" :columns="tableColumns" :data="tableData" :row-height="59">
      <div>
        <el-button @click="newBanner" class="new-banner-button" type="primary">新增</el-button>
      </div>
    </TablePage>

    <el-dialog class="new-class-dialog" width="370px" v-model="newBannerDialogShow">
      <div>

        <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
          @dragleave="mouseLeave">
          <img class="show-img" id="show_img" :src="showImgSrc" />
          <div class="upload-file-area-text">
            <el-text>点击此处或拖拽上传海报</el-text>
            <el-text>图片不大于1MB</el-text>
            <el-text>只接受 *.png *.jpg *.jpeg</el-text>
          </div>

          <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
            @change="handleFileChange" />
        </div>

        <div class="div-input-element">
          <span class="dialog-span">
            <el-text style="color:#ff0000">*</el-text>
            标题：
          </span>
          <el-input class="dialog-input" v-model="newBannerContext.title">
          </el-input>
        </div>
        <div class="div-input-element">
          <span class="dialog-span">
            <el-text style="color:#ff0000">*</el-text>
            跳转链接：
          </span>
          <el-input class="dialog-input" v-model="newBannerContext.url">
          </el-input>
        </div>
      </div>
      <template #header>
        <el-text>新建 banner</el-text>
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

.banner-table {
  width: calc($page-width - $gap);
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
