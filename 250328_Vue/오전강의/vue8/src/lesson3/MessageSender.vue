<script>
import emitter from './eventBus'

export default {
  name: 'MessageSender',
  data() {
    return {
      username: '',
      message: '',
    }
  },
  computed: {
    isValid() {
      return this.username.trim() && this.message.trim()
    },
  },
  methods: {
    sendMessage() {
      if (!this.isValid) return

      // mitt를 사용하여 이벤트 발신
      emitter.emit('new-message', {
        id: Date.now(),
        username: this.username,
        content: this.message,
        timestamp: new Date(),
      })

      // 메시지 전송 후 입력 필드 초기화 (선택 사항)
      this.message = ''
    },
  },
}
</script>

<template>
  <div class="message-sender">
    <h3>메시지 발신 컴포넌트</h3>
    <div class="form-group">
      <label for="username">사용자 이름:</label>
      <input id="username" v-model="username" placeholder="이름 입력" />
    </div>
    <div class="form-group">
      <label for="message">메시지:</label>
      <textarea
        id="message"
        v-model="message"
        placeholder="메시지 입력"
      ></textarea>
    </div>
    <button @click="sendMessage" :disabled="!isValid">메시지 전송</button>
  </div>
</template>

<style scoped>
.message-sender {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 12px;
}
label {
  display: block;
  margin-bottom: 4px;
  font-weight: bold;
}
input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
textarea {
  min-height: 80px;
  resize: vertical;
}
button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
