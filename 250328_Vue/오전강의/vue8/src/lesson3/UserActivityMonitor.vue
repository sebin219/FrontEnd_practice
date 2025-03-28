<script>
import emitter from './eventBus'

export default {
  name: 'UserActivityMonitor',
  data() {
    return {
      activities: [],
    }
  },
  methods: {
    // 메시지 활동 처리
    handleMessageActivity(message) {
      this.activities.push({
        type: 'message',
        detail: `${message.username}님이 새 메시지를 보냈습니다`,
        time: new Date(),
      })
    },

    // 사용자 로그인 활동 처리
    handleUserLogin(user) {
      this.activities.push({
        type: 'login',
        detail: `${user.name}님이 로그인했습니다`,
        time: new Date(),
      })
    },

    // 시간 형식 변환
    formatTime(date) {
      return new Date(date).toLocaleTimeString()
    },
  },
  mounted() {
    // 여러 이벤트에 리스너 등록
    emitter.on('new-message', this.handleMessageActivity)
    emitter.on('user-login', this.handleUserLogin)

    // 모든 이벤트 로깅 (선택적)
    emitter.on('*', (type, event) => {
      console.log(`이벤트 발생: ${type}`, event)
    })
  },
  beforeUnmount() {
    // 모든 이벤트 리스너 제거
    emitter.off('new-message', this.handleMessageActivity)
    emitter.off('user-login', this.handleUserLogin)
    emitter.off('*')
  },
}
</script>

<template>
  <div class="activity-monitor">
    <h3>사용자 활동 모니터</h3>
    <ul class="activity-list">
      <li v-for="(activity, index) in activities" :key="index">
        <span class="activity-time">{{ formatTime(activity.time) }}</span>
        <span class="activity-type" :class="activity.type">{{
          activity.type
        }}</span>
        <span class="activity-detail">{{ activity.detail }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.activity-monitor {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
}
.activity-list {
  list-style: none;
  padding: 0;
  max-height: 200px;
  overflow-y: auto;
}
.activity-list li {
  padding: 8px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
}
.activity-time {
  color: #666;
  font-size: 0.8em;
  margin-right: 10px;
}
.activity-type {
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 10px;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;
}
.activity-type.message {
  background-color: #e3f2fd;
  color: #0d47a1;
}
.activity-type.login {
  background-color: #e8f5e9;
  color: #1b5e20;
}
.activity-detail {
  flex-grow: 1;
}
</style>
