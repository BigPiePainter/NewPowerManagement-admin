<script setup lang="tsx">
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted, watch, reactive } from 'vue';
import { Editor } from '@wangeditor/editor-for-vue';
import { upload } from '@/apis/upload';
import { ElNotification } from 'element-plus'

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

type Props = {
  questionPrompt?: string
  questionSolution?: string
  id?: string
  isShow: boolean
  option?: string
  setHeight?: number
  setWidth?: number
}
const props = defineProps<Props>()

// 内容 HTML
const valueHtml = ref(props.questionPrompt);
const option = ref(props.option);
const setHeight = ref(props.setHeight);
const setWidth = ref(props.setWidth);

// 模拟 ajax 异步获取内容
onMounted(() => {

});

const editorConfig = reactive({ placeholder: '', readOnly: (!props.isShow) });

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

// 编辑器回调函数
const handleCreated = (editor: any) => {
  console.log('created', editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};

const emit = defineEmits(['change'])
const handleCurrentChange = () => {
  console.log('change valueHtml', valueHtml.value);
  console.log('change option', option.value);
  emit('change', valueHtml.value, option.value)
};

const handleDestroyed = (editor: any) => {
  console.log('destroyed', editor);
  editor.destroy();
};

const insertImage = () => {
  var tg = document.getElementById("file")
  tg?.click()
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
            ElNotification({
              title: '图片上传失败',
              message: res.msg,
              type: 'error'
            })
          } else {
            const editor = editorRef.value
            editor.setHtml(editor.getHtml() + `<img src=` + res.data.url + ` />`)
            // editor.dangerouslyInsertHtml(`<img src=` + res.data.url + ` />`)
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

watch(() => props.questionPrompt, (val: any) => {
  valueHtml.value = val
  console.log("组件watch questionPrompt",val)
},
  { deep: true, immediate: true }
)

watch(() => props.option, (val: any) => {
  option.value = val
  console.log("组件watch option",val)
},
  { deep: true, immediate: true }
)
</script>

<template>
  <div style="border: 1px solid #ccc">
    <Editor :defaultConfig="editorConfig" mode="simple" v-model=valueHtml :style="{height: setHeight + 'px',width: setWidth + 'px'}"
      @onCreated="handleCreated" @onDestroyed="handleDestroyed" @onChange="handleCurrentChange" />
    <button v-if="isShow" style="margin-top: 10px;" @click="insertImage">插入图片</button>
    <input v-if="isShow" type="file" accept="image/png, image/jpeg, image/jpg" id="file" @change="handleFileChange"
      style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;" />
  </div>
</template>

<style>
.margin {
  margin: 10px
}

.editor{
  height: 50px; 
  width: 250px; 
  overflow-y: hidden
}
</style>