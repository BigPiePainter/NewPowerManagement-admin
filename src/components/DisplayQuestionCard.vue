<script setup lang="ts">
import { ElDivider } from 'element-plus';

const convert = (time: number) => {
    let a: number | string = ~~(time / 3600);
    let b: number | string = ~~(time / 60) - a * 60;
    let c: number | string = time % 60;

    a = String(a).padStart(2, "0");
    b = String(b).padStart(2, "0");
    c = String(c).padStart(2, "0");

    if (a === '00') {
        return `${b}:${c}`;
    } else {
        return `${a}:${b}:${c}`;
    }
}

// const playbar = (time: number, time2: number) => {
//     let d = (time / time2)
// }

type Props = {
    title: string,
    time: number,
    time2: number,
    classfiction: string,
    picture: string,
    tag: string,
}
const props = defineProps<Props>();



</script>


<template>
    <div class="DisplayQuestionCard">
        <div class="picture">{{ picture }}</div>
        <div class="title">
            <div class="title-word"> {{ title }}</div>
        </div>
        <div class="midpart">
            <div class="tag">{{ tag }}</div>
            <div class="classfiction">{{ classfiction }}</div>
        </div>
        <div class="time">
            <div class="playbar1">
                <div class="playbar2" :style="{ right: ((1 - (time / time2)) * 100 + '%') }"></div>
            </div>
        </div>
        <div class="duration">{{ convert(time) + ' / ' + convert(time2) }}</div>
    </div>
</template>

<style scoped lang="scss">
$scale: 0.66;

.DisplayQuestionCard {
    display: flex;
    flex-direction: column;
    width: 350px*$scale ;
    height: 400px*$scale ;
    margin-left: 30px*$scale ;
    background-color: Gainsboro;
    border-radius: 10px*$scale ;
    margin-top: 20px*$scale ;
    z-index: 1;

}

.picture {
    display: flex;
    align-content: center;
    width: 330px*$scale ;
    height: 210px*$scale ;
    background-color: grey;
    margin-left: 10px*$scale ;
    margin-top: 10px*$scale ;
    z-index: 2;

}


.title {
    margin-top: 3px;
    display: flex;
    width: 330px*$scale;

    margin-left: 5px;
    font-size: 15px;
    z-index: 2;


}

.title-word {
    align-items: center;
    justify-self: center;
    justify-content: center;
    align-self: center;
    z-index: 2;
}

.midpart {
    margin-top: 3px;
    display: flex;
    flex-direction: row;
    height: 50px*$scale ;
    padding-left: 5px*$scale ;

}

.classfiction {
    display: flex;
    font-size: 25px*$scale ;
    justify-content: flex-end;
    align-items: center;
}

.tag {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 260px*$scale;
    font-size: 16px*$scale ;


}

.time {
    width: 350px*$scale;
    display: flex;
    flex-direction: row;

    justify-content: center;
}

.playbar1 {
    display: flex;
    flex-direction: row;
    margin-top: 1px;
    height: 4px;
    width: 90%;
    position: relative;
    background-color: darkgray;
    z-index: -1;


}

.playbar2 {
    position: absolute;
    height: 4px;
    left: 0;
    top: 0;
    background-color: rgb(255, 255, 255);
}

.duration {
    margin-top: 13px;
    margin-left: 8px;
    font-size: 12px;
}
</style>