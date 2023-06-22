<script setup lang="ts">

type Props = {
  title: string
  title2: string
  title3: string
}
const props = defineProps<Props>()





</script>

<template>
<div class="HomeworkQuestionDisplayCard">

<div class="title">{{ title }}
</div>

<div class="title1">{{ title2 }}

  
</div>
<div class="title2">{{ title3 }}

  
</div>
</div>

</template>

<style scoped lang="scss">

.HomeworkQuestionDisplayCard{

width: 260px;
height: 130px;
background-color: lightgrey;
border-radius: 15px;
display: flex;
flex-direction: column;
margin-left: 25px;
margin-top: 25px;
}


.title{

  margin-left: 15px;
display: flex;
height: 40px;
font-size: 22px;
padding-top: 15px;

}

.title1{

  margin-left: 15px;
display: flex;
flex-direction: column;
flex-grow: 1;
font-size: 14px;

}

.title2{

  margin-left: 15px;
display: flex;
flex-direction: column;
flex-grow: 1;
font-size: 14px;

}

</style>