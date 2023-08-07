<template>
    <div>
        <input @click="policyRequest" @change="handleFileChange" />
    </div>
</template>

<script setup lang="tsx">
import axios from 'axios';
import { ref } from 'vue';
import { getPolicy } from '@/apis/oss';
import { getCurrentInstance } from "vue";
const policyInfo = getCurrentInstance()?.appContext.config.globalProperties.$policy

// const host = ref('')
// const accessId = ref('')
// const signature = ref('')
// const policy = ref('')
// const dir = ref('')
const fileName = ref('')
const url = ref('')

const policyRequest = () => {
    getPolicy().then((res) => {
        policyInfo.host = res.data.host
        policyInfo.accessId = res.data.accessId
        policyInfo.signature = res.data.signature
        policyInfo.dir = res.data.dir
        policyInfo.policy = res.data.policy
        policyInfo.expire = res.data.expire
    })
}

const nameRandomize = () => {
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var randomName = '';
    for (let i = 0; i < 10; i++) {
        randomName += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return randomName;
}

const handleFileChange = (e: Event) => {
    const currentTarget: any = e.target as HTMLInputElement;
    fileName.value = nameRandomize()
    var formData = new FormData();
    formData.append("OSSAccessKeyId", policyInfo.accessId);
    formData.append("signature", policyInfo.signature);
    formData.append("policy", policyInfo.policy);
    formData.append("key", policyInfo.dir + fileName.value + ".mp4");//注意顺序，file要在key的后面。不然会返回找不到key 的错误
    formData.append("file", currentTarget.files[0]);
    formData.append("success_action_status", '200');

    url.value = policyInfo.host + policyInfo.dir + fileName.value

    axios.post(policyInfo.host, formData).then((res) => {
        console.log(res, url.value)
    }).catch((err) => {
        console.log(err)
    });
}
</script>