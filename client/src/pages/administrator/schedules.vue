<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body" v-cloak>
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge
              :content="schedules.length"
              color="primary"
              prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content"
            >
              <h5 style="margin-right: 0.5rem">Presentations</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                Create schedule, add research projects and assign panelist for
                title and final presentation.
              </v-tooltip>
            </p>
          </div>
        </div>
        <div class="header-right">
          <!-- <create_schedule_modal :users="users" :researchList="researchList" /> -->
          <v-btn
            flat
            prepend-icon="mdi-calendar-plus-outline"
            class="button-regular"
            text="Create Schedule"
            href="/administrator/create_schedule"
          />
          <create_schedule />
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card
          elevation="0"
          variant="flat"
          style="padding-bottom: 1rem"
          v-if="isDataLoaded"
        >
          <v-tabs v-model="tab" color="primary">
            <v-tab value="title"
              >Title
              <template v-slot:append>
                <v-badge color="info" content="6" inline>
                  <v-tooltip activator="parent" location="top">
                    Previous Schedule
                  </v-tooltip>
                </v-badge>
                <v-badge color="warning" content="1" inline>
                  <v-tooltip activator="parent" location="top">
                    On Going Schedule
                  </v-tooltip>
                </v-badge>
              </template>
            </v-tab>
            <v-tab value="final">Final</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="title">
              <template v-if="schedules">
                <schedule
                  :schedule="schedules"
                  :researches="researchList"
                  :users="users"
                />
              </template>

              <template v-else>
                <p>No schedules available.</p>
              </template>
            </v-window-item>
            <v-window-item value="final"> final </v-window-item>
          </v-window>
        </v-card>
        <v-card
          elevation="0"
          variant="flat"
          style="padding-bottom: 1rem"
          v-else
        >
          <p>Loading data...</p>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { useResearchesStore } from "@/stores/researches";
import { onMounted, ref } from "vue";
import axios from "axios";

const users = ref<{ key: any; name: string; role: string }[]>([]);
const schedules: any = ref([]);
const researchList = ref<
  {
    key: any;
    name: string;
    status: string;
    researchLeaders: any;
    conceptNote: any;
  }[]
>([]);

const isDataLoaded = ref(false);

onMounted(async () => {
  await axios.get("/api/schedules").then((response) => {
    schedules.value = response.data;
  });
  const userStore = useUsersStore().userList;
  const researchStore = useResearchesStore().researchList;
  users.value = userStore.map((user: any) => ({
    key: user._id,
    name: user.firstName + " " + user.lastName,
    role: user.role,
  }));

  researchList.value = researchStore
    .filter((research: any) => research.conceptNote)
    .map((research: any) => ({
      key: research._id,
      name: research.researchTitle,
      status: research.researchStatus,
      researchLeaders: research.researchLeaders,
      conceptNote: research.conceptNote.status,
    }));

  users.value = computePanelists();
  researchList.value = computeResearches();
  isDataLoaded.value = true;
});

const tab = ref("null");

const computeResearches = () => {
  return researchList.value.filter(
    (research) =>
      research.status === "Research Paper" ||
      research.conceptNote === "Verified",
  );
};

const computePanelists = () => {
  return users.value.filter((user) => user.role === "Panelist");
};
</script>
