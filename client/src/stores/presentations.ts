import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePresentationsStore = defineStore("presentations", () => {
  const presentationList = ref([]);
  const currentPresentation = ref(null);

  const getPresentations = async () => {
    try {
      const response = await axios.get("/api/presentations");
      presentationList.value = response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return { presentationList, getPresentations };
});
