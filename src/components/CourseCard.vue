
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { cancelOrder } from '@/apis/order'
import { ElNotification } from 'element-plus'
import { getStudentCourse } from '@/apis/studentCourse';
import { getMiniLesson } from '@/apis/minilessons';
import { getStudentQuestions } from '@/apis/studentQuestion';

const minilessonDialogShow = ref(false)
const questionDialogShow = ref(false)
const allMinilessons = reactive<any>({ total: 0, watched: 0, finished: 0, detail: [{ miniLessonId: "", title: "", duration: 0, watchedTime: 0, percent: 0 }] })
const watchedMinilessons = reactive<any>([])
const minilessonLoading = ref(false)
const questionLoading = ref(false)
const allGoodQuestions = reactive<any>({ total: 0, done: 0, correct: 0, detail: [{ questionStoreId: "", type: 0, outcomeType: 0, answer: {}, keyAnswer: {}, answerTime: 0, no: 0 }] })
type Props = {
  picture?: string
  title?: string
  difficultyLevel?: number
  valid?: number
  subject?: string
  grade?: string
  label?: string
  orderId?: string
  studentId?: string
  type?: number
  packageId?: string
}
const props = defineProps<Props>()
const reload = defineEmits(['reload'])
const clickQuitCourse = () => {
  console.log('order_id', props.orderId, 'student_id', props.studentId, 'type', props.type)
  cancelOrder({ id: props.orderId })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '退课成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '退课失败',
          message: res.msg,
          type: 'error'
        })
      }
      reload('reload')
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    })
}
const minilessonDataAnalyze = () => {
  for (let i = 0; i < watchedMinilessons.length; i++) {
    for (let j = 0; j < allMinilessons.detail.length; j++) {
      if (allMinilessons.detail[j].miniLessonId == watchedMinilessons[i].miniLesson && watchedMinilessons[i].isFinished == 1) {
        allMinilessons.watched += 1;
        allMinilessons.finished += 1;
        allMinilessons.detail[j].watchedTime = allMinilessons.detail[j].duration;
        allMinilessons.detail[j].percent = 100;
      } else if (allMinilessons.detail[j].miniLessonId == watchedMinilessons[i].miniLesson && watchedMinilessons[i].isFinished == 0) {
        allMinilessons.watched += 1;
        allMinilessons.detail[j].watchedTime = watchedMinilessons[i].watchedTime;
        allMinilessons.detail[j].percent = Math.ceil(watchedMinilessons[i].watchedTime / allMinilessons.detail[j].duration * 100);
      }
    }
  }
  minilessonLoading.value = false;
  console.log("allMinilessons", allMinilessons);
  console.log("watchedMinilessons", watchedMinilessons);
}

const questionDataAnalyze = () => {
  allGoodQuestions.done = 0;
  allGoodQuestions.correct = 0;
  allGoodQuestions.total = 0;
  allGoodQuestions.detail.length = 0;
  getStudentQuestions({ studentId: props.studentId })
    .then((res: any) => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].questionPackageId == props.packageId) {
          allGoodQuestions.total += 1;
          allGoodQuestions.detail.push({ questionStoreId: res.data[i].questionId, type: res.data[i].questionType, outcomeType: res.data[i].outcomeType, answer: JSON.parse(res.data[i].answer), keyAnswer: JSON.parse(res.data[i].keyAnswer), answerTime: res.data[i].answerTime, no: i + 1 })
          if (res.data[i].outcomeType == 1) {
            allGoodQuestions.correct += 1;
            allGoodQuestions.done += 1;
          } else if (res.data[i].outcomeType == 2 || res.data[i].outcomeType == 3) {
            allGoodQuestions.done += 1;
          }
        }
      }
      questionLoading.value = false;
      console.log("allGoodQuestions", allGoodQuestions)
    })
    .catch();
}

