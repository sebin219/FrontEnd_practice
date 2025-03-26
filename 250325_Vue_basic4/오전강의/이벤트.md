# Vue3 이벤트

## 1. 기본 이벤트 처리

### 이벤트 리스닝

Vue에서 `v-on` 디렉티브(줄여서 `@`)를 사용하여 DOM 이벤트를 리스닝하고 트리거될 때 JavaScript를 실행할 수 있습니다.

```html
<div id="app">
  <!-- 메소드 이름만 전달 -->
  <button v-on:click="greet">인사하기</button>

  <!-- 인라인 표현식 -->
  <button @click="counter += 1">카운트 증가</button>

  <!-- 축약 표현 -->
  <button @click="sayHello">안녕하세요!</button>
</div>
```

```javascript
export default {
  data() {
    return {
      counter: 0,
    };
  },
  methods: {
    greet() {
      alert('안녕하세요!');
    },
    sayHello() {
      console.log('Hello!');
    },
  },
};
```

## 2. 이벤트 종류

Vue는 모든 표준 DOM 이벤트를 지원합니다. 가장 많이 사용되는 이벤트 종류는 다음과 같습니다:

### 마우스 이벤트

- `click`: 요소를 클릭했을 때
- `dblclick`: 요소를 더블 클릭했을 때
- `mousedown`: 마우스 버튼을 눌렀을 때
- `mouseup`: 마우스 버튼을 놓았을 때
- `mousemove`: 마우스를 움직일 때
- `mouseover`: 마우스가 요소 위로 올라갔을 때
- `mouseout`: 마우스가 요소에서 벗어났을 때
- `mouseenter`: 마우스가 요소에 들어갔을 때 (버블링 없음)
- `mouseleave`: 마우스가 요소를 떠났을 때 (버블링 없음)

### 키보드 이벤트

- `keyup`: 키를 놓았을 때
- `keydown`: 키를 눌렀을 때
- `keypress`: 키를 눌러 문자가 생성될 때 (더 이상 권장되지 않음)

### 폼 이벤트

- `submit`: 폼이 제출될 때
- `input`: input 값이 변경될 때
- `change`: 값이 변경되고 포커스가 떠날 때
- `focus`: 요소가 포커스를 얻었을 때
- `blur`: 요소가 포커스를 잃었을 때

### 자식 컴포넌트 이벤트

- 사용자 정의 이벤트: `this.$emit('event-name')`으로 트리거

## 3. 이벤트 수식어

Vue는 이벤트 핸들러 내부에서 `event.preventDefault()` 또는 `event.stopPropagation()`와 같은 메소드를 호출하는 것이 매우 일반적인 요구사항임을 인식하고 있습니다. 이를 위해 `v-on`에 이벤트 수식어를 제공합니다.

### 이벤트 전파 관련 수식어

- `.stop`: 이벤트 전파 중단 (event.stopPropagation())
- `.prevent`: 기본 동작 방지 (event.preventDefault())
- `.capture`: 캡처 모드에서 이벤트 리스너 사용
- `.self`: 요소 자신에서 발생한 이벤트만 처리
- `.once`: 이벤트가 한 번만 트리거되도록 함
- `.passive`: { passive: true } 옵션으로 이벤트 리스너 추가

```html
<!-- 클릭 이벤트 전파가 중단됩니다 -->
<a @click.stop="doThis"></a>

<!-- 제출 이벤트가 페이지를 다시 로드하지 않습니다 -->
<form @submit.prevent="onSubmit"></form>

<!-- 둘 다 사용할 수 있습니다 -->
<a @click.stop.prevent="doThat"></a>

<!-- self 수식어: 요소 자체에서 발생한 이벤트만 처리 -->
<div @click.self="doThat">...</div>

<!-- 이벤트가 오직 한 번만 트리거됩니다 -->
<a @click.once="doThis"></a>
```

### 키 수식어

키보드 이벤트를 리스닝할 때 특정 키를 체크할 필요가 있습니다:

```html
<!-- 'key'가 Enter일 때만 `vm.submit()`을 호출합니다 -->
<input @keyup.enter="submit" />
```

주요 키 수식어:

- `.enter`
- `.tab`
- `.delete` (Delete와 Backspace 키 모두 캡처)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`
- `.ctrl`
- `.alt`
- `.shift`
- `.meta` (Mac의 Command 키, Windows의 Windows 키)

### 키 수식어 조합

```html
<!-- Ctrl + Click -->
<div @click.ctrl="doSomething">Ctrl + Click</div>

<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />

<!-- Ctrl + Click만 트리거, Shift와 함께는 트리거되지 않음 -->
<button @click.ctrl.exact="onCtrlClick">Ctrl</button>

