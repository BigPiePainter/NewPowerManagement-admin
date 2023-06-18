<script setup lang="ts">
import { ElIcon } from 'element-plus';

type Props = {
    picture: string
    title: string
    time: string
    videoduration: string
}
const props = defineProps<Props>()


</script>

<template>
    <div class="displayvideocard">
        <div class="displayvideocard-picture">
            <div class="img">
                <el-icon><VideoPlay/></el-icon></div>
            <div>{{ picture }}</div>
            <div class="time">{{ videoduration }}</div>
        </div>
        <el-icon><VideoPlay/></el-icon>
        <div class="displayvideocard-title">
            <el-text>{{ title }}</el-text>
        </div>
        <div class="displayvideocard-time">
            <div>{{ time }}</div>
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
    background-color: #c8c7c7;
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
    flex-direction: column;
    flex-grow: 1;
    margin-left: 15px * $scale;
    font-size: 15px * $scale;
}


.displayvideocard-title {
    padding-top: 2px * $scale;
    font-size: 20px * $scale;
    align-content: center;
    margin-left: 15px * $scale;
    width: 250px * $scale;
    margin-bottom: 10px * $scale;
    height: 95px * $scale;
    margin-top: 14px * $scale;

}

.time {
    position: absolute;
    bottom: 6px * $scale;
    left: 6px * $scale;
}

.img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 9999;
}



.displayvideocard-picture {
    display: flex;
    flex-direction: column;
    font-size: 14px * $scale;
    height: 154px * $scale;
    width: 254px * $scale;
    background-color: #A5A5A5;
    align-self: center;
    position: relative;
}
</style>
  