const clickCard = () => {
  minilessonLoading.value = true;
  if (props.type == 1) {
    getStudentCourse({ studentId: props.studentId })
      .then((res: any) => {
        watchedMinilessons.length = 0;
        res.data.forEach((item: any) => {
          watchedMinilessons.push(item);
        });
        return getMiniLesson({ pageNum: 1, pageSize: 1, courseId: props.packageId })
      })
      .then((res: any) => {
        return getMiniLesson({ pageNum: 1, pageSize: res.data.total, courseId: props.packageId })
      })
      .then((res: any) => {
        allMinilessons.detail.length = 0;
        allMinilessons.total = res.data.total;
        allMinilessons.watched = 0;
        allMinilessons.finished = 0;
        res.data.records.forEach((item: any) => {
          allMinilessons.detail.push({ miniLessonId: item.miniLessonId, title: item.miniLessonName, duration: item.miniLessonVideoDuration, watchedTime: 0, percent: 0 });
        });
        return minilessonDataAnalyze();
      })
      .catch();
    minilessonDialogShow.value = true;
  } else if (props.type == 2) {
    questionLoading.value = true;
    questionDataAnalyze();
    questionDialogShow.value = true;
  }
}
</script>

<template>
  <div class="displayvideocard">
    <div class="displayvideocard-picture" @click="clickCard()">
      <img class="show-img" :src="picture" />
    </div>
    <div class="displayvideocard-title" @click="clickCard()">
      <div>{{ title }}</div>
      <el-tag v-if="label != null" style="margin-left: 5px;">{{ label }}</el-tag>
    </div>
    <div class="displayvideocard-category" @click="clickCard()">
      <div>{{ grade }}{{ subject }}</div>
    </div>
    <div class="displayvideocard-time">
      <div @click="clickCard()">难度：</div>
      <div @click="clickCard()">
        {{ difficultyLevel == 1 ? '⭐'
          : difficultyLevel == 2 ? '⭐⭐'
            : difficultyLevel == 3 ? '⭐⭐⭐'
              : difficultyLevel == 4 ? '⭐⭐⭐⭐'
                : difficultyLevel == 5 ? '⭐⭐⭐⭐⭐'
                  : '无' }}
      </div>
      <div style="flex-grow: 1;" @click="clickCard()"></div>

      <div>
        <el-popconfirm title="操作不可撤销" @confirm="clickQuitCourse">
          <template #reference>
            <el-button type="danger" link style="margin-right: 10px;margin-bottom: 2px;">退课</el-button>
          </template>
        </el-popconfirm>
        {{ valid == 1 ? '有效' : '无效' }}
      </div>
    </div>
  </div>

  <el-dialog style="width: 550px;" :title="props.title" :show-close="false" v-model="minilessonDialogShow">
    <el-scrollbar>
      <div v-loading="minilessonLoading" class="minilesson-bar-dialog">
        <div class="minilesson-bar" v-for="item in allMinilessons.detail" :key="item.miniLessonId">
          <div class="minilesson-title">
            <span>{{ item.title }}</span>
          </div>
          <div class="minilesson-progress">
            <el-progress :percentage="item.percent"></el-progress>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <span>
        共有{{ allMinilessons.total }}个微课，已看{{ allMinilessons.watched }}个，看完{{ allMinilessons.finished }}个
      </span>
    </template>
  </el-dialog>

  <el-dialog style="width: 530px;" :title="props.title" :show-close="false" v-model="questionDialogShow">
    <el-scrollbar>
      <div v-loading="questionLoading" class="question-bar-dialog">
        <div class="v-for-box" v-for="item in  allGoodQuestions.detail" :key="item.questionStoreId">

          <!-- ------------------------------------------------选择题-------------------------------------------------------- -->

          <div class="choice-question-bar" v-if="item.type == 1 || item.type == 2 || item.type == 3">
            <div class="question-number">
              <el-text size="large" tag="b" class="number-span">{{ item.no }}</el-text>
            </div>
            <div style="margin-right: 3px;margin-left: 3px;">{{ item.type == 1 ? "单选题" : item.type == 2 ? "多选题" :
              "不定项选择题" }}{{ " 用时" + item.answerTime + "秒" }}</div>
            <div class="fill"></div>

            <div class="choice-wrong-answer" v-if="item.outcomeType == 2">
              <div style="margin-right: 3px;margin-left: 3px;">答错:</div>
              <div class="choice-question-result" v-for="answer in item.answer.answers" :key="answer">
                <el-text size="large" tag="b" class="choice-key-span">{{ answer }}</el-text>
              </div>
            </div>

            <div style="margin-right: 3px;margin-left: 6px;" v-if="item.type == 1 || item.type == 2">{{ item.outcomeType
              == 1 ? "答对:" : "正解:" }}
            </div>
            <div class="choice-question-key" v-for="keyAnswer in item.keyAnswer.answers" :key="keyAnswer">
              <el-text size="large" tag="b" class="choice-key-span">{{ keyAnswer }}</el-text>
            </div>
          </div>

          <!-- ------------------------------------------------判断题-------------------------------------------------------- -->

          <div class="judge-question-bar" v-if="item.type == 4">
            <div class="question-number">
              <el-text size="large" tag="b" class="number-span">{{ item.no }}</el-text>
            </div>
            <div style="margin-right: 3px;margin-left: 3px;">判断题{{ " 用时" + item.answerTime + "秒" }}</div>
            <div class="fill"></div>

            <div class="judge-wrong-answer" v-if="item.outcomeType == 2">
              <div style="margin-right: 3px;margin-left: 3px;">答错:</div>
              <div class="judge-question-result">
                <el-text size="large" tag="b" class="judge-key-span">{{ item.answer.answers[0] }}</el-text>
              </div>
            </div>

            <div style="margin-right: 3px;margin-left: 6px;" v-if="item.type == 1 || item.type == 2">{{ item.outcomeType
              == 1 ? "答对:" : "正解:" }}
            </div>
            <div class="judge-question-key">
              <el-text size="large" tag="b" class="judge-key-span">{{ item.keyAnswer.correct }}</el-text>
            </div>
          </div>

          <!-- ------------------------------------------------填空题-------------------------------------------------------- -->

          <div class="fill-question-bar" v-if="item.type == 5">
            <div class="question-number">
              <el-text size="large" tag="b" class="number-span">{{ item.no }}</el-text>
            </div>
            <div style="margin-right: 3px;margin-left: 3px;">填空题{{ " 用时" + item.answerTime + "秒" }}</div>
            <div class="fill"></div>

            <div class="fill-right" v-if="item.outcomeType == 1">
              <el-text class="key-span-green">答对</el-text>
            </div>

            <div class="fill-wrong" v-if="item.outcomeType == 2">
              <el-text class="key-span-red">答错</el-text>
            </div>

            <div class="fill-empty" v-if="item.outcomeType == 4">
              <el-text class="key-span-gray">未答</el-text>
            </div>

          </div>

          <!-- ------------------------------------------------解答题-------------------------------------------------------- -->

          <div class="solving-question-bar" v-if="item.type == 6">
            <div class="question-number">
              <el-text size="large" tag="b" class="number-span">{{ item.no }}</el-text>
            </div>
            <div style="margin-right: 3px;margin-left: 3px;">解答题{{ " 用时" + item.answerTime + "秒" }}</div>
            <div class="fill"></div>

            <div class="solving-done" v-if="item.outcomeType == 2">
              <el-text class="key-span-green">已答</el-text>
            </div>

            <div class="solving-empty" v-if="item.outcomeType == 4">
              <el-text class="key-span-gray">未答</el-text>
            </div>

          </div>

        </div>
      </div>
    </el-scrollbar>
    <template #footer>
      <span>
        共有题目{{ allGoodQuestions.total }}，已做{{ allGoodQuestions.done }}，正确{{ allGoodQuestions.correct }}
      </span>
    </template>
  </el-dialog>
