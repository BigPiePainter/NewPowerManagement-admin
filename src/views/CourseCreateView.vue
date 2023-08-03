<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { createTeacherCourse, uploadCouseCover } from '@/apis/teacherCourses'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '课程管理', path: '' }, { name: '课程管理', path: '/course-management' }, { name: '新建课程' }]
const loading = ref(true)
const bgc = ref('#e2e5ec')
const mouseEnter = () => {
  bgc.value = '#BEC2CB'
}
const mouseLeave = () => {
  bgc.value = '#e2e5ec'
}

const newCourse = reactive<any>([])
const showImgSrc = ref<string>('')
const imageFile = reactive<{ file: Blob | null }>({ file: null })

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
const createNewCourse = () => {
  loading.value = true
  var args = {
    cover: showImgSrc.value,
    label: newCourse.name,
    name: 'newCourse.label',
    teacherId: newCourse.teacherId
  }


  createTeacherCourse(args)
    .then((res: any) => {
      if (res == '20000') {
        console.log('创建成功')
      }
      loading.value = false
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false

    })
}





</script>

<template>
  <div>

    <div class="div-input-element">
      <el-text class="dialog-el-text">
        *课程名称：
      </el-text>
      <el-input class="dialog-input" placeholder="输入消息标题" v-model="newCourse.name">
      </el-input>
    </div>

    <div class="div-input-element">
      <el-text class="dialog-el-text">
        *课程封面：
      </el-text>
      <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
        @dragleave="mouseLeave">
        <img class="show-img" id="show_img" :src="showImgSrc" />
        <div class="upload-file-area-text">
          <!-- <div>icon</div> -->
          <el-text>点击此处或拖拽上传封面</el-text>
          <el-text>只接受 *.png *.jpg *.jpeg</el-text>
        </div>

        <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
          @change="handleFileChange" />
      </div>
    </div>

    <div class="div-input-element">
      <el-text class="dialog-el-text" v-model="newCourse.label">
        标签：
      </el-text>
      <el-input class="dialog-input" placeholder="请选择">
      </el-input>
    </div>

    <div class="div-input-element">
      <el-text class="dialog-el-text">
        老师：
      </el-text>
      <el-input class="dialog-input" placeholder="请选择" v-model="newCourse.teacherId">
      </el-input>
    </div>

    <div class="rich-text-area">
      <el-button @click="createNewCourse()">createNewCourse</el-button>
    </div>
    <RichTextEditor/>
  </div>
</template>

<style scoped lang="scss">
.div-input-element {
  max-width: 260px;
  margin-top: 15px;
  margin-left: 15px;
}

.rich-text-area {
  max-width: calc($page-width - 30px);
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}

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
</style>