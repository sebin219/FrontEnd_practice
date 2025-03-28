<script>
export default {
  name: 'MessageBox',
  // 필수 props와 기본값 props 정의
  props: {
    message: {
      type: String,
      required: true, // 필수 prop
    },
    isImportant: {
      type: Boolean,
      default: false, // 기본값. props를 전달하지 않으면 false
    },
    sender: {
      type: String,
      default: '익명', // 기본값
    },
  },
}
</script>

<template>
  <div class="message-box" :class="{ important: isImportant }">
    <h2>메시지</h2>
    <p>{{ message }}</p>
    <p>
      <small>발송자: {{ sender }}</small>
    </p>
  </div>
</template>

<style scoped>
.message-box {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
.message-box.important {
  border-color: red;
  background-color: #ffeeee;
}
</style>