<!-- 아무 시스템 키도 누르지 않았을 때만 트리거 -->
<button @click.exact="onClick">Click</button>
```

### 마우스 버튼 수식어

- `.left`: 왼쪽 마우스 버튼
- `.right`: 오른쪽 마우스 버튼
- `.middle`: 가운데 마우스 버튼

```html
<button @click.right="showContextMenu">컨텍스트 메뉴</button>
```

## 4. 이벤트 객체

이벤트 핸들러에서 원본 DOM 이벤트에 접근해야 할 때가 있습니다. Vue는 자동으로 이벤트 객체를 핸들러에 전달합니다:

### 이벤트 객체 접근하기

```html
<button @click="warn">경고 표시</button>
```

```javascript
methods: {
  warn(event) {
    // 이제 네이티브 이벤트에 접근할 수 있습니다
    console.log(event.target.tagName) // BUTTON

    // 메시지 표시
    alert('경고 메시지')
  }
}
```

### 이벤트 객체와 인자 함께 사용하기

```html
<button @click="warn('메시지', $event)">경고</button>
```

```javascript
methods: {
  warn(message, event) {
    // 이제 네이티브 이벤트에 접근할 수 있습니다
    console.log(event.target.tagName)

    // 메시지 표시
    alert(message)
  }
}
```

## 5. 이벤트 객체 주요 속성 및 메소드

### 공통 속성

- `event.target`: 이벤트가 발생한 요소
- `event.currentTarget`: 이벤트 리스너가 연결된 요소
- `event.type`: 이벤트 유형(click, keyup 등)
- `event.timeStamp`: 이벤트가 생성된 시간

### 공통 메소드

- `event.preventDefault()`: 기본 동작 방지
- `event.stopPropagation()`: 이벤트 버블링 중단
- `event.stopImmediatePropagation()`: 같은 요소의 다른 리스너로의 전파도 중단

### 마우스 이벤트 속성

- `event.clientX`, `event.clientY`: 뷰포트 내의 마우스 좌표
- `event.pageX`, `event.pageY`: 문서 내의 마우스 좌표
- `event.button`: 어떤 마우스 버튼이 눌렸는지 (0: 왼쪽, 1: 가운데, 2: 오른쪽)

### 키보드 이벤트 속성

- `event.key`: 눌린 키의 값
- `event.keyCode`: 키 코드 (더 이상 권장되지 않음)
- `event.ctrlKey`, `event.altKey`, `event.shiftKey`, `event.metaKey`: 특수 키가 눌렸는지 여부

## 6. 실용적인 예제

### 전체 양식 제출 처리

```html
<form @submit.prevent="submitForm">
  <input v-model="user.name" @keyup.enter="focusEmail" ref="nameInput" />
  <input v-model="user.email" ref="emailInput" />
  <button type="submit">제출</button>
</form>
```

```javascript
export default {
  data() {
    return {
      user: {
        name: '',
        email: '',
      },
    };
  },
  mounted() {
    // 컴포넌트가 마운트되면 자동으로 이름 입력 필드에 포커스
    this.$refs.nameInput.focus();
  },
  methods: {
    submitForm() {
      // 양식 제출 로직
      console.log('제출된 유저 데이터:', this.user);
      // API 호출 등...
    },
    focusEmail() {
      // Enter 키 누르면 이메일 필드로 포커스 이동
      this.$refs.emailInput.focus();
    },
  },
};
```

### 키 조합 이벤트로 단축키 구현

```html
<div @keyup.ctrl.s="saveDocument" tabindex="0">
  <!-- 편집 가능한 문서 콘텐츠 -->
</div>
```

```javascript
methods: {
  saveDocument(event) {
    event.preventDefault() // 브라우저의 기본 저장 동작 방지
    console.log('문서 저장 중...')
    // 저장 로직...
  }
}
```

### 이벤트 위임(Event Delegation) 패턴

```html
<ul @click="handleClick">
  <li data-id="1">항목 1</li>
  <li data-id="2">항목 2</li>
  <li data-id="3">항목 3</li>
</ul>
```

```javascript
methods: {
  handleClick(event) {
    // 클릭된 요소가 li인지 확인
    const item = event.target.closest('li')
    if (item) {
      const id = item.dataset.id
      console.log(`항목 ${id} 클릭됨`)
      // 처리 로직...
    }
  }
}
```

## 7. 컴포넌트 간 이벤트 통신

### 부모 컴포넌트에서 자식 컴포넌트로 이벤트 전달

부모 컴포넌트 템플릿:

```html
<ChildComponent @custom-event="handleCustomEvent" />
```

부모 컴포넌트 스크립트:

```javascript
methods: {
  handleCustomEvent(data) {
    console.log('자식으로부터 이벤트 수신:', data)
  }
}
```

자식 컴포넌트:

```javascript
methods: {
  triggerEvent() {
    this.$emit('custom-event', { message: '자식에서 데이터 전송' })
  }
}
```

### 이벤트 버스 (Vue 3에서는 권장되지 않음)

Vue 3에서는 이벤트 버스 대신 Provide/Inject API나 상태 관리 라이브러리(Vuex, Pinia)를 사용하는 것이 권장됩니다.

## 8. 모범 사례와 성능 최적화

### 이벤트 핸들러 디바운싱/쓰로틀링

너무 자주 발생하는 이벤트(resize, scroll, input 등)의 경우, 디바운싱이나 쓰로틀링을 사용하는 것이 좋습니다:

```html
<input @input="debouncedSearch" />
```

```javascript
import { debounce } from 'lodash-es';

export default {
  created() {
    // 컴포넌트 인스턴스에 메소드 생성
    this.debouncedSearch = debounce(this.search, 300);
  },
  beforeUnmount() {
    // 컴포넌트가 제거되기 전에 타이머 정리
    this.debouncedSearch.cancel();
  },
  methods: {
    search(event) {
      // 검색 API 호출
      console.log('검색어:', event.target.value);
    },
  },
};
```

### 성능을 위한 이벤트 리스너 제거

```javascript
export default {
  mounted() {
    // 윈도우에 이벤트 리스너 추가
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    // 컴포넌트가 제거될 때 리스너 정리
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      // 리사이즈 처리 로직
    },
  },
};
```
