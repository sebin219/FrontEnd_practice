<script setup>
//바로 axios 써서 가져오는 것은 효율이 떨어짐. Students.js만들어서 따로 빼내서 갖고오기
import { onMounted } from 'vue';
import { useStudent } from '@/api/Students';
import StudentCard from '@/components/StudentCard.vue';

//컴포저블 함수 구조분해 할당해서 데이터 갖고 올거임
const { students, error, fetchAllStudents } = useStudent();

onMounted(() => {
  fetchAllStudents();
});
</script>

<template>
  <div>
    <h2>KB-19기 학생들</h2>
    <div>
      <div v-for="student in students" :key="student.id">
        <StudentCard :student="student"></StudentCard>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
