<script setup>
import { useToastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { message, type, isVisible } = storeToRefs(toastStore)

const getTypeClass = () => {
  switch (type.value) {
    case 'success':
      return 'toast-success'
    case 'error':
      return 'toast-error'
    case 'info':
      return 'toast-info'
    default:
      return 'toast-success'
  }
}
</script>

<template>
  <Transition name="toast">
    <div v-if="isVisible" class="toast-container" :class="getTypeClass()">
      <div class="toast-content">
        <div class="toast-message">{{ message }}</div>
        <button class="toast-close" @click="toastStore.hideToast">
          &times;
        </button>
      </div>
    </div>
  </Transition>
</template>

<!-- https://vuejs.org/guide/built-ins/transition.html#transition -->

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  min-width: 250px;
  max-width: 350px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 9999;
}

.toast-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toast-message {
  font-size: 14px;
  flex-grow: 1;
}

.toast-close {
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  margin-left: 10px;
  padding: 0;
  line-height: 1;
}

.toast-success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.toast-error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.toast-info {
  background-color: #d1ecf1;
  color: #0c5460;
  border: 1px solid #bee5eb;
}

/* 애니메이션 효과 */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
