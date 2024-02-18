import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useUsersStore = defineStore(
  "user",
  () => {
    const userList = ref([]);
    const isLoading = ref(false);
    const currentUser = ref(null);

    const getCurrentUser = async () => {
      return axios
        .get("/api/auth/current-user")
        .then((res) => (currentUser.value = res.data))
        .catch((error) => {
          console.log(error.response.data.error);
          currentUser.value = null;
        });
    };

    const getUsers = async () => {
      isLoading.value = true;
      return axios
        .get("/api/users")
        .then((res) => (userList.value = res.data))
        .catch(() => {
          userList.value = [];
        })
        .finally(() => (isLoading.value = false));
    };

    const logoutUser = async () => {
      return axios.get("/api/auth/logout").then((res) => {
        currentUser.value = null;
        sessionStorage.clear();
        alert(res.data.message);
        window.location.href = "/";
      });
    };

    const userCount = computed(() => userList.value.length);

    return {
      userList,
      currentUser,
      isLoading,
      getUsers,
      getCurrentUser,
      userCount,
      logoutUser,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);

export interface User {
  _id: string;
  userID: string;
  role: string;
  affiliation: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
