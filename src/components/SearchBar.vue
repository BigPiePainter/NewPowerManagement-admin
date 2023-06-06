<script setup lang="ts">
import { ref, reactive } from 'vue';

type Props = {
  items: any
}
const props = defineProps<Props>()
const inputFromSub = ref()

</script>

<template>
  <div>
    <v-row>
      <v-col v-for="item in items" :key="item.name">
        <span>{{ item.name }}</span>
        <el-input v-model="inputFromSub" />
      </v-col>

      <v-col>
        <v-col>
          <el-button>搜索</el-button>
        </v-col>
        <v-col>
          <el-button>重置</el-button>
        </v-col>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss"></style>

<style>
.el-row {
  margin-top: 2vw;
}

.el-col {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>