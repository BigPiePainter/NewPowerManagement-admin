<script setup lang="tsx">
import { ref, reactive, watch } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue'
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

loadSelectOption()

const trueFlase = [
    {
        id: 1, label: '正确'
    },
    {
        id: 2, label: '错误'
    }
]

const newSMultipleChoiceQuestion = reactive<any>({
    A: '',
    B: '',
    C: '',
    D: ''
})

const questionData = ref<any>([])

const newAnswer = ref<any>([])
const count = ref<number>(0)
const giveData = () => {
    var newSMultipleChoice = reactive<any>([
        { identifier: "A", value: newSMultipleChoiceQuestion.A },
        { identifier: "B", value: newSMultipleChoiceQuestion.B },
        { identifier: "C", value: newSMultipleChoiceQuestion.C },
        { identifier: "D", value: newSMultipleChoiceQuestion.D }
    ])
    questionData.value = newSMultipleChoice
    console.log(questionData.value)
}

watch(() => newSMultipleChoiceQuestion, (val: any) => {
    giveData()
    count.value = 0
    questionData.value.forEach((item: any) => {
        if (item.value != '')
            count.value = count.value + 1
    })
    console.log('count', count.value)
    console.log('newSMultipleChoiceQuestion', val)
    console.log('questionData', questionData.value)
},
    { deep: true, immediate: true }
)

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
            ElNotification({
                title: '成功',
                message: '题目新建成功',
                type: 'success'
            })
            // newQuestionData.difficultyType = ''
            // newQuestionData.gradeId = ''
            // newQuestionData.type = ''
            // newQuestionData.id = ''
            // newQuestionData.subjectId = ''
            // newQuestionData.questionPrompt = ''
            // newQuestionData.option = ''
            // newQuestionData.answer = ''
            // newAnswer.value = []
            location.reload()
            centerDialogVisible.value = false
        } else {
            ElNotification({
                title: '新建失败',
                message: res.msg,
                type: 'error'
            })
            centerDialogVisible.value = false
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
    var args = {
        answers: [newAnswer.value.identifier],
        correct: null
    }
    JSONoption.value = JSON.stringify(questionData.value)
    JSONanswer.value = JSON.stringify(args)
    console.log(JSONoption)
    console.log(JSONanswer)
}

const change = (valueHtml: any) => {
    newQuestionData.questionPrompt = valueHtml
}

const dataTransformMu = () => {
    var args = {
        answers: newAnswer.value.map((item: any) => item.identifier),
        correct: null
    }
    JSONoption.value = JSON.stringify(questionData.value)
    JSONanswer.value = JSON.stringify(args)
    console.log(JSONoption)
    console.log(JSONanswer)
}

const dataTransformMBo = () => {
    var args = {
        answers: newAnswer.value,
        correct: null
    }
    JSONoption.value = JSON.stringify(questionData.value)
    JSONanswer.value = JSON.stringify(args)
    console.log(JSONoption)
    console.log(JSONanswer)
}

watch(() => newAnswer, (val: any) => {
    console.log('newAnswer', val)
    if (newQuestionData.type == '1') {
        dataTransform()
        console.log(JSONoption)
        console.log(JSONanswer)
    } else if (newQuestionData.type == '2' || newQuestionData.type == '3') {
        dataTransformMu()
        console.log(JSONoption)
        console.log(JSONanswer)
    } else if (newQuestionData.type == '4'
        || newQuestionData.type == '5'
        || newQuestionData.type == '6') {
        dataTransformMBo()
        console.log(JSONoption)
        console.log(JSONanswer)
    }
},
    { deep: true, immediate: true }
)
</script>

<template>
    <div class="margin">
        <div style="height: 20px;"></div>
        <div class="subandgrade">
            <div>
                <el-text style="margin-left: 15px;">科目:</el-text>
                <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
                    v-model="newQuestionData.subjectId">
                    <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <div class="margin-left">
                <el-text style="margin-left: 5px;">学习阶段:</el-text>
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
                <el-select style="margin-left:5px" filterable place holder="请选择题型" v-model="newQuestionData.type">
                    <el-option if v-for="item in allQuestionType" :key="item.id" :label="item.label" :value="item.id" />
                </el-select>
            </div>
        </div>
        <el-divider content-position="left">编辑题干</el-divider>

        <div style="padding-top: 0px;">
            <RichTextEditor :questionPrompt="newQuestionData.questionPrompt" :isShow="true" @change="change"
                v-model="newQuestionData.questionPrompt">
            </RichTextEditor>
        </div>
        <el-divider content-position="left">编辑答案</el-divider>

        <div style="width: 300px;" v-if="newQuestionData.type == '1'">
            <el-text>请输入单选题目选项</el-text>
            <diV>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">A:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.A"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">B:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.B"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">C:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.C"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">D:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.D"></el-input></div>
            </diV>
            <div v-if="count == 4">
                <div style="display: flex; margin-top: 10px;">
                    <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
                    <el-select style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
                        <el-option v-for="item in questionData" :key="item.identifier" :label="item.identifier"
                            :value="item" />
                    </el-select>
                </div>
            </div>
        </div>


        <div style="width: 300px;" v-if="newQuestionData.type == '2'">
            <el-text>请输入多选题目选项</el-text>
            <diV>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">A:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.A"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">B:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.B"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">C:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.C"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">D:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.D"></el-input></div>
            </diV>
            <div v-if="count == 4">
                <div style="display: flex; margin-top: 10px;">
                    <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
                    <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
                        <el-option v-for="item in questionData" :key="item.identifier" :label="item.identifier"
                            :value="item" />
                    </el-select>
                </div>
            </div>
        </div>

        <div style="width: 300px;" v-if="newQuestionData.type == '3'">
            <el-text>请输入不定项选择选项</el-text>
            <diV>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">A:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.A"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">B:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.B"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">C:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.C"></el-input></div>
                <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                        style="margin-right: 5px;">D:</span><el-input style="height: 27px;"
                        v-model="newSMultipleChoiceQuestion.D"></el-input></div>
            </diV>
            <div v-if="count == 4">
                <div style="display: flex; margin-top: 10px;">
                    <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
                    <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
                        <el-option @click="console.log(questionData)" v-for="item in questionData" :key="item.identifier"
                            :label="item.identifier" :value="item" />
                    </el-select>
                </div>
            </div>
        </div>

        <div style="width: 300px;" v-if="newQuestionData.type == '4'">
            <el-text>请输入判断题答案</el-text>
            <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
            <el-select placeholder="正确选项" v-model="newAnswer">
                <el-option v-for="item in trueFlase" :key="item" :label="item.label" :value="item.label" />
            </el-select>
        </div>

        <div style="width: 300px;" v-if="newQuestionData.type == '5'">
            <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
            <el-input placeholder="请输入答案" v-model="newAnswer">
            </el-input>
        </div>

        <div style="width: 300px;" v-if="newQuestionData.type == '6'">
            <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
            <el-input placeholder="请输入答案" v-model="newAnswer">
            </el-input>
        </div>

        <el-button type="primary" style="margin:15px" @click="create">
            创建
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
    width: 100px
}
</style>