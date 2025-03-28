<script>
import emitter from './eventBus'

export default {
  name: 'MessageReceiver',
  data() {
    return {
      messages: [],
    }
  },
  methods: {
    // 이벤트 핸들러 함수
    handleNewMessage(message) {
      this.messages.push(message)
    },

    // 시간 형식 변환 함수
    formatTime(date) {
      return new Date(date).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    },

    // 모든 메시지 삭제
    clearMessages() {
      this.messages = []
    },
  },

  // 컴포넌트가 마운트될 때 이벤트 리스너 등록
  mounted() {
    emitter.on('new-message', this.handleNewMessage)
  },

  // 컴포넌트가 언마운트되기 전에 이벤트 리스너 제거
  beforeUnmount() {
    emitter.off('new-message', this.handleNewMessage)
  },
}
</script>

<template>
  <div class="message-receiver">
    <h3>메시지 수신 컴포넌트</h3>
    <p v-if="messages.length === 0" class="empty-state">
      아직 수신된 메시지가 없습니다.
    </p>
    <div v-else class="messages-container">
      <div v-for="msg in messages" :key="msg.id" class="message-card">
        <div class="message-header">
          <strong>{{ msg.username }}</strong>
          <span class="timestamp">{{ formatTime(msg.timestamp) }}</span>
        </div>
        <p class="message-content">{{ msg.content }}</p>
      </div>
    </div>
    <button v-if="messages.length > 0" @click="clearMessages" class="clear-btn">
      모든 메시지 삭제
    </button>
  </div>
</template>

<style scoped>
.message-receiver {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
}
.empty-state {
  text-align: center;
  color: #666;
  font-style: italic;
}
.messages-container {
  max-height: 300px;
  overflow-y: auto;
}
.message-card {
  background-color: white;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.timestamp {
  color: #888;
  font-size: 0.85em;
}
.message-content {
  margin: 0;
  white-space: pre-wrap;
}
.clear-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  margin-top: 10px;
  cursor: pointer;
}
</style>
