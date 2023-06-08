import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useBreadcrumbStore = defineStore('breadcrumb', () => {
  const data = reactive<{ name: string; path?: string }[]>([])
  return { data }
  // const count = ref(0)
  // const doubleCount = computed(() => count.value * 2)
  // function increment() {
  //   count.value++
  // }
})
