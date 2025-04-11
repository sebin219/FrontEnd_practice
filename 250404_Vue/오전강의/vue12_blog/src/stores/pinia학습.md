# Pinia 소개

Pinia는 Vue.js 애플리케이션을 위한 상태 관리 라이브러리로, Vue 3의 Composition API와 완벽하게 호환됩니다. Vuex의 후속작으로 개발되었으며, vue의 공식 라이브러리 입니다.

## Pinia의 주요 특징

1. **간결한 API**: Vuex보다 더 직관적이고 간단한 API 제공
2. **TypeScript 지원**: 타입 안정성 제공
3. **개발자 도구 지원**: Vue DevTools와 통합
4. **모듈화**: 복잡한 네임스페이스 중첩 없이 스토어 분리 가능
5. **Composition API와의 원활한 통합**

## Pinia 기본 개념

Pinia는 세 가지 핵심 개념을 가지고 있습니다:

1. **State**: 스토어의 데이터
2. **Getters**: 계산된 값 (Vue의 computed와 유사)
3. **Actions**: 상태를 변경하는 메서드 (동기/비동기 작업 모두 가능)

## Composition API와 Pinia 사용 방법

1. **스토어 정의**:

   - `defineStore` 함수 사용
   - 고유 ID와 옵션 객체 제공

2. **스토어 사용**:

   - `useXXXStore()` 형태의 함수 호출
   - `<script setup>` 내에서 바로 사용 가능

3. **상태 변경**:
   - actions를 통한 상태 변경 (권장)
   - `$patch` 메서드로 직접 변경 가능

## 실제 사용 예시

```javascript
// 1. 필요한 패키지 설치
// npm install pinia

// 2. main.js에서 Pinia 설정
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
app.mount('#app')

// 3. 스토어 정의 (stores/counter.js)
import { defineStore } from 'pinia'

// defineStore의 첫 번째 인자는 스토어의 고유 ID
export const useCounterStore = defineStore('counter', {
  // state는 스토어의 데이터를 정의
  state: () => ({
    count: 0,
    name: 'Counter'
  }),

  // getters는 computed 속성과 같은 역할
  getters: {
    doubleCount: (state) => state.count * 2,
    // this를 사용해 다른 getter에 접근 가능
    countPlusName: function() {
      return `${this.count} - ${this.name}`
    }
  },

  // actions는 상태를 변경하는 메서드
  actions: {
    increment() {
      this.count++
    },
    // 비동기 작업도 쉽게 처리
    async fetchAndAdd() {
      const response = await fetch('https://api.example.com/value')
      const data = await response.json()
      this.count += data.value
    },
    setName(newName) {
      this.name = newName
    }
  }
})

// 4. Composition API에서 사용 (Counter.vue)
<script setup>
import { ref } from 'vue'
import { useCounterStore } from '@/stores/counter'

// 스토어 사용
const counter = useCounterStore()

// 로컬 상태와 스토어 상태 연동
const name = ref(counter.name)
const updateName = () => {
  counter.setName(name.value)
}

// 스토어 값 직접 변경 (actions를 거치지 않는 방법)
// counter.$patch({ count: counter.count + 1 })

// 여러 상태를 한 번에 업데이트
// counter.$patch((state) => {
//   state.count++
//   state.name = 'New Name'
// })
</script>

<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double Count: {{ counter.doubleCount }}</p>
    <p>Custom: {{ counter.countPlusName }}</p>
    <button @click="counter.increment">Increment</button>
    <button @click="counter.fetchAndAdd">Fetch and Add</button>
    <input v-model="name" @blur="updateName" />
  </div>
</template>


```

위의 예제 코드는 다음과 같은 사항을 보여줍니다:

1. Pinia 설치 및 애플리케이션에 등록
2. 간단한 카운터 스토어 생성
3. Composition API에서 스토어 사용
4. Options API에서 스토어 사용
5. 비동기 작업 처리
6. 여러 컴포넌트에서 상태 공유

## Pinia vs Vuex

Pinia는 Vuex 5를 대체하는 새로운 상태 관리 라이브러리로, 다음과 같은 이점이 있습니다:

- Mutations이 제거되어 더 단순한 API
- TypeScript 통합이 개선됨
- 더 가벼운 크기와 더 나은 성능
- DevTools에서 더 나은 디버깅 경험
- Composition API와의 자연스러운 통합

Vuex 대신 Pinia를 사용하는 것이 권장.
