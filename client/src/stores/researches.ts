import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import axios from 'axios';
import { useUsersStore } from './users';
import moment from 'moment';

export const useResearchesStore = defineStore('researches', () => {
  const researchList = ref([]);
  const isLoading = ref(false);
  const currentResearch = ref(null);
  const user = useUsersStore();

  const getResearchList = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('/api/researches');

    researchList.value = response.data.map((research: any) => ({
      "_id": research._id,
      "researchTitle": research.researchTitle,
      "researchLeaders": research.researchLeaders.map((_leader: any, i: any) => ({
        //@ts-ignore
        "_id":  user.userList[i]._id,
        //@ts-ignore
        "name": user.userList[i].firstName + " " + user.userList[i].lastName
      })),
      "researchStatus": research.researchStatus,
      "createdAt": moment(research.createdAt).format("MMMM DD, YYYY")
    }));
  } catch (e) {
    alert(e);
  } finally {
    isLoading.value = false;
  }
}


  const getCurrentResearch = async (id: string) => {
    return axios
    .get('/api/research/' + id)
    .then((response) => {
      currentResearch.value = ({
        "_id": response.data._id,
        "researchTitle": response.data.researchTitle,
        "researchLeaders": response.data.researchLeaders.map((_leader: any, i: any) => ({
          //@ts-ignore
          "_id":  user.userList[i]._id,
          //@ts-ignore
          "name": user.userList[i].firstName + " " + user.userList[i].lastName
          })),
        "researchStatus": response.data.researchStatus,
        "conceptNote": response.data.conceptNote,
        "createdAt": moment(response.data.createdAt).format("MMMM DD, YYYY"),
        "updatedAt": moment(response.data.updatedAt).format("MMMM DD, YYYY")
        })
    })
    .catch((e) => alert(e));
  }


  const researchCount = computed(() => researchList.value.length);

  return { researchList, getCurrentResearch, currentResearch, getResearchList, researchCount}
});