</template>
  
<style scoped lang="scss">
$scale: 0.88;

.question-bar-dialog {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  >.v-for-box {
    height: 30px;
    width: 100%;
    margin-bottom: 20px;

    // -------------------------判断题---------------------------------
    >.judge-question-bar {
      display: flex;
      flex-direction: row;
      align-items: center;

      >.question-number {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.number-span {
          line-height: 30px;
        }
      }

      >.fill {
        flex-grow: 1;
      }

      >.judge-wrong-answer {
        display: flex;
        flex-direction: row;
        align-items: center;

        >.judge-question-result {
          width: 30px;
          height: 30px;
          margin: 2px;
          background-color: #f81d15bb;
          border-radius: 20px;
          text-align: center;

          >.judge-key-span {
            line-height: 30px;
          }
        }
      }


      >.judge-question-key {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #00c12ac4;
        border-radius: 20px;
        text-align: center;

        >.judge-key-span {
          line-height: 30px;
        }
      }
    }

    // -------------------------选择题---------------------------------
    >.choice-question-bar {
      display: flex;
      flex-direction: row;
      align-items: center;

      >.question-number {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.number-span {
          line-height: 30px;
        }
      }

      >.fill {
        flex-grow: 1;
      }

      >.choice-wrong-answer {
        display: flex;
        flex-direction: row;
        align-items: center;

        >.choice-question-result {
          width: 30px;
          height: 30px;
          margin: 2px;
          background-color: #f81d15bb;
          border-radius: 20px;
          text-align: center;

          >.choice-key-span {
            line-height: 30px;
          }
        }
      }

      >.choice-question-key {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #00c12ac4;
        border-radius: 20px;
        text-align: center;

        >.choice-key-span {
          line-height: 30px;
        }
      }
    }

    // -------------------------填空题---------------------------------
    >.fill-question-bar {
      display: flex;
      flex-direction: row;
      align-items: center;

      >.question-number {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.number-span {
          line-height: 30px;
        }
      }

      >.fill {
        flex-grow: 1;
      }

      >.fill-right{
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #00c12ac4;
        border-radius: 20px;
        text-align: center;

        >.key-span-green{
          line-height: 30px;
        }
      }

      >.fill-wrong{
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #f81d15bb;
        border-radius: 20px;
        text-align: center;

        >.key-span-red{
          line-height: 30px;
        }
      }

      >.fill-empty{
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.key-span-gray{
          line-height: 30px;
        }
      }
    }

    //----------------------------------------------------------------
    >.solving-question-bar {
      display: flex;
      flex-direction: row;
      align-items: center;

      >.question-number {
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.number-span {
          line-height: 30px;
        }
      }

      >.fill {
        flex-grow: 1;
      }

      >.solving-done{
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #00c12ac4;
        border-radius: 20px;
        text-align: center;

        >.key-span-red{
          line-height: 30px;
        }
      }

      >.solving-empty{
        width: 30px;
        height: 30px;
        margin: 2px;
        background-color: #bec4d860;
        border-radius: 20px;
        text-align: center;

        >.key-span-gray{
          line-height: 30px;
        }
      }
    }
  }

}

