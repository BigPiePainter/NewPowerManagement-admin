<script setup lang="ts">

type Props = {
  title: string
  amount: number
}
const props = defineProps<Props>()

</script>

<template>
  <div class="displaycard">
    <div class="displaycard-title">{{ title }}</div>
    <div class="displaycard-amount">{{ amount }}</div>
</div>
</template>

<style scoped lang="scss">
.displaycard {
  flex-direction: column;
  display: flex;
  height: 65px;
  width: 220px;
  background-color: #acabab38;
  padding-left: 17px;
  margin-top: 18px;
  margin-left: 32px;
  padding-top: 20px;



  >.displaycard-title {
    margin-top: -5px;
    font-size: 14px;
    margin-bottom: 10px;


  }

  >.displaycard-amount {
    font-size: 21px;

  }
}
</style>
