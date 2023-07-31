<script lang="tsx">
import '@wangeditor/editor/dist/css/style.css';
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { upload } from '@/apis/upload';

export default {
    components: { Editor, Toolbar },
    setup() {
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
                // // 菜单组，包含多个菜单
                // {
                //     key: 'group-image', // 必填，要以 group 开头
                //     title: '图片', // 必填
                //     iconSvg: '<svg>picture</svg>',
                //     menuKeys: ['uploadImage']
                // },
                'divider',
                'emotion',
                'blockquote',
                'headerSelect',
                'redo',
                'undo',
                'fullScreen'
            ]
        };
        const editorConfig = { placeholder: '请输入内容...', };

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
        const handleChange = (editor: any) => {
            console.log('change:', editor.getHtml());
            console.log('后端网址', import.meta.env.VITE_API_URL + '/api/management/upload/upload')
            console.log('token', 'Bearer ' + localStorage.token)
        };
        const handleDestroyed = (editor: any) => {
            console.log('destroyed', editor);
        };
        const handleFocus = (editor: any) => {
            console.log('focus', editor);
        };
        const handleBlur = (editor: any) => {
            console.log('blur', editor);
        };
        const customAlert = (info: any, type: any) => {
            alert(`【自定义提示】${type} - ${info}`);
        };
        // const customPaste = (editor: any, event: any, callback: any) => {
        //     console.log('ClipboardEvent 粘贴事件对象', event);

        //     // 自定义插入内容
        //     editor.insertText('xxx');

        //     // 返回值（注意，vue 事件的返回值，不能用 return）
        //     callback(false); // 返回 false ，阻止默认粘贴行为
        //     // callback(true) // 返回 true ，继续默认的粘贴行为
        // };

        const uploadImage = (resultFiles: any, insertImgFn: any) => {
            
            var imgUrl
            upload(resultFiles)
                .then((res: any) => {
                    imgUrl = res.data.url
                })
                .catch()
            insertImgFn(imgUrl)
        };
        //         editor.config.customUploadImg = function (resultFiles, insertImgFn) {
        //     // resultFiles 是 input 中选中的文件列表
        //     // insertImgFn 是获取图片 url 后，插入到编辑器的方法

        //     // 上传图片，返回结果，将图片插入到编辑器中
        //     
        // }
        // const printHtml = () => {
        //     const editor = editorRef.value;
        //     if (editor == null) return;
        //     console.log(editor.getHtml());
        // };

        // const disable = () => {
        //     const editor = editorRef.value;
        //     if (editor == null) return;
        //     editor.disable()
        // };

        return {
            editorRef,
            mode: 'simple',
            valueHtml,
            toolbarConfig,
            editorConfig,
            handleCreated,
            handleChange,
            handleDestroyed,
            handleFocus,
            handleBlur,
            customAlert,
            // customPaste,
            uploadImage
            // insertText,
            // printHtml,
            // disable
        };
    },
};
</script>

<template>
    <div>
        <!-- <button @click="insertText">insert text</button>
        <button @click="printHtml">print html</button>
        <button @click="disable">disable</button> -->
    </div>
    <div style="border: 1px solid #ccc; margin-top: 10px">
        <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
        <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
            @onCreated="handleCreated" @onChange="handleChange" @onDestroyed="handleDestroyed" @onFocus="handleFocus"
            @onBlur="handleBlur" @customAlert="customAlert" @uploadImage="uploadImage" />
    </div>
    <div style="margin-top: 10px">
        <textarea v-model="valueHtml" readonly style="width: 100%; height: 200px; outline: none"></textarea>
    </div>
</template>
  

  