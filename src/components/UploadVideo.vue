<template>
    <div>
        <input type="file" placeholder="只允许mp4" accept="video/mp4" @change="handleFileChange" />
    </div>
</template>

<script setup lang="tsx">
import axios from 'axios';
import { ref } from 'vue';
import { getPolicy } from '@/apis/oss';
import { getCurrentInstance } from "vue";
import { ElNotification } from 'element-plus';
import { ElLoading } from 'element-plus'
const policyInfo = getCurrentInstance()?.appContext.config.globalProperties.$policy

const fileName = ref('')
const url = ref('')

// const getNowDate = () => {
//     var myDate = new Date;
//     var year = myDate.getFullYear(); //获取当前年
//     var mon = myDate.getMonth() + 1; //获取当前月
//     var date = myDate.getDate(); //获取当前日
//     var hours = myDate.getHours(); //获取当前小时
//     var minutes = myDate.getMinutes(); //获取当前分钟
//     var seconds = myDate.getSeconds(); //获取当前秒
//     var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
//     return now;
// }

// const policyRequest = () => {
//     getPolicy().then((res) => {
//         policyInfo.host = res.data.host
//         policyInfo.accessId = res.data.accessId
//         policyInfo.signature = res.data.signature
//         policyInfo.dir = res.data.dir + '/'
//         policyInfo.policy = res.data.policy
//         policyInfo.expire = res.data.expire
//         console.log(policyInfo)
//     })
// }

const nameRandomize = () => {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var randomName = '';
    for (let i = 0; i < 10; i++) {
        randomName += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomName;
}

const emit = defineEmits(['change'])

const handleFileChange = (e: Event) => {

    const loading = ElLoading.service({
        lock: true,
        text: '等待视频上传...',
        background: 'rgba(0, 0, 0, 0.7)',
    })

    const currentTarget: any = e.target as HTMLInputElement;
    // var now = new Date(getNowDate()).getTime()
    // var expire = new Date((policyInfo.expire)).getTime();
    // if (!policyInfo.expire && expire > now) {
    //     policyRequest
    // }

    getPolicy()
        .then((res) => {
            policyInfo.host = res.data.host
            policyInfo.accessId = res.data.accessId
            policyInfo.signature = res.data.signature
            policyInfo.dir = res.data.dir + '/'
            policyInfo.policy = res.data.policy
            policyInfo.expire = res.data.expire

            fileName.value = nameRandomize()
            var formData = new FormData();
            formData.append("OSSAccessKeyId", policyInfo.accessId);
            formData.append("signature", policyInfo.signature);
            formData.append("policy", policyInfo.policy);
            formData.append("key", policyInfo.dir + fileName.value + ".mp4");//注意顺序，file要在key的后面。不然会返回找不到key 的错误
            formData.append("file", currentTarget.files[0]);
            formData.append("success_action_status", '200');
            console.log(policyInfo, fileName, policyInfo.host + '/' + policyInfo.dir + fileName.value + '.mp4')

            url.value = policyInfo.host + '/' + policyInfo.dir + fileName.value + '.mp4'
            console.log(formData)

            axios.post(policyInfo.host, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then((res: any) => {
                    loading.close()
                    console.log(res, url.value)//url.value就是最终获取的播放链接
                    emit('change', url.value)
                })
                .catch((err) => {
                    loading.close()
                    ElNotification({
                        title: '未知错误',
                        message: err,
                        type: 'error'
                    })
                });
        })


}
</script>