<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { editGoodQuestion } from '@/apis/questionStore'
import { useRoute } from 'vue-router'
const route = useRoute()

const centerDialogVisible = ref(false)

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '题库管理', path: '' },
  { name: '好题详情', path: '/question-detail' }
]

const editQuestionData = reactive<any>({})
const loadEditQuestion = () => {
  editQuestionData.id = route.query.id;
  editQuestionData.questionPrompt = route.query.questionPrompt;
  editQuestionData.options = JSON.parse(route.query.options as string);
  editQuestionData.answer = JSON.parse(route.query.answer as string);
  editQuestionData.type = route.query.type;
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
  var args: any = {
    id: editQuestionData.id,
    questionPrompt: editQuestionData.questionPrompt,
    options: JSON.stringify(editQuestionData.options),
    answer: JSON.stringify(editQuestionData.answer)
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
</script>

<template>
  <div class="margin">

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
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ item.identifier
          }}</span><el-input style="height: 27px;" v-model=item.description></el-input>
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
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ item.identifier
          }}</span><el-input style="height: 27px;" v-model=item.description></el-input>
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
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ item.identifier
          }}</span><el-input style="height: 27px;" v-model=item.description></el-input>
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
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <el-input placeholder="请输入答案" v-model="editQuestionData.answer.answers">
      </el-input>
    </div>

    <div style="width: 300px;" v-if="editQuestionData.type == '6'">
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <el-input placeholder="请输入答案" v-model="editQuestionData.answer.answers">
      </el-input>
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