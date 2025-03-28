<script>
import CounterBox from './CounterBox.vue'
import InputBox from './InputBox.vue'
export default {
  name: 'Lesson2Parent',
  data() {
    return {
      childMessage: '',
      counter: 0,
    }
  },
  components: { CounterBox, InputBox },
  methods: {
    // CounterBox 컴포넌트로부터 이벤트를 받아 처리하는 메서드
    reachedMax(count) {
      alert(`최대값 ${count}에 도달했습니다!`)
    },

    // InputBox 컴포넌트로부터 이벤트를 받아 처리하는 메서드
    receiveMessage(message) {
      this.childMessage = message
    },
    incrementCounter(incrementValue) {
      this.counter += incrementValue
    },
  },
}
</script>

<template>
  <div class="lesson2parent">
    <!-- 동적 props와 메소드 전달 -->
    <CounterBox :initial-count="10" :max="15" @reached-max="reachedMax" />

    <!-- 메소드 전달2 -->
    <InputBox @sendMessage="receiveMessage" @increment="incrementCounter" />
    <p>자식으로부터 받은 메시지: {{ childMessage }}</p>
    <p>카운터: {{ counter }}</p>
  </div>
</template>

<style scoped></style>
