import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const usePresentationsStore = defineStore("presentations", () => {
  const presentationList = ref([]);
  const currentPresentation = ref(null);

  const getPresentations = async () => {
    return await axios
      .get("api/presentations")
      .then((response) => (presentationList.value = response.data))
      .catch((error) => console.error(error));
  };

  return { presentationList, getPresentations };
});
