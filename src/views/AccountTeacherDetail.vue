<script setup lang="ts">
import DisplayVideoCard from '../components/DisplayVideoCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'

const input = ref('')
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
  { name: '老师详情', path: '/teacher-detail-managament' },
]

const video = reactive([
  { title: '【第一讲】九年级物理超级提高课', time: '2023-12-14 12:00', picture: 'sssss', videoduration: '30:00' },
  { title: '无敌提高课', time: '2023-12-14 12:01', picture: 'sssss', videoduration: '30:01' },
  { title: '究极提高课', time: '2023-12-14 12:02', picture: 'sssss', videoduration: '30:02' },
  { title: '究极提高课', time: '2023-12-14 12:03', picture: 'sssss', videoduration: '30:03' },
  { title: '究极提高课', time: '2023-12-14 12:04', picture: 'sssss', videoduration: '30:04' },
  { title: '究极提高课', time: '2023-12-14 12:05', picture: 'sssss', videoduration: '30:05' },
  { title: '究极提高课', time: '2023-12-14 12:06', picture: 'sssss', videoduration: '30:06' },
  { title: '究极提高课', time: '2023-12-14 12:06', picture: 'sssss', videoduration: '30:06' },
  { title: '究极提高课', time: '2023-12-14 12:06', picture: 'sssss', videoduration: '30:06' },
  { title: '究极提高课', time: '2023-12-14 12:06', picture: 'sssss', videoduration: '30:06' },
  { title: '究极提高课', time: '2023-12-14 12:06', picture: 'sssss', videoduration: '30:06' },

])


</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div class="topPart1-1">
          <div class="top-Part1-1-1"><el-text>老师信息</el-text></div>
        </div>
        <div class="topPart1-2">
          <div class="top-Part1-2-1">Aaron</div>
          <div class="top-Part1-2-2">
            <div><el-text>年级:9年级</el-text></div>
            <div><el-text>学科:语文</el-text></div>
            <div><el-text>电话:15536996997</el-text></div>
          </div>
        </div>

        <div class="topPart1-3">
          <div><el-text>创建时间:2022-2-13 13:00</el-text></div>
          <div class="topPart1-3-2"><el-text>最后登录:2023-6-5 12:00</el-text></div>
        </div>
      </div>

      <el-divider direction="vertical" class="divider-height" />

      <div class="topPart1">
        <div class="topPart1-1"><el-text>所带班级：</el-text></div>
        <div class="topPart2-2"><el-text>三年级二班</el-text></div>
      </div>

      <el-divider direction="vertical" class="divider-height" />
      <div class="topPart1">
        <div class="topPart1-1"><el-text>所在教研组</el-text></div>
        <div class="topPart2-2"><el-text>庄老师教研组</el-text></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-text>月度统计</el-text></div>
        <div class="botPart1-1-2"> <el-input v-model="input" placeholder="2023-07" /></div>
        <div class="botPart1-1-3"><el-text>共23个微课</el-text></div>
      </div>
    </div>
    <div class="botPart1-2">
      <DisplayVideoCard v-for="item in video" :key="item.title" :title="item.title" :time="item.time"
        :picture="item.picture" :videoduration="item.videoduration">
      </DisplayVideoCard>
    </div>
  </div>
</template>

<style scoped lang="scss">

$scale: 0.88;
.whole {
  display: flex;
  flex-direction: column;
}

.topPart {
  display: flex;
  flex-direction: row;
  height: 220px * $scale;
}

.topPart1 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.topPart1-1 {
  display: flex;
  height: 40px * $scale;
  margin-top: 15px * $scale;
  margin-left: 15px;
}

.topPart2-2 {
  display: flex;
  margin-top: 10px * $scale;

  margin-left: 15px;
}

.top-Part1-2-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;

}

.row-divider {
  width: 100%;
  border-bottom: 7px #f0f2f5 solid;
  box-sizing: border-box;
  margin: 0;
}

.top-Part1-2-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-Part1-1-1 {
  display: flex;

}

.topPart1-2 {
  display: flex;
  flex-direction: row;
  height: 80px * $scale;
}

.topPart1-3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px;

}


.topPart1-3-2 {
  margin-top: 20px * $scale;

}

.botPart1-1 {
  display: flex;
  flex-direction: row;
  height: 50px * $scale;
  align-content: center;
}

.botPart1-1-1 {
  display: flex;
  flex-direction: row;
  width: 80px * $scale;
  align-items: center;
  justify-content: center;
  padding-left: 5px * $scale;

}

.botPart1-1-2 {
  display: flex;
  flex-direction: row;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;

}

.botPart1-1-3 {
  display: flex;
  flex-direction: row;
  margin-left: 120px * $scale;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;
}


.botPart1-2 {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: wrap;
  margin-top: -10px * $scale;
}

.divider-height {
  height: 88%;
  align-self: center;
  border-left: 3px #f0f2f5 solid;
  box-sizing: border-box;
}
</style>