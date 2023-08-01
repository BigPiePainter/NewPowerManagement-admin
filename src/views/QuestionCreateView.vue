<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { ElButton } from 'element-plus'
import { getSubjects } from '@/apis/subject'
import { getGrades } from '@/apis/grade'
import { InputType } from '@/type'
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { getCourseQuestionPackage } from '@/apis/coursequestionpackage'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGoodQuestion, deleteGoodQuestion, createGoodQuestion } from '@/apis/questionStore'




const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '题库管理', path: '' }]


const allGrades = ref<any>([])
const allSubjects = ref<any>([])


const loadSelectOption = () => {

    getGrades()
        .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
        .catch()

    getSubjects()
        .then((res) => (allSubjects.value = res.data))
        .catch()
}

loadSelectOption()

const loading = ref(true)
const bgc = ref('#e2e5ec')
const mouseEnter = () => {
    bgc.value = '#BEC2CB'
}
const mouseLeave = () => {
    bgc.value = '#e2e5ec'
}

const newGoodQuestion = reactive<any>([])
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
const createnewGoodQuestion = () => {
    loading.value = true
    var args = {
        cover: showImgSrc.value,
        label: newGoodQuestion.name,
        name: 'newGoodQuestion.label',
        teacherId: newGoodQuestion.teacherId
    }


    createGoodQuestion(args)
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
    <div class>

        <div class="div-input-element">


            <div>
            <div class="top-part">
                <el-text class="dialog-el-text">
                    *名称：
                </el-text>
                <el-select class="dialog-input" placeholder="输入好题名称" v-model="newGoodQuestion.name">
                </el-select>
            </div>

            <div class="top-part">
                <el-text class="dialog-el-text">
                    *年级：
                </el-text>
                <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.gradeId">
                    <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>

            <div class="top-part">
                <el-text class="dialog-el-text">
                    *学科：
                </el-text>
                <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.subjectId">
                    <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
        </div>

        <div class="div-input-element">
            <el-text class="dialog-el-text">
                *好题封面：
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
    </div>

        <div class="div-input-element">
            <el-text class="dialog-el-text" v-model="newGoodQuestion.label">
                标签：
            </el-text>
            <el-input class="dialog-input" placeholder="请选择">
            </el-input>
        </div>

        <div class="div-input-element">
            <el-text class="dialog-el-text">
                老师：
            </el-text>
            <el-input class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.teacherId">
            </el-input>
        </div>

        <div class="rich-text-area">
            <el-button @click="createnewGoodQuestion()">createnewGoodQuestion</el-button>
        </div>

    </div>
    <RichTextEditor />
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






.top-part {
    display: flex;
    flex-direction: row;
    width: 300px;
    margin: 10px;
}

.top{
    display: flex;
    flex-direction: row;
    width:600px
}
</style>