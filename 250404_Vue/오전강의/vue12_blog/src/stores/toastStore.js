import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const type = ref('success') // success, error, info 등의 타입
  const isVisible = ref(false)
  let timer = null

  const showToast = (newMessage, newType = 'success', duration = 2000) => {
    if (timer) {
      clearTimeout(timer)
    }

    message.value = newMessage
    type.value = newType
    isVisible.value = true

    timer = setTimeout(() => {
      isVisible.value = false
      timer = null
    }, duration)
  }

  const hideToast = () => {
    isVisible.value = false
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  return { message, type, isVisible, showToast, hideToast }
})
