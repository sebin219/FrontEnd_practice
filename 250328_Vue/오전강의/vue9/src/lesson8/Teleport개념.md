# Vue 3의 Teleport 이해하기

Teleport는 Vue 3에서 새롭게 도입된 기능으로, 컴포넌트 템플릿의 일부를 DOM의 다른 위치로 "순간이동(teleport)"시킬 수 있게 해줍니다.

## 핵심 개념

1. **DOM 계층 분리**: 컴포넌트의 논리적 계층과 DOM 계층을 분리할 수 있습니다.
2. **CSS 제한 극복**: z-index, overflow, position 등의 스타일 제한을 극복하는데 유용합니다.
3. **to 속성**: 대상 DOM 요소를 CSS 선택자로 지정합니다.
4. **Teleport 내용은 부모 컴포넌트 상태에 접근 가능**: 데이터 바인딩이 유지됩니다.

## 주요 사용 사례

- **모달 다이얼로그**: 오버레이가 필요한 모달 창
- **툴팁**: 부모 요소의 overflow 제한에서 벗어나야 하는 팝업
- **알림 메시지**: 화면 상단에 표시되는 전역 알림
- **포털**: 다른 DOM 노드로 내용을 포털링

## 추가 활용 예시

1. **전역 알림 시스템**:

```vue
<teleport to="#notifications">
  <div v-if="showNotification" class="notification">
    {{ notificationMessage }}
  </div>
</teleport>
```

2. **여러 대상으로 Teleport**:

```vue
<teleport to="#header">
  <user-menu></user-menu>
</teleport>

<teleport to="#footer">
  <copyright></copyright>
</teleport>
```

3. **동적 대상 지정**:

```vue
<teleport :to="teleportTarget">
  <component-content />
</teleport>
```

## 주의사항

1. 대상 요소(`to` 속성에 지정한 요소)는 컴포넌트가 마운트되기 전에 DOM에 존재해야 합니다.

2. Teleport는 내용을 다른 DOM 위치로 이동하지만, 컴포넌트 인스턴스 계층에는 영향을 주지 않습니다(부모 컴포넌트의 데이터와 메서드에 여전히 접근 가능).

3. 여러 컴포넌트에서 같은 대상으로 Teleport할 경우, 내용이 순서대로 추가됩니다.

Teleport는 복잡한 레이아웃 문제를 간단하게 해결할 수 있게 해줍니다.
