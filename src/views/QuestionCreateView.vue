<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
// import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'

import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
// import SearchBar from '@/components/SearchBar.vue'
// import { getGoodQuestionPack, createGoodQuestionPack } from '@/apis/questionStore'
import RichTextEditor from '@/components/RichTextEditor.vue';

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


// const allQuestionType = [
//     {
//         id: '1',
//         value: '1',
//         label: '单选题 ',
//     },
//     {
//         id: '2',
//         value: '2',
//         label: '多选题 ',
//     },
//     {
//         id: '3',
//         value: '3',
//         label: '不定项选择题',
//     },
//     {
//         id: '4',
//         value: '4',
//         label: '判断题 ',
//     },
//     {
//         id: '5',
//         value: '5',
//         label: '填空题',
//     },
//     {
//         id: '6',
//         value: '6',
//         label: '解答题',
//     },
// ]


// const allDifficultyType = [
//     {
//         id: '1',
//         value: '1',
//         label: '容易  ',
//     },
//     {
//         id: '2',
//         value: '2',
//         label: '较易 ',
//     },
//     {
//         id: '3',
//         value: '3',
//         label: '一般',
//     },
//     {
//         id: '4',
//         value: '4',
//         label: '较难 ',
//     },
//     {
//         id: '5',
//         value: '5',
//         label: '困难',
//     }
// ]





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




const confirmCreate = () => {
    var args = {

        gradeId: newQuestionData.gradeId,
        difficultyType: newQuestionData.difficultyType,
        subjectId: newQuestionData.subjectId,
        type: newQuestionData.type

    }

    confirmCreate(args)
        .then((res) => {
            res.data.records.forEach(item => {
                tableData.push(item)
            });
            console.log(tableData)
            totalLength.value = res.data.records.length
        })
        .catch(() => { })
        .finally(() => {
            loading.value = false
        })
    tableData.forEach(item => {
        console.log(item)
    })

    centerDialogVisible.value = false
}

const centerDialogVisible = ref(false)
const create = () => {
    centerDialogVisible.value = true
}


//------------------下载文档格式功能-----------------------




const downloadFromatFile = () => {

}




//-------------------------------------------------------


loadData()




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


        <div class="margin">
            <el-text>难度:</el-text>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = ''">
                全部
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = '1'">
                容易
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = '2'">
                较易
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = '3'">
                一般
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = '4'">
                较难
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.difficultyType = '5'">
                困难
            </el-link>
        </div>

        <div class="margin">
            <el-text>题型:</el-text>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = ''">
                全部
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '1'">
                单选题
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '2'">
                多选题
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '3'">
                不定项选择题
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '4'">
                判断题
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '5'">
                填空题
            </el-link>
            <el-link class="margin-left" type="primary" @click="newQuestionData.type = '6'">
                解答题
            </el-link>
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