**[오전강의]**

lesson1: props전달 방식

1. 기본 문자열 lesson1-UserProfile.vue
2. 여러 타입 lesson1-ProductCard.vue
부모에서 보낸 props의 값들은 자식 내에서 값을 직접 변화시킬 수 없음
바꾸려면 함수를 정의하고 부모에서 함수를 불러서 바꿔야함
3. 필수 props 누락 시 경고메세지 확인 lesson1-MessageBox.vue
: lesson1Parent.vue의 32행에서 어떤 속성도 불러지지 않아서 경고메세지가 뜸
is-important -> 케밥케이스 / 케멀케이스가 자동으로 변화될 수 있음(Props 네이밍 규칙)
케밥케이스: -로 이어지는. 케멀케이스는 대문자로 구분

lesson2: emit

1. Lesson2Parent.vue의 33행
initial-count와 max는 부모->자식으로 넘어가는 속성. props.
@reaced-max는 자식->부모로 이벤트 발생. emit
emit은 자식 컴포넌트에서 이벤트 등록해야함.
: @케밥-케이스="카멜케이스"형식으로 적음

lesson3: mitt 라이브러리

- mitt: 작은 크기의 이벤트 처리(Event Emitter) 라이브러리

vue8-1: 이전의 vue_todo 파일 컴포넌트 분리

mitt 없이 자매 컴포넌트끼리 통신하는 방법
자매1에서 클릭 이벤트 -> 부모에 전달 / 부모는 자매2에 props 전달

**[오후 강의]**

단일 파일 컴포넌트

  - mitt 없이 형제컴포넌트 간 통신

  - mitt로 형제컴포넌트 간 통신

01_slot-basic
02_Named-slot

  - 부모가 자식 컴포넌트의 여러 위치에 콘텐츠 삽입 가능

  - slot에 name을 붙이면 특정 위치에 원하는 내용 전달 가능
03_dynamic-slot

  - 부모가 자식 컴포넌트의 슬롯에 동적으로 콘텐츠 할당 가능(슬롯 이름을 동적으로 변경 가능)
04_scoped-slot

  - 자식이 데이터를 넘겨준 걸 이용해서 부모가 콘텐츠를 제공
