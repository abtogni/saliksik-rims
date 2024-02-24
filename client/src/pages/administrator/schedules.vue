<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h5>Presentations</h5>

            <p class="caption">
              Create schedule, add research projects and assign panelist for
              title and final presentation.
            </p>
          </div>
        </div>

        <div class="header-right">
          <create_schedule_modal :users="users" :researchList="researchList" />
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="5" style="padding-bottom: 1rem">
          <v-tabs v-model="tab">
            <v-tab value="title">Title
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
              <template v-if="schedules.length > 0">
                <schedule_overview :schedule="schedules" :users="users" :researchList="researchList" />
              </template>
              <template v-else>
                <p>No schedules available.</p>
              </template>
            </v-window-item>
            <v-window-item value="final"> final </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useResearchesStore } from '@/stores/researches';
import axios from "axios";
import { onMounted, ref } from "vue";


const users = ref<{ key: any; name: string; }[]>([]);
const researchList = ref<{ key: any; name: string; }[]>([]);
const schedules = ref([]);

onMounted(async () => {
  await useResearchesStore().getResearchList();
  const userStore = useUsersStore().userList;
  const researchStore = useResearchesStore().researchList;
  users.value = userStore.map((user: any) => ({
    key: user._id,
    name: user.firstName + ' ' + user.lastName
  }));

  researchList.value = researchStore.map((research: any) => ({
    key: research._id,
    name: research.researchTitle
  }));

  try {
    const response = await axios.get('/api/schedules');
    schedules.value = response.data;
  } catch (error) {
    console.error(error);
  }
});

const tab = ref("null");
</script>
