<script setup lang="ts">

type Props = {
    picture?: string
    title?: string
    difficultyLevel?: number
    valid?: number
    subject?: string
    grade?: string
    label?: string
}
const props = defineProps<Props>()
</script>

<template>
    <div class="displayvideocard">
        <div class="displayvideocard-picture">
            <img class="show-img" :src="picture" />
        </div>
        <div class="displayvideocard-title">
            <div>{{ title }}</div>
            <el-tag v-if="label != null" style="margin-left: 5px;">{{ label }}</el-tag>
        </div>
        <div class="displayvideocard-category">
            <div>{{ grade }}{{ subject }}</div>
        </div>
        <div class="displayvideocard-time">
            <div>难度：</div>
            <div>
                {{ difficultyLevel == 1 ? '⭐'
                    : difficultyLevel == 2 ? '⭐⭐'
                        : difficultyLevel == 3 ? '⭐⭐⭐'
                            : difficultyLevel == 4 ? '⭐⭐⭐⭐'
                                : difficultyLevel == 5 ? '⭐⭐⭐⭐⭐'
                                    : '无' }}
            </div>
            <div style="flex-grow: 1;"></div>
            <div>{{ valid == 1 ? '有效' : '无效' }}</div>
        </div>
    </div>
</template>
  
<style scoped lang="scss">
$scale: 0.88;

.displayvideocard {
    display: flex;
    flex-direction: column;
    height: 297px * $scale;
    width: 280px * $scale;
    padding-top: 13px * $scale;
    margin-left: 15px * $scale;
    margin-top: 20px * $scale;
    //border-radius: 5px * $scale;
    background-color: #e1e2e4;
    //box-shadow: 3px 3px 5px 1px #e1e2e4;
    transition: all 0.2s ease;
    border: 3px #00000000 solid;

    &:hover {
        //box-shadow: 3px * $scale 3px * $scale 5px * $scale 2px * $scale #e1e2e4;
        border: 3px $primary-color solid;
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
}
</style>
  