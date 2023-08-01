<script setup lang="tsx">
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { upload } from '@/apis/upload';


// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref('');

// 模拟 ajax 异步获取内容
onMounted(() => {
    setTimeout(() => {
        valueHtml.value = '';
    }, 1500);
});

const toolbarConfig = {
    /* 工具栏配置 */
    toolbarKeys: [
        'bold',
        'clearStyle',
        'color',
        'bgColor',
        '|',
        'divider',
        'emotion',
        'blockquote',
        'headerSelect',
        'redo',
        'undo',
        'fullScreen'
    ]
}
    ;
const editorConfig = { placeholder: '请输入内容...' };

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

const handleDestroyed = (editor: any) => {
    console.log('destroyed', editor);
};

const insertImage = () => {
    var tg = document.getElementById("file")
    tg?.click()

    // editor.disable()
    // console.log(editor)
}

const handleFileChange = (e: Event) => {
    const currentTarget = e.target as HTMLInputElement;

    //图片上传到服务器返回url
    //url在res.data.url
    if (currentTarget.files) {
        var formData = new FormData()
        formData.append('file', currentTarget.files[0])
        upload(formData)
            .then((res: any) => {
                if (res.data.url) {
                    const editor = editorRef.value
                    console.log(res)
                    editor.dangerouslyInsertHtml(`<img src=` + res.data.url + ` />`)
                } else {
                    console.log("失败")
                }
            })
            .catch()
    }
}

</script>

<template>
    <input type="file" id="file" @change="handleFileChange" style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;" />
    <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" mode="simple" style="border-bottom: 1px solid #ccc" />
        <Editor readOnly :defaultConfig="editorConfig" mode="simple" v-model="valueHtml"
            style="height: 400px; overflow-y: hidden" @onCreated="handleCreated" @onDestroyed="handleDestroyed" />
        <button style="position: absolute;margin-top: 10px;" @click="insertImage">插入图片</button>
    </div>
</template>
  

  