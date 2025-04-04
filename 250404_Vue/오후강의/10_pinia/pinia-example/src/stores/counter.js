import { defineStore } from 'pinia';
import { ref } from 'vue'; //숫자를 반응형으로 만들어주기 위함

// pinia 스토어 정의
// defineStore: 스토어를 생성하는 함수
// 첫번째 인자가 스토어의 고유 ID가 됨
export const useCounterStore = defineStore('counter', () => {
  // state 생성
  const count = ref(0); //카운터 값을 저장하는 상태 변수

  // getter

  // action
  // 1씩 증가시키는 메서드
  const increase = () => {
    count.value++;
  };
  // 0으로 초기화하는 메서드
  const reset = () => {
    count.value = 0;
  };
  return { count, increase, reset };
});
