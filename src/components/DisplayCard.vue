<script setup lang="ts">

type Props = {
  title: string
  amount: number
}
const props = defineProps<Props>()

</script>

<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ amount }}</div>
  </div>
</template>

<style scoped lang="scss"></style>
