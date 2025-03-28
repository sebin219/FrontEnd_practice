<template>
  <div class="loading-component">
    <div class="spinner"></div>
    <p>차트를 불러오는 중...</p>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="progress-text">{{ progress }}% 완료</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      progress: 0,
      interval: null,
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.progress < 90) {
        this.progress += Math.floor(Math.random() * 10)
        if (this.progress > 90) this.progress = 90
      }
    }, 200)
  },
  beforeUnmount() {
    clearInterval(this.interval)
  },
}
</script>
