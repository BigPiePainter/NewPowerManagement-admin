<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue';
import { ElCheckbox, ElNotification } from 'element-plus'
import { createGoodQuestion } from '@/apis/questionStore'

const allGrades = ref<any>([])
const allSubjects = ref<any>([])

const loadSelectOption = () => {
    getSubjects()
        .then((res) => (allSubjects.value = res.data))
        .catch()

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


const newQuestionData = reactive<{

    difficultyType: string,
    gradeId: string,
    type: string,
    id: string,
    subjectId: string,
    questionPrompt: string,
    option: string,
    answer: string

}>({

    difficultyType: '',
    gradeId: '',
    type: '',
    id: '',
    subjectId: '',
    questionPrompt: '',
    option: '',
    answer: ''


});

const paginationInfo = reactive({
    currentPage: 1,
    pageSize: 20
})





const allQuestionType = [
    {
        id: '1',
        value: '1',
        label: '单选题 ',
    },
    {
        id: '2',
        value: '2',
        label: '多选题 ',
    },
    {
        id: '3',
        value: '3',
        label: '不定项选择题',
    },
    {
        id: '4',
        value: '4',
        label: '判断题 ',
    },
    {
        id: '5',
        value: '5',
        label: '填空题',
    },
    {
        id: '6',
        value: '6',
        label: '解答题',
    },
]


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




// const questionCreateconfirm = () => {

//     createGoodQuestionPack(newQuestionData).
//         then((res: any) => {
//             if (res.code == '20000') {
//                 ElNotification({
//                     title: '成功',
//                     message: '学生编辑成功',
//                     type: 'success'
//                 })
//                 loadData()
//             } else {
//                 ElNotification({
//                     title: '编辑失败',
//                     message: '请求错误或删除被撤回',
//                     type: 'error'
//                 })
//             }
//         }).catch()
//     createQuestionDailogShow.value = false;
// }

// const options = ref([])
// const answer = ref([])


// const loadedData = ref([])
loadSelectOption()

const trueFlase = [
    {
        id: 1, label: '正确'
    },
    {
        id: 2, label: '错误'
    }
]



const showlist = ref<any>(0)
const newSMultipleChoiceQuestion = reactive<any>({

    A: '',
    B: '',
    C: '',
    D: ''

})

const newAnswer = reactive<any>([])


const giveAnswerData = () => {
    showlist.value = 1
    var newSMultipleChoice = reactive<any>([
        { "correct": "A", value: newAnswer.A },
        { "identifier": "B", value: newSMultipleChoiceQuestion.B },
        { "identifier": "C", value: newSMultipleChoiceQuestion.C },
        { "identifier": "D", value: newSMultipleChoiceQuestion.D }
    ])

    questionData.value = newSMultipleChoice
    console.log(questionData.value)
}


const questionData = ref<any>([])

const giveData = () => {
    showlist.value = 1
    var newSMultipleChoice = reactive<any>([
        { "identifier": "A", value: newSMultipleChoiceQuestion.A },
        { "identifier": "B", value: newSMultipleChoiceQuestion.B },
        { "identifier": "C", value: newSMultipleChoiceQuestion.C },
        { "identifier": "D", value: newSMultipleChoiceQuestion.D }
    ])

    questionData.value = newSMultipleChoice
    console.log(questionData.value)
}




const confirmCreate = () => {
    var args = {

        questionPrompt: newQuestionData.questionPrompt,
        gradeId: newQuestionData.gradeId,
        difficultyType: newQuestionData.difficultyType,
        subjectId: newQuestionData.subjectId,
        type: newQuestionData.type,
        options: JSONoption.value,
        answer: JSONanswer.value
    }
    createGoodQuestion(args).then((res: any) => {
        console.log(args)
        if (res.code == 20000) {
            console.log('删除成功')
            ElNotification({
                title: '成功',
                message: '题目新建成功',
                type: 'success'
            })
        } else {
            ElNotification({
                title: '删除失败',
                message: '新建失败' + res.msg,
                type: 'error'
            })
        }

    }).catch()
}


const centerDialogVisible = ref(false)
const create = () => {
    centerDialogVisible.value = true
}


const JSONoption = ref<any>([])
const JSONanswer = ref<any>([])


const dataTransform = () => {

    JSONoption.value = JSON.stringify(questionData.value)
    JSONanswer.value = JSON.stringify(newAnswer.value)
    console.log(JSONoption)
    console.log(JSONanswer)
}

const change = (valueHtml: any) => {
    newQuestionData.questionPrompt = valueHtml
}

</script>

<template>
    <div class="margin">
        <div class="subandgrade">

            <div>
                <el-text style="margin-left: 15px;">科目:</el-text>
                <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
                    v-model="newQuestionData.subjectId">
                    <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>

            <div class="margin-left">
                <el-text style="margin-left: 10px;">学习阶段:</el-text>
                <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择学习阶段"
                    v-model="newQuestionData.gradeId">
                    <el-option if v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>

        </div>

        <div class="subandgrade" style="margin-top: 10px;">
            <div>
                <el-text style="margin-left: 15px;">难度:</el-text>

                <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
                    v-model="newQuestionData.difficultyType">
                    <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
                </el-select>

            </div>

        </div>



        <div class="subandgrade">

            <div style="margin-left: 15px; margin-top: 10px;">
                <el-text>题型:</el-text>
                <el-select style="margin-left:5px" filterable place holder="请选择学习阶段" v-model="newQuestionData.type">
                    <el-option if v-for="item in allQuestionType" :key="item.id" :label="item.label" :value="item.id" />
                </el-select>
            </div>
        </div>





        <RichTextEditor :questionPrompt="newQuestionData.questionPrompt" :isShow="true" @change="change"
            v-model="newQuestionData.questionPrompt">
        </RichTextEditor>


        <div v-if="newQuestionData.type == '1'">

            <el-text>请输入单选题目选项</el-text>
            <diV>
                a:<el-input v-model="newSMultipleChoiceQuestion.A"></el-input>
                b:<el-input v-model="newSMultipleChoiceQuestion.B"></el-input>
                c:<el-input v-model="newSMultipleChoiceQuestion.C"></el-input>
                d:<el-input v-model="newSMultipleChoiceQuestion.D"></el-input>
            <el-button @click="giveData">确认题目选项</el-button>
            </diV>

            <div v-if="showlist == 1">
                <div style="margin-top: 20px;">答案：</div>
                <el-select placeholder="请选择答案" v-model="newAnswer">
                    <el-option v-for="item in questionData" :key="item" :label="item.identifier" :value="item.value" />
                </el-select>

                <el-button style="margin:15px" @click="console.log(newAnswer), dataTransform()">
                    确认答案:
                </el-button>
            </div>
        </div>


        <div v-if="newQuestionData.type == '2'">

            <el-text>请输入多选题目选项</el-text>
            <diV>
                a:<el-input v-model="newSMultipleChoiceQuestion.a"></el-input>
                b:<el-input v-model="newSMultipleChoiceQuestion.b"></el-input>
                c:<el-input v-model="newSMultipleChoiceQuestion.c"></el-input>
                d:<el-input v-model="newSMultipleChoiceQuestion.d"></el-input>

                <el-button @click="giveData">确认题目选项</el-button>
            </diV>



            <div style="margin-top: 20px;">答案：</div>

            <el-select multiple placeholder="请选择答案" v-model="newAnswer">
                <el-option v-for="(item, key) in newSMultipleChoiceQuestion" :key="item" :label="key" :value="key" />


                <el-button style="margin:15px" @click="console.log(newAnswer), dataTransform()">
                    确认答案:
                </el-button>
            </el-select>
        </div>





        <div v-if="newQuestionData.type == '3'">

            <el-text>请输入不定项选择选项</el-text>
            <diV>
                a:<el-input v-model="newSMultipleChoiceQuestion.a"></el-input>
                b:<el-input v-model="newSMultipleChoiceQuestion.b"></el-input>
                c:<el-input v-model="newSMultipleChoiceQuestion.c"></el-input>
                d:<el-input v-model="newSMultipleChoiceQuestion.d"></el-input>

                <el-button @click="giveData">确认题目选项</el-button>
            </diV>



            <div style="margin-top: 20px;">答案：</div>

            <el-select multiple placeholder="请选择答案" v-model="newAnswer">
                <el-option v-for="(item, key) in newSMultipleChoiceQuestion" :key="item" :label="key" :value="key" />
            </el-select>
        </div>


        <div v-if="newQuestionData.type == '4'">

            <el-text>请输入判断题答案</el-text>


            <div style="margin-top: 20px;">答案：</div>

            <el-select placeholder="请选择答案" v-model="newAnswer">
                <el-option v-for="item in trueFlase" :key="item" :label="item.label" :value="item.id" />
            </el-select>


        </div>



        <div v-if="newQuestionData.type == '5'">


            <div style="margin-top: 20px;">答案：</div>
            <el-input multiple placeholder="请输入答案" v-model="newAnswer">
            </el-input>
        </div>




        <div v-if="newQuestionData.type == '6'">


            <div style="margin-top: 20px;">答案：</div>
            <el-input multiple placeholder="请输入答案" v-model="newAnswer">
            </el-input>
        </div>


        <el-button style="margin:15px" @click="create">
            创建:
        </el-button>
    </div>



    <el-dialog v-model="centerDialogVisible" title="待确认" width="30%" align-center>
        <span>是否确认新建好题</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmCreate">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style scoped>
.margin {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px
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