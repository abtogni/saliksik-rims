import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import { useUsersStore } from "./users";
import { usePresentationsStore } from "@/stores/presentations";
import moment from "moment";
import { useSchedulesStore } from "./schedules";

export const useResearchesStore = defineStore(
  "researches",
  () => {
    const researchList = ref([]);
    const userResearchList = ref([]);
    const isLoading = ref(false);
    const currentResearch = ref(null);
    const user = useUsersStore();

    const getResearchList = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get("/api/researches");

        researchList.value = response.data.map((research: any) => ({
          _id: research._id,
          researchTitle: research.researchTitle,
          researchLeaders: research.researchLeaders.map((leader: any) => {
            const matchingUser: any = user.userList.find(
              (user: any) => user._id === leader,
            );
            if (matchingUser) {
              return {
                _id: matchingUser._id,
                name: matchingUser.firstName + " " + matchingUser.lastName,
              };
            }
            return null;
          }),
          researchStatus: research.researchStatus,
          conceptNote: research.conceptNote,
          createdAt: moment(research.createdAt).format("MMMM DD, YYYY"),
        }));
      } catch (e) {
        alert(e);
      } finally {
        isLoading.value = false;
      }
    };

    const getUserResearches = async () => {
      isLoading.value = true;
      try {
        const response = await axios.get(
          //@ts-ignore
          `/api/researches/${user.currentUser._id}`,
        );
        userResearchList.value = response.data.map((research: any) => ({
          _id: research._id,
          researchTitle: research.researchTitle,
          researchLeaders: research.researchLeaders.map((leader: any) => {
            const matchingUser: any = user.userList.find(
              (user: any) => user._id === leader,
            );
            if (matchingUser) {
              return {
                _id: matchingUser._id,
                name: matchingUser.firstName + " " + matchingUser.lastName,
              };
            }
            return null;
          }),
          conceptNote: research.conceptNote,
          researchStatus: research.researchStatus,
          createdAt: moment(research.createdAt).format("MMMM DD, YYYY"),
        }));
      } catch (e) {
        alert(e);
      } finally {
        isLoading.value = false;
      }
    };

    const getCurrentResearch = async (id: string) => {
      return axios
        .get("/api/research/" + id)
        .then(async (response) => {
          //@ts-ignore
          currentResearch.value = {
            _id: response.data._id,
            researchTitle: response.data.researchTitle,
            researchLeaders: response.data.researchLeaders.map(
              (leader: any) => {
                const matchingUser: any = user.userList.find(
                  (user: any) => user._id === leader,
                );
                if (matchingUser) {
                  return {
                    _id: matchingUser._id,
                    name: matchingUser.firstName + " " + matchingUser.lastName,
                  };
                }
                return null;
              },
            ),
            researchStatus: response.data.researchStatus,
            conceptNote: response.data.conceptNote,
            createdAt: moment(response.data.createdAt).format("MMMM DD, YYYY"),
            updatedAt: moment(response.data.updatedAt).format("MMMM DD, YYYY"),
            presentations: await Promise.all(
              response.data.presentations.map(async (p: any) => {
                await usePresentationsStore().getCurrentPresentation(p);
                const res: any = usePresentationsStore().currentPresentation;
                if (res) {
                  return {
                    _id: res.data._id,
                    presentationType: res.data.presentationType,
                    panelistNotes: res.data.panelistNotes,
                    schedule: getScheduleData(res.data.scheduleID),
                  };
                }
                return null;
              }),
            ),
          };
        })
        .catch((e) => alert(e));
    };

    return {
      researchList,
      getCurrentResearch,
      currentResearch,
      getResearchList,
      getUserResearches,
      userResearchList,
    };
  },
  {
    persist: {
      storage: sessionStorage,
    },
  },
);

export interface Research {
  _id: string;
  researchTitle: string;
  researchStatus: string;
  conceptNote: any;
  createdAt: string;
  updatedAt: string;
  presentations: any;
}

const getScheduleData = async (id: string) => {
  await useSchedulesStore().getSchedule(id);
  const s: any = useSchedulesStore().currentSchedule;
  console.log(s);
  const scheduleData = s
    ? {
        _id: s.data._id,
        dateAndTime: s.data.dateAndTime,
        location: s.data.location,
        panelists: s.data.panelists,
      }
    : null;
  return { schedule: scheduleData };
};
