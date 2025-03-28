<script>
export default {
  name: 'InputBox',
  data() {
    return {
      message: '',
    }
  },
  emits: ['sendMessage', 'increment'],
  methods: {
    sendMessage() {
      if (this.message.trim()) {
        // emit을 사용하여 부모 컴포넌트에 이벤트 발신
        this.$emit('sendMessage', this.message)
        this.message = '' // 입력필드 초기화
      }
    },
    incrementCounter(value) {
      // 값과 함께 이벤트 발신
      this.$emit('increment', value)
    },
  },
  components: {},
}
</script>

<template>
  <div class="child">
    <h3>자식 컴포넌트</h3>

    <!-- 메시지 전송 폼 -->
    <div class="form-group">
      <input type="text" v-model="message" placeholder="메시지 입력" />
      <button @click="sendMessage">메시지 전송</button>
    </div>

    <!-- 카운터 증가 버튼 -->
    <div class="form-group">
      <button @click="incrementCounter(1)">카운터 +1</button>
      <button @click="incrementCounter(5)">카운터 +5</button>
    </div>
  </div>
</template>

<style scoped>
.child {
  padding: 15px;
  margin-top: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
.form-group {
  margin-bottom: 10px;
}
button {
  margin-right: 5px;
  padding: 5px 10px;
}
</style>
