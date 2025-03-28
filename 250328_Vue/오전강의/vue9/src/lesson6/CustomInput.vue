<script>
export default {
  name: 'CustomInput',
  props: {
    // v-model을 위한 기본 prop: modelValue
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    // 입력 값이 변경될 때 부모 컴포넌트에 알림
    updateValue(event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
}
</script>

<template>
  <div class="custom-input">
    <label v-if="$slots.label">
      <slot name="label"></slot>
    </label>
    <input type="text" :value="modelValue" @input="updateValue" class="input-field" />
  </div>
</template>

<style scoped>
.custom-input {
  margin: 10px 0;
}

.input-field {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
}

.input-field:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}
</style>
