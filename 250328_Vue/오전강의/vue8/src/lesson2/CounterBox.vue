<script>
export default {
  name: 'CounterBox',
  props: {
    initialCount: {
      type: Number,
      default: 0,
      validator: (value) => value >= 0, // 0 이상만 허용
    },
    max: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      count: this.initialCount,
      message: '',
    }
  },
  emits: ['reached-max'], // 이벤트 이름 정의

  watch: {
    // count 값 변화 감시
    count(newVal) {
      if (newVal === this.max) {
        this.message = '최대값에 도달했습니다!'
        // 부모 컴포넌트에 이벤트 발생
        this.$emit('reached-max', newVal)
      } else {
        this.message = ''
      }
    },
  },
  methods: {
    increment() {
      if (this.count < this.max) {
        this.count++
      }
    },
    decrement() {
      if (this.count > 0) {
        this.count--
      }
    },
  },
}
</script>

<template>
  <div class="counter">
    <h2>카운터</h2>
    <p>현재 값: {{ count }}</p>
    <button @click="increment">증가</button>
    <button @click="decrement">감소</button>
    <p>{{ message }}</p>
  </div>
</template>

<style scoped>
.counter {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}
button {
  padding: 5px 10px;
  margin-right: 10px;
  cursor: pointer;
}
</style>
