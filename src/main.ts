import '@/assets/main.scss'
// import '@/assets/base.scss'
// import '@/assets/index.scss'

import { createApp, reactive } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)
app.config.globalProperties.$author = reactive({})
app.config.globalProperties.$policy = reactive({})
app.config.globalProperties.$isIn = true
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.mount('#app')
