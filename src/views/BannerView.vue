<script setup lang="tsx">
import { ref, reactive, watch } from 'vue'
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
  poster: {}, title: '', link: ''
})

const newBannerDialogShow = ref(false)
const newBanner = () => {
  newBannerDialogShow.value = true
}

const confirmNewBanner = () => {
  console.log(newBannerContext)
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

// const showImgSrc: any = ref('')
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  if (currentTarget.files) {
    // 将input身上的files对象转换为数组类型
    const files = Array.from(currentTarget.files);
    const fileShow = currentTarget.files
    newBannerContext.poster = files
    console.log(newBannerContext)
    console.log(currentTarget.files)
    var reader = new FileReader();
    reader.readAsDataURL(fileShow[0]);
    reader.onload = () => {
      var image: any = document.getElementById("show_img");
      console.log(image)
      image.src = reader.result;
      // showImgSrc.value = reader.result;
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
watch(newBannerDialogShow, () => {
  newBannerContext.poster = ''
  newBannerContext.title = ''
  newBannerContext.link = ''

  var input: any = document.getElementById('img_input');

  var image: any = document.getElementById("show_img");
  if (image) {
    image.src = "";
  }

  // if (showImgSrc.value) {
  //   showImgSrc.value = ''
  // }

  if (input) {
    input.value = '';
  }

})
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
          <img class="show-img" id="show_img" src="" />
          <text
            style="white-space: nowrap;pointer-events: none;position: absolute;top: 210px;width: 300px;">点击此处或拖拽上传海报</text>
          <text style="white-space: nowrap;pointer-events: none;position: absolute;top: 225px;width: 300px;">只接受 *.png
            *.jpg *.jpeg</text>
          <input id="img_input" class="upload-file-input" ref="img" type="file" accept="image/png, image/jpeg, image/jpg"
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

.upload-file-area {
  text-align: center;
  width: 300px;
  height: 300px;
  background-color: v-bind(bgc);
  margin-bottom: 15px;
  //border-radius: 5px;

  // &:hover{
  //   background-color: green;
  // }
  >.show-img {
    height: 300px;
    width: 300px;
    //border-radius: 5px;
    pointer-events: none;
    position: absolute;
    top: 80px;
  }

  >.upload-file-input {
    width: 100%;
    height: 100%;
    opacity: 0;
  }
}

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
