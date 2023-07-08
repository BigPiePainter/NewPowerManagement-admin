import http from '@/libs/http'

export const userLogin = (data: any) => {
    const args = {
        url: '/api/management/login/login',
        method: 'POST',
        data,
        mode: "json"
    }
    return http.request(args)
}































// import { defineComponent } from 'vue';

// export default defineComponent({
//   data() {
//     return {
//       deviceInfo: {
//         userAgent: '',
//         language: '',
//       },
//     };
//   },

//   mounted() {
//     this.deviceInfo.userAgent = navigator.userAgent;
//     this.deviceInfo.language = navigator.language;
//   },
// });

