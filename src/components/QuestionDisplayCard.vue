<script setup lang="ts">

const props = defineProps<Props>()
type Props = {
    questionName: string
    questionCount: number
    questionFinished: number
    difficultyLevel: number
}






</script>

<template>
    <div class="QuestionDisplayCard">

        <div class="title">{{ questionName }}
        </div>

        <div class="title1">{{ questionCount }}/{{ questionFinished }}
        </div>
        <div class="title2">{{ difficultyLevel }}


        </div>
    </div>
</template>

<style scoped lang="scss">
.QuestionDisplayCard {

    width: 260px;
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
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 14px;

}

.title2 {

    margin-left: 15px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    font-size: 14px;

}
</style>