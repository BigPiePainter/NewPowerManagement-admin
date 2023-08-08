<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
// import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { ElNotification } from 'element-plus'

import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
// import SearchBar from '@/components/SearchBar.vue'
// import { getGoodQuestionPack, createGoodQuestionPack } from '@/apis/questionStore'
import { getGoodQuestion, deleteGoodQuestion } from '@/apis/questionStore'
import RichTextEditor from '@/components/RichTextEditor.vue';

const allGrades = ref<any>([])
const allSubjects = ref<any>([])

const deleteQuestion = (id: any) => (
    deleteGoodQuestion(id)
        .then((res: any) => {
            if (res.code != 20000) {
                ElNotification({
                    title: '未知错误',
                    message: res.msg,
                    type: 'error'
                })
            } else {
                ElNotification({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
            }
        }).catch((err) => {
            ElNotification({
                title: '未知错误',
                message: err.msg,
                type: 'error'
            })
        })
)

const loadSubjectsOption = () => {
    getSubjects()
        .then((res) => (allSubjects.value = res.data))
        .catch()
}

const loadGradesOption = () => {
    getGrades()
        .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
        .catch()
}

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
    { name: '题库管理', path: '' },
    { name: '好题详情', path: '/question-detail' }
]
const tableData = reactive<any>([])
const totalLength = ref<Number>()
const loading = ref(true)



const router = useRouter()
// const createQuestionDailogShow = ref(false)


const questionCreate = () => { router.push({ path: 'question-create' }) }


const searchQuestionData = reactive<{

    difficultyType: string,
    gradeId: string,
    type: string,
    id: string,
    subjectId: string,

}>({

    difficultyType: '',
    gradeId: '',
    type: '',
    id: '',
    subjectId: '',


});

const paginationInfo = reactive({
    currentPage: 1,
    pageSize: 20
})

const loadData = () => {
    tableData.length = 0
    loading.value = true
    var args = {
        pageNum: paginationInfo.currentPage,
        pageSize: paginationInfo.pageSize,
        gradeId: searchQuestionData.gradeId,
        difficultyType: searchQuestionData.difficultyType,
        subjectId: searchQuestionData.subjectId,
        type: searchQuestionData.type
    }

    getGoodQuestion(args)
        .then((res) => {
            console.log(res)
            res.data.records.forEach((item: any) => {
                tableData.push(item)
            });
            console.log(tableData)
            totalLength.value = res.data.records.length
        })
        .catch(() => { })
        .finally(() => {
            loading.value = false
        })
    tableData.forEach((item: any) => {
        console.log(item)
    })
}
loadData()
//------------------下载文档格式功能-----------------------

const downloadFromatFile = () => { }

//-------------------------------------------------------
</script>

<template>
    <div class="margin">
        <div class="subandgrade">
            <div>
                <el-text style="margin-left: 15px;">科目:</el-text>
                <el-select @click="loadSubjectsOption" style="margin-left:5px" class="select-width" filterable place
                    holder="请选择科目" v-model="searchQuestionData.subjectId">
                    <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div class="margin-left">
                <el-text style="margin-left: 10px;">学习阶段:</el-text>
                <el-select @click="loadGradesOption" style="margin-left:5px" class="select-width" filterable place
                    holder="请选择学习阶段" v-model="searchQuestionData.gradeId">
                    <el-option if v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
        </div>


        <div class="margin">
            <el-button type="primary" @click="questionCreate()">
                新建好题
            </el-button>
            <!-- 
            <el-button class="margin-left" type="primary">
                文档导入
            </el-button>

            <el-link class="margin-left" type="primary" @click="downloadFromatFile">
                下载文档格式
            </el-link> -->
        </div>

        <div class="margin">
            <el-text>难度:</el-text>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = ''">
                全部
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = '1'">
                容易
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = '2'">
                较易
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = '3'">
                一般
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = '4'">
                较难
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.difficultyType = '5'">
                困难
            </el-link>
        </div>

        <div class="margin">
            <el-text>题型:</el-text>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = ''">
                全部
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '1'">
                单选题
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '2'">
                多选题
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '3'">
                不定项选择题
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '4'">
                判断题
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '5'">
                填空题
            </el-link>
            <el-link class="margin-left" type="primary" @click="searchQuestionData.type = '6'">
                解答题
            </el-link>
        </div>



        <el-button style="margin:15px" @click="loadData">
            搜索:
        </el-button>

        <el-scrollbar height="1000px">

            <el-card v-for="item in tableData" :key="item.id" style="margin-bottom: 10px;">
                <div style="display: flex;">
                    <span style="margin-left: 5px;">
                        {{ item.difficultyType == 1 ? "容易"
                            : item.difficultyType == 2 ? "较易"
                                : item.difficultyType == 3 ? "一般"
                                    : item.difficultyType == 4 ? "较难"
                                        : "困难" }}
                    </span>
                    <el-divider direction="vertical" />
                    <span style="margin-left: 5px;">
                        {{ item.type == 1 ? "单选题"
                            : item.type == 2 ? "多选题"
                                : item.type == 3 ? "不定项选择题"
                                    : item.type == 4 ? "判断题"
                                        : item.type == 5 ? "填空题"
                                            : "解答题" }}
                    </span>
                    <div style="flex-grow: 1"></div>
                    <el-button @click="deleteQuestion(item.id)" type=primary>删除</el-button>
                </div>


                <RichTextEditor :questionPrompt="item.questionPrompt" :isShow="false" :id="item.id">
                </RichTextEditor>

                <div style="display:flex; flex-direction:row">
                    <div style="margin-left:10px;margin-top: 10px;" v-for="items in JSON.parse(item.options)"
                        :key="items.options">
                        {{ items.identifier }}: {{ items.value }}</div>
                </div>

                <div style="display:flex; flex-direction:row; margin-bottom: 10px;margin-top: 10px;">
                    <div style="margin-left:10px">
                        答案：{{ JSON.parse(item.answer).answers }}</div>
                </div>
            </el-card>

        </el-scrollbar>
    </div>
</template>

<style scoped>
.margin {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px
}

.row-divider {
    width: 100%;
    border-bottom: 2px #f0f2f5 solid;
    box-sizing: border-box;
    margin: 0;
}

.margin-left {
    margin-left: 25px
}


.subandgrade {
    display: flex;
    flex-direction: row
}

.select-width {
    width: 70px
}
</style>