import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useUsersStore } from "./users";
import { usePresentationsStore } from "./presentations";

export const useSchedulesStore = defineStore("schedules", () => {
  const userStore = useUsersStore();
  const schedulesList = ref([]);
  const presStore = usePresentationsStore();

  const getSchedulesList = async () => {
    return await axios.get("/api/schedules").then((response) => {
      schedulesList.value = response.data.map((schedule: any) => ({
        _id: schedule.id,
        dateAndTime: schedule.dateAndTime,
        location: schedule.location,
        panelists: schedule.panelists.map((panelist: any) => {
          const matchingUser: any = userStore.userList.find(
            (user: any) => user._id === panelist,
          );
          if (matchingUser) {
            return {
              _id: matchingUser._id,
              name: matchingUser.firstName + " " + matchingUser.lastName,
            };
          }
          return null;
        }),
        presentations: schedule.presentations.map((present: any) => {
          const matchingPresentation: any = presStore.presentationList.find(
            (presentation: any) =>
              presentation._id === present &&
              presentation.scheduleID === schedule._id,
          );
          if (matchingPresentation) {
            return {
              _id: matchingPresentation._id,
              researchID: matchingPresentation.researchID,
              status: matchingPresentation.status,
            };
          }
        }),
      }));
    });
  };

  return { schedulesList, getSchedulesList };
});
