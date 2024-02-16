import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';

export const useUsersStore = defineStore('user', () => {
  const userList = ref([]);
  const isLoading = ref(false);

  const getUsers = async () => {
    isLoading.value = true;
    return axios
      .get('/api/users')
      .then((res) => userList.value = res.data)
      .catch((error) => {
        console.log(error.response.data.error);
        userList.value = [];
      })
      .finally(() => isLoading.value = false)
  };

  getUsers();

  const userCount = computed(() => userList.value.length);


  return { userList, isLoading, getUsers, userCount };
});
