<script>
export default {
  name: 'TodoItem',
  data() {
    return {}
  },
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  emits: ['toggle-completed'],
  methods: {
    toggleCompleted() {
      this.$emit('toggle-completed', this.todo.id)
    },
  },
}
</script>

<template>
  <li :class="{ completed: todo.completed }" @click="toggleCompleted">
    <input type="checkbox" />
    <span>{{ todo.text }}</span>
    <time>{{ todo.createAt }}</time>
    <i class="fa fa-trash" @click.stop=""></i>
  </li>
</template>

<style scoped>
.todo-list li {
  display: flex;
  align-items: center;
  gap: var(--space-s);
  padding: var(--space-s);
  border-bottom: dotted 1px var(--gray200);
  cursor: pointer;
  transition: 0.3s;
}
.todo-list li:hover {
  background-color: var(--gray500);
}
/* 완료된 리스트 스타일 */
.todo-list li.completed {
  opacity: 0.1;
}
.todo-list li.completed span {
  text-decoration: line-through;
}

.todo-list span {
  flex: 1;
}
.todo-list time {
  font-size: 0.75rem;
}
.todo-list i {
  border: 1px solid transparent;
  padding: var(--space-s);
  color: var(--gray100);
  border-radius: var(--space-s);
  transition: 0.3s;
}
.todo-list i:hover {
  border: 1px solid var(--danger);
  color: var(--danger);
}
/* 가상요소로 사용하는 방법 */
.todo-list button::after {
  font-family: 'Font Awesome 6 Free';
  font-weight: bold;
  content: '\f1f8';
}
li.empty {
  flex-direction: column;
  padding: var(--space-l) 0;
}
li.empty:hover {
  background-color: transparent !important;
}
li.empty i {
  font-size: 3rem;
}
li.empty i:hover {
  border: none;
  color: var(--gray200);
}
</style>
