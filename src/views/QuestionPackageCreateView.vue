<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { ElButton, ElNotification } from 'element-plus'
import { getSubjects } from '@/apis/subject'
import { getGrades } from '@/apis/grade'
import { InputType } from '@/type'
import { useRoute } from 'vue-router'
import { ref, reactive } from 'vue'
import { createGoodQuestionPack } from '@/apis/questionPackageQuestion'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGoodQuestion, } from '@/apis/questionStore'
import { getAllTeachers } from '@/apis/teacher';
import { upload } from '@/apis/upload'
import { getLabels } from '@/apis/label';



const change = (valueHtml: any) => {
            newGoodQuestion.description = valueHtml
}
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '好题包管理', path: '' }]

const allLabel = ref<any>([])
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const allTeacher = ref<any>([])

const loadSelectOption = () => {

        getGrades()
        .then((res) => {
            allGrades.value.length = 0
            allGrades.value = res.data.map((i: any) => i.subset).flat()
            return getSubjects()
        }).then((res) => {
            allSubjects.value.length = 0
            allSubjects.value = res.data
            return getAllTeachers()
        }).then((res) => {
            allTeacher.value.length = 0
            allTeacher.value = res.data
            return getLabels()
        }).then((res) => {
            allLabel.value.length = 0
            allLabel.value = res.data
        })
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


const allDifficultyType = [
    {
        id: '1',
        value: '1',
        label: '容易  ',
    },
    {
        id: '2',
        value: '2',
        label: '较易 ',
    },
    {
        id: '3',
        value: '3',
        label: '一般',
    },
    {
        id: '4',
        value: '4',
        label: '较难 ',
    },
    {
        id: '5',
        value: '5',
        label: '困难',
    }
]

const newGoodQuestion = reactive<any>([])
const showImgSrc = ref<string>('')
const imageFile = reactive<{ file: Blob | null }>({ file: null })

const handleFileChange = (e: Event) => {
    const currentTarget = e.target as HTMLInputElement;
    if (currentTarget.files) {
        imageFile.file = currentTarget.files[0]
        var formData = new FormData()
        formData.append('file', currentTarget.files[0])
        upload(formData)
            .then((res: any) => {
                if (res.data.url) {
                    console.log(res)
                    showImgSrc.value = res.data.url
                } else {
                    console.log("失败")
                }
            })
            .catch()
    }
}

const createnewGoodQuestion = () => {
    loading.value = true
    var args = {
        cover: showImgSrc.value,
        name: newGoodQuestion.name,
        teacherId: newGoodQuestion.teacherId,
        description: newGoodQuestion.description,
        difficultyLevel: newGoodQuestion.difficultyLevel,
        gradeId: newGoodQuestion.gradeId,
        type: 2

    }


    createGoodQuestionPack(args)
        .then((res: any) => {
            if (res.code == '20000') {
                ElNotification({
                    title: '成功',
                    message: '好题包创建成功',
                    type: 'success',
                })
            }
            loading.value = false
        })
        .catch(() => {
            ElNotification({
                title: '失败',
                message: '创建失败',
                type: 'warning',
            })
        })
        .finally(() => {
            loading.value = false

        })
}



</script>

<template>
    <div class="div-input-element">
        <div>

            <div class="top-part">
                <el-text class="dialog-el-text" >
                    名称：
                </el-text>
                <el-input style="width: 217px;" class="dialog-input" placeholder="请输入好题包名称" v-model="newGoodQuestion.name">
                </el-input>
            </div>


            <div class="top-part">
                <el-text class="dialog-el-text" >
                    学科：
                </el-text>
                <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.subjectId">
                    <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>


            <div class="top-part" >
                <el-text class="dialog-el-text" >
                    阶段：
                </el-text>
                <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.gradeId">
                    <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>


            </div>

            <div class="div-input-element">
                <el-text class="dialog-el-text" >
                    好题封面：
                </el-text>
                <div style="max-width: 360px;" class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
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
            <el-text class="dialog-el-text" style="font-size: 24px;">
                详情描述：
            </el-text>
            <RichTextEditor  style="max-width: 600px;" :questionPrompt="newGoodQuestion.description" :isShow="true" @change="change"
                v-model="newGoodQuestion.description">
            </RichTextEditor>
        </div>

        <div class="div-input-element">
            <el-text class="dialog-el-text" >
                难度：
            </el-text>
            <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.difficultyType">
                <el-option v-for="items in allDifficultyType" :key="items.id" :label="items.label" :value="items.id" />
            </el-select>
        </div>

        <div class="div-input-element">
            <el-text class="dialog-el-text" >
                标签：
            </el-text>
            <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.labelId">
                <el-option v-for="item in allLabel" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>



        <div class="div-input-element">
            <el-text class="dialog-el-text" >
                老师：
            </el-text>
            <el-select class="dialog-input" placeholder="请选择" v-model="newGoodQuestion.teacherId">
                <el-option v-for="item in allTeacher" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </div>

        <div class="rich-text-area">
            <el-button @click="createnewGoodQuestion">创建好题包</el-button>
        </div>



    </div>
</template>
  
<style scoped lang="scss">
.div-input-element {
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

.top {
    display: flex;
    flex-direction: row;
    width: 600px
}
</style>