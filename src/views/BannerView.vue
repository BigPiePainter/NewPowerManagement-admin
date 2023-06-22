<script setup lang="tsx">
import { ref, reactive, watch, h } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
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

const tableData: object[] = reactive([])

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  tableData.push(data)
}

console.log(tableData)

const newBannerContext = reactive({
  title: '', link: ''
})
const newBannerDialogShow = ref(false)
const showImgSrc = ref<string>('')
const imageFile = reactive<{ file: Blob | null }>({ file: null })


const newBanner = () => {
  newBannerDialogShow.value = true
  imageFile.file = null
  newBannerContext.title = ''
  newBannerContext.link = ''
  showImgSrc.value = ''
}

const confirmNewBanner = () => {
  console.log(newBannerContext)
  ElNotification({
    title: 'Title',
    message: h('i', { style: 'color: teal' }, 'This is a reminder'),
  })
  newBannerDialogShow.value = false
}

const cancelNewBanner = () => {
  newBannerDialogShow.value = false
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
  if (currentTarget.files) {
    imageFile.file = currentTarget.files[0]
    console.log(imageFile.file)
    var reader = new FileReader();
    reader.readAsDataURL(imageFile.file);
    reader.onload = () => {
      showImgSrc.value = reader.result as string;
    }
  }
}
// const MouseMovement=()=>{
// 	// 定义默认的宽高
// 	const movement = reactive({w:window.pageXOffset,h:window.pageYOffset});
// 	onMounted(()=>{
// 		// 当窗口发生变化时候更新宽高
// 		window.addEventListener("dragenter",function(event){
// 			movement.w = event.pageX;
// 			movement.h = event.pageY;
//       console.log(movement.w + ',' + movement.h)
// 		})
// 	})
// 	// 返回size
// 	return movement;
// }
// MouseMovement()

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

        <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
          @dragleave="mouseLeave">
          <img class="show-img" id="show_img" :src="showImgSrc" />
          <div class="upload-file-area-text">
            <div>icon</div>
            <el-text>点击此处或拖拽上传海报</el-text>
            <el-text>只接受 *.png *.jpg *.jpeg</el-text>
          </div>

          <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
            @change="handleFileChange" />
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
    // width: 100%;
    // height: 100%;
    // height: 300px;
    // width: 300px;
    //border-radius: 5px;
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
