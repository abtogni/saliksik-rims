import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

const isLoading = ref(false);

export const useSchedulesStore = defineStore("schedules", () => {
  const schedulesList = ref([]);

  const getSchedulesList = async () => {
    isLoading.value = true;
    return axios.get("api/schedules").then((response) => {
      schedulesList.value = response.data;
    });
  };

  return { schedulesList, getSchedulesList };
});
