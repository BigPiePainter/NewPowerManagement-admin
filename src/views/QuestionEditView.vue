<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue'
import OptionText from '@/components/OptionText.vue'
import { editGoodQuestion } from '@/apis/questionStore'
import { useRoute } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
const route = useRoute()

const centerDialogVisible = ref(false)

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '题库管理', path: '' },
  { name: '好题详情', path: '/question-detail' }
]
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
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const fillBlankQuestionAnswer = reactive<any>({ a: '' })
const list = reactive<any>(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'])
const editQuestionData = reactive<any>({})

const loadEditQuestion = () => {
  getSubjects()
    .then((res) => {
      allSubjects.value = res.data
      return getGrades()
    })
    .then((res) => {
      allGrades.value = res.data.map((i: any) => i.subset).flat()
    }
    )
    .catch()
  editQuestionData.id = route.query.id;
  editQuestionData.questionPrompt = route.query.questionPrompt;
  editQuestionData.options = JSON.parse(route.query.options as string);
  editQuestionData.answer = JSON.parse(route.query.answer as string);
  editQuestionData.type = route.query.type;
  editQuestionData.gradeId = route.query.gradeId;
  editQuestionData.subjectId = route.query.subjectId;
  editQuestionData.difficultyType = route.query.difficultyType;
  if (editQuestionData.type == 5) {
    for (let i = 0; i < editQuestionData.answer.answers.length; i++) {
      fillBlankQuestionAnswer[list[i]] = editQuestionData.answer.answers[i]
    }
  }
  console.log("query data", editQuestionData, route.query)
}
loadEditQuestion()

const trueFlase = [
  {
    id: 1, label: '正确', value: true
  },
  {
    id: 2, label: '错误', value: false
  }
]

const confirmEdit = () => {
  if (editQuestionData.type == 5) {
    editQuestionData.answer.answers.length = 0
    Object.keys(fillBlankQuestionAnswer).forEach((item: any) => {
      editQuestionData.answer.answers.push(fillBlankQuestionAnswer[item])
    })
  }
  var args: any = {
    id: editQuestionData.id,
    questionPrompt: editQuestionData.questionPrompt,
    options: JSON.stringify(editQuestionData.options),
    answer: JSON.stringify(editQuestionData.answer),
    difficultyType: editQuestionData.difficultyType
  }
  editGoodQuestion(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '题目编辑成功',
          type: 'success'
        })
        centerDialogVisible.value = false
      } else {
        ElNotification({
          title: '题目编辑失败',
          type: 'error'
        })
        centerDialogVisible.value = false
      }
    }).catch()
}

const edit = () => {
  centerDialogVisible.value = true
}

const changeQuestionPrompt = (valueHtml: any) => {
  console.log('valueHtml', valueHtml)
  editQuestionData.questionPrompt = valueHtml
}

const changeOptionPrompt = (valueHtml: any, option: any) => {
  console.log('valueHtml', valueHtml)
  console.log('option', option)
  editQuestionData.options.forEach((item: any) => {
    if (item.identifier == option) {
      item.description = valueHtml
    }
  })
  console.log('test', editQuestionData.options)
  // editQuestionData.options[option] = valueHtml
}

const changeBlankFillingPrompt = (valueHtml: any, option: any) => {
  console.log('valueHtml', valueHtml)
  console.log('option', option)
  fillBlankQuestionAnswer[option] = valueHtml
}

const changeBigQuestionAnswerPrompt = (valueHtml: any, option: any) => {
  console.log('valueHtml', valueHtml)
  editQuestionData.answer.answers = valueHtml
}

