import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiClient from '@/utils/axios';

export const useStudentStore = defineStore('studentStore', () => {
  //상태
  const students = ref([]);

  //액션
  const fetchStudents = async () => {
    try {
      const response = await apiClient.get('/students');
      students.value = response.data;
    } catch (err) {
      console.log('학생정보 로딩에러 : ', err);
    }
  };
  //게터
  const studentCount = computed(() => students.value.length);

  return { fetchStudents, students, studentCount };
});
