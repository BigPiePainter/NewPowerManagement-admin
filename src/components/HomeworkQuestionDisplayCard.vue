<script setup lang="ts">

const props = defineProps<Props>()
type Props = {
  homeworkName: string
  teacherName: string
  isFinished: number
  subjectName: string
}

</script>

<template>
  <div class="HomeworkQuestionDisplayCard">

    <div class="title">{{ homeworkName }}
    </div>
    <div class="title1">老师：{{ teacherName }}
    </div>
    <div class="title2">
      <div>
        {{ subjectName }}
      </div>
      <div style="flex-grow: 1;"></div>
      <div>
        {{ isFinished == 0 ? '未完成' : '已完成' }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.HomeworkQuestionDisplayCard {
  width: 270px;
  height: 130px;
  background-color: lightgrey;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 25px;
}

.title {
  margin-left: 15px;
  display: flex;
  height: 40px;
  font-size: 22px;
  padding-top: 15px;
}

.title1 {
  margin-left: 15px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 14px;
}

.title2 {
  margin-left: 15px;
  margin-right: 15px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  font-size: 14px;
}
</style>