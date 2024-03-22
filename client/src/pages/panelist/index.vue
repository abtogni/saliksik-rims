<template>
  <v-container v-if="isDataLoaded" class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge color="primary" prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content">
              <h5 style="margin-right: 0.5rem">Panelist Dashboard</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                Check, track and manage your presentation schedules here.
              </v-tooltip>
            </p>
          </div>
        </div>
        <div class="header-right">
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="0" variant="flat" style="padding-bottom: 1rem">
          <v-tabs v-model="tab" color="primary">
            <v-tab value="current">Current
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
            <v-tab value="previous">Previous</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item >
              <div v-for="schedule in schedules" :key="schedule._id">
                <panelist_comments_schedule_overview :schedule="schedule" :researchList="researchList" />
              </div>
            </v-window-item>
            <v-window-item value="previous"> Previous </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useResearchesStore } from '@/stores/researches';
import { onMounted, ref } from "vue";
import axios from 'axios';


const researchList = ref<{ key: any; name: string; }[]>([]);
const schedules: any = ref([]);
const current: any = ref(null);
const isDataLoaded = ref(false);
const tab = ref(null);

onMounted(async () => {
  current.value = useUsersStore().currentUser;
  schedules.value = await axios.get(`/api/schedule/panelist/${current.value._id}`).then(async(res) => {
    const data = await Promise.all(res.data.map(async (item: any) => {
      item.presentations = await Promise.all(item.presentations.map(async (presentation: any) => {
        const res = await axios.get(`/api/presentation/${presentation}`);
        return res.data;
      }));
      return item;
    }));
    return data;
  });
  await Promise.all([
    useResearchesStore().getResearchList()
  ]);
  const researchStore = useResearchesStore().researchList;

  researchList.value = researchStore
    .filter((research: any) => research.conceptNote)
    .map((research: any) => ({
      key: research._id,
      name: research.researchTitle,
      status: research.researchStatus,
      conceptNote: research.conceptNote.status
    }));

  isDataLoaded.value = true;
});

</script>
