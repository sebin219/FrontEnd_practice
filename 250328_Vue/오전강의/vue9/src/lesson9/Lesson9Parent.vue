<script>
import { defineAsyncComponent, markRaw, shallowRef } from 'vue'
import LoadingComponent from './LoadingComponent.vue'
import ErrorComponent from './ErrorComponent.vue'

// 비동기 컴포넌트 정의 (고급 옵션 사용)
const HeavyComponent = markRaw(
  defineAsyncComponent({
    // 로더 함수 - 실제 컴포넌트를 가져오는 함수
    loader: () => import('./HeavyComponent.vue'),

    // 로딩 컴포넌트 - 로딩 중일 때 표시할 컴포넌트
    loadingComponent: LoadingComponent,

    // 로딩 컴포넌트 표시 전 지연 시간 (0으로 설정하여 즉시 표시)
    delay: 0,

    // 에러 컴포넌트 - 로딩 실패 시 표시할 컴포넌트
    errorComponent: ErrorComponent,

    // 타임아웃 - 이 시간을 초과하면 에러로 처리
    timeout: 300,

    // 에러 핸들러
    onError(error, retry, fail, attempts) {
      console.error('컴포넌트 로딩 에러:', error)
      if (attempts <= 3) {
        console.log(`${attempts}번째 재시도...`)
        retry()
      } else {
        console.log('최대 시도 횟수 초과')
        fail()
      }
    },

    // 서스펜스 모드 비활성화 (Options API에서 중요)
    suspensible: false,
  }),
)

export default {
  name: 'Lesson9Parent',
  components: {
    LoadingComponent,
    ErrorComponent,
  },
  data() {
    return {
      isLoaded: false,
      isErrored: false,
      // shallowRef 사용하여 반응형 문제 해결
      currentComponent: shallowRef(null),
    }
  },
  methods: {
    loadHeavyComponent() {
      // 컴포넌트 초기화를 먼저 null로 설정
      this.currentComponent = null
      this.isLoaded = false
      this.isErrored = false

      // setTimeout을 사용하여 DOM 업데이트 사이클이 완료되도록 함
      setTimeout(() => {
        this.currentComponent = HeavyComponent
        this.isLoaded = true
      }, 100)
    },
  },
}
</script>

<template>
  <div class="container">
    <h1>비동기 컴포넌트 로딩 데모</h1>
    <p>버튼을 클릭하면 무거운 컴포넌트가 비동기적으로 로드됩니다</p>

    <button @click="loadHeavyComponent">
      {{ isLoaded ? '다시 로드하기' : '무거운 컴포넌트 로드하기' }}
    </button>

    <div class="component-wrapper">
      <component v-if="currentComponent" :is="currentComponent"></component>
      <LoadingComponent v-else></LoadingComponent>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin: 20px 0;
}

button:hover {
  background-color: #45a049;
}

.component-wrapper {
  margin-top: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 400px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.loading-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.progress-bar {
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 4px;
  margin: 20px 0;
  height: 20px;
  overflow: hidden;
}

.progress {
  height: 100%;
  background-color: #4caf50;
  transition: width 0.3s ease;
}

.progress-text {
  font-weight: bold;
  color: #666;
}

.error-component {
  text-align: center;
  padding: 40px;
  color: #e74c3c;
}
</style>