const addBlank = () => {
  if (Object.keys(fillBlankQuestionAnswer).length == 1) {
    Object.assign(fillBlankQuestionAnswer, { b: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 2) {
    Object.assign(fillBlankQuestionAnswer, { c: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 3) {
    Object.assign(fillBlankQuestionAnswer, { d: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 4) {
    Object.assign(fillBlankQuestionAnswer, { e: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 5) {
    Object.assign(fillBlankQuestionAnswer, { f: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 6) {
    Object.assign(fillBlankQuestionAnswer, { g: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 7) {
    Object.assign(fillBlankQuestionAnswer, { h: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 8) {
    Object.assign(fillBlankQuestionAnswer, { i: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 9) {
    Object.assign(fillBlankQuestionAnswer, { j: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 10) {
    Object.assign(fillBlankQuestionAnswer, { k: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 11) {
    Object.assign(fillBlankQuestionAnswer, { l: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 12) {
    Object.assign(fillBlankQuestionAnswer, { m: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 13) {
    Object.assign(fillBlankQuestionAnswer, { n: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 14) {
    Object.assign(fillBlankQuestionAnswer, { o: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 15) {
    Object.assign(fillBlankQuestionAnswer, { p: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 16) {
    Object.assign(fillBlankQuestionAnswer, { q: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 17) {
    Object.assign(fillBlankQuestionAnswer, { r: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 18) {
    Object.assign(fillBlankQuestionAnswer, { s: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 19) {
    Object.assign(fillBlankQuestionAnswer, { t: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
}

const minBlank = () => {
  if (Object.keys(fillBlankQuestionAnswer).length == 20) {
    delete fillBlankQuestionAnswer.t
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 19) {
    delete fillBlankQuestionAnswer.s
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 18) {
    delete fillBlankQuestionAnswer.r
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 17) {
    delete fillBlankQuestionAnswer.q
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 16) {
    delete fillBlankQuestionAnswer.p
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 15) {
    delete fillBlankQuestionAnswer.o
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 14) {
    delete fillBlankQuestionAnswer.n
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 13) {
    delete fillBlankQuestionAnswer.m
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 12) {
    delete fillBlankQuestionAnswer.l
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 11) {
    delete fillBlankQuestionAnswer.k
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 10) {
    delete fillBlankQuestionAnswer.j
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 9) {
    delete fillBlankQuestionAnswer.i
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 8) {
    delete fillBlankQuestionAnswer.h
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 7) {
    delete fillBlankQuestionAnswer.g
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 6) {
    delete fillBlankQuestionAnswer.f
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 5) {
    delete fillBlankQuestionAnswer.e
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 4) {
    delete fillBlankQuestionAnswer.d
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 3) {
    delete fillBlankQuestionAnswer.c
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 2) {
    delete fillBlankQuestionAnswer.b
    console.log(fillBlankQuestionAnswer)
    return
  }
}

</script>

<template>
  <div class="margin">
    <div class="subandgrade">
      <div>
        <el-text style="margin-left: 15px;">科目:</el-text>
        <el-select disabled style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
          v-model="editQuestionData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="margin-left">
        <el-text style="margin-left: 5px;">学习阶段:</el-text>
        <el-select disabled style="margin-left:5px" class="select-width" filterable place holder="请选择学习阶段"
          v-model="editQuestionData.gradeId">
          <el-option if v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="subandgrade" style="margin-top: 10px;">
      <div>
        <el-text style="margin-left: 15px;">难度:</el-text>
        <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
          v-model="editQuestionData.difficultyType">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="subandgrade">
      <div style="margin-left: 15px; margin-top: 10px;">
        <el-text>题型:</el-text>
        <el-select disabled style="margin-left:5px" filterable place holder="请选择题型" v-model="editQuestionData.type">
          <el-option if v-for="item in allQuestionType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
    </div>
    <el-divider content-position="left">编辑题干</el-divider>

    <div style="padding-top: 0px;">
      <RichTextEditor :key="1" :questionPrompt="editQuestionData.questionPrompt" :isShow="true"
        @change="changeQuestionPrompt" v-model="editQuestionData.questionPrompt">
      </RichTextEditor>
    </div>
    <el-divider content-position="left" v-if="editQuestionData.type == '1'
      || editQuestionData.type == '2'
      || editQuestionData.type == '3'
      || editQuestionData.type == '4'
      || editQuestionData.type == '5'
      || editQuestionData.type == '6'">
      编辑答案
    </el-divider>

    <div style="width: 300px;" v-if="editQuestionData.type == '1'">
      <el-text>单选题选项</el-text>
      <diV>
        <div v-for="item in editQuestionData.options" :key="item.value"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;">
          <span style="margin-right: 5px;">
            {{ item.identifier }}
          </span>
          <OptionText :set-height="50" :set-width="250" :key="2" :questionPrompt="item.description" :option="item.identifier" :isShow="true"
            @change="changeOptionPrompt" v-model="item.description">
          </OptionText>
        </div>
      </diV>
      <div style="display: flex; margin-top: 10px;">
        <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
        <el-select style="height: 27px;width: 246px;" placeholder="正确选项" v-model="editQuestionData.answer.answers">
          <el-option v-for="item in editQuestionData.options" :key="item.identifier" :label="item.identifier"
            :value="item.identifier" />
        </el-select>
      </div>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '2'">
      <el-text>多选题选项</el-text>
      <diV>
        <div v-for="item in editQuestionData.options" :key="item.value"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;">
          <span style="margin-right: 5px;">
            {{ item.identifier }}
          </span>
          <OptionText :set-height="50" :set-width="250" :key="2" :questionPrompt="item.description" :option="item.identifier" :isShow="true"
            @change="changeOptionPrompt" v-model="item.description">
          </OptionText>
        </div>
      </diV>
      <div style="display: flex; margin-top: 10px;">
        <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
        <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项"
          v-model="editQuestionData.answer.answers">
          <el-option v-for="item in editQuestionData.options" :key="item.identifier" :label="item.identifier"
            :value="item.identifier" />
        </el-select>
      </div>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '3'">
      <el-text>不定项选择题选项</el-text>
      <diV>
        <div v-for="item in editQuestionData.options" :key="item.value"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;">
          <span style="margin-right: 5px;">
            {{ item.identifier }}
          </span>
          <OptionText :set-height="50" :set-width="250" :key="2" :questionPrompt="item.description" :option="item.identifier" :isShow="true"
            @change="changeOptionPrompt" v-model="item.description">
          </OptionText>
        </div>
      </diV>
      <div style="display: flex; margin-top: 10px;">
        <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
        <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项"
          v-model="editQuestionData.answer.answers">
          <el-option v-for="item in editQuestionData.options" :key="item.identifier" :label="item.identifier"
            :value="item.identifier" />
        </el-select>
      </div>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '4'">
      <el-text>判断题答案</el-text>
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <el-select placeholder="正确选项" v-model="editQuestionData.answer.correct">
        <el-option v-for="item in trueFlase" :key="item" :label="item.label" :value="item.value" />
      </el-select>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '5'">
      <diV>
        <div style="margin-bottom:10px">答案：</div>
        <div style="margin-top: 10px" v-for="(val, option) in fillBlankQuestionAnswer" :key="option">
          <OptionText :set-height="50" :set-width="250" :key="2" :questionPrompt="fillBlankQuestionAnswer[option]" :option="(option as unknown as string)"
            :isShow="true" @change="changeBlankFillingPrompt" v-model="fillBlankQuestionAnswer[option]">
          </OptionText>
        </div>
        <div style="display: flex;margin-top: 10px;margin-bottom: 25px;margin-left: 15px;">
          <el-button @click="addBlank">增加</el-button>
          <el-button @click="minBlank">减少</el-button>
        </div>
      </diV>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '6'">
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <!-- <el-input placeholder="请输入答案" v-model="editQuestionData.answer.answers"></el-input> -->
      <OptionText :set-height="50" :set-width="250" :key="2" :questionPrompt="editQuestionData.answer.answers" :isShow="true"
        @change="changeBigQuestionAnswerPrompt" v-model="editQuestionData.answer.answers">
      </OptionText>
      
    </div>


    <el-button type="primary" style="margin:20px" @click="edit">
      编辑
    </el-button>
  </div>

  <el-dialog v-model="centerDialogVisible" title="待确认" width="30%" align-center>
    <span>是否确认编辑</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmEdit">
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