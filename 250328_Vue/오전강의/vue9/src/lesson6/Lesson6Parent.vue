<script>
import CustomInput from './CustomInput.vue'
export default {
  name: 'Lesson6Parent',
  components: {
    CustomInput,
  },
  data() {
    return {
      username: '',
      email: '',
      emailAgree: false,
    }
  },
}
</script>
<template>
  <h2>컨포넌트의 v-model</h2>
  <div class="parent-container">
    <!-- 기본 v-model 사용 -->
    <CustomInput v-model="username">
      <template #label>사용자 이름:</template>
    </CustomInput>

    <p>입력된 사용자 이름: {{ username }}</p>

    <!-- 다른 항목에 대한 v-model 사용 -->
    <CustomInput v-model="email">
      <template #label>이메일 주소:</template>
    </CustomInput>

    <p>입력된 이메일: {{ email }}</p>
  </div>
</template>

<style scoped>
.parent-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

p {
  margin-top: 5px;
  color: #666;
}
</style>