.minilesson-bar-dialog {
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.minilesson-bar {
  width: 90%;
  height: 50px;
  margin-bottom: 20px;
  background-color: #e1e2e4;
  border-radius: 15px;
}

.minilesson-title {
  margin-left: 5%;
  margin-top: 2%;
}

.minilesson-progress {
  margin-bottom: 10px;
  margin-left: 5%;
}

.displayvideocard {
  display: flex;
  flex-direction: column;
  height: 297px * $scale;
  width: 280px * $scale;
  padding-top: 13px * $scale;
  margin-left: 15px * $scale;
  margin-top: 20px * $scale;
  border-radius: 10px * $scale;
  background-color: #e1e2e4ea;
  //box-shadow: 3px 3px 5px 1px #e1e2e4;
  transition: all 0.2s ease;
  border: 1px rgba(0, 0, 0, 0.11) solid;

  &:hover {
    box-shadow: 5px * $scale 3px * $scale 5px * $scale 2px * $scale #e1e2e4;
    // border: 3px $primary-color solid;
  }
}

.displayvideocard-time {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  margin-left: 15px * $scale;
  margin-right: 15px * $scale;
  font-size: 15px * $scale;
  margin-bottom: 5px;
}

.displayvideocard-title {
  display: flex;
  flex-direction: row;
  padding-top: 2px * $scale;
  font-size: 20px * $scale;
  align-content: center;
  margin-left: 15px * $scale;
  width: 250px * $scale;
  margin-bottom: 10px * $scale;
  height: 45px * $scale;
  margin-top: 14px * $scale;
}

.displayvideocard-category {
  font-size: 15px * $scale;
  align-content: center;
  margin-left: 15px * $scale;
  width: 250px * $scale;
  margin-bottom: 10px * $scale;
  height: 35px * $scale;
}

.show-img {
  flex-grow: 1;
  height: 100px;
  border-radius: 10px * $scale;
}

.displayvideocard-picture {
  display: flex;
  flex-direction: column;
  font-size: 14px * $scale;
  height: 154px * $scale;
  width: 254px * $scale;
  background-color: #c8c7c7;
  align-self: center;
  position: relative;
  border-radius: 10px * $scale;
}
</style>