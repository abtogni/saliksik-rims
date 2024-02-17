<template>
  <v-container fluid class="nav-ctr pa-0">
    <v-card elevation="1" class="nav-body">
      <div class="nav-left truncate">
        <v-icon start icon="mdi-folder-open-outline"></v-icon>
        <h6 class="truncate">
          {{ currentResearch.researchTitle }}
        </h6>
      </div>

      <div class="nav-right">
        <v-chip color="primary" class="status-txt"> No Status </v-chip>
        <v-btn variant="text" icon="mdi-dots-horizontal"> </v-btn>
      </div>
    </v-card>
  </v-container>
  <v-container fluid class="fill-height ctr">
    <v-card class="body">
      <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab value="concept-note">
            <v-icon start icon="mdi-file-document-outline"> </v-icon>
            Concept Note
          </v-tab>
          <v-tab value="title-presentation">
            <v-icon start icon="mdi-calendar-month-outline"> </v-icon>
            Title Presentation
          </v-tab>
          <v-tab value="research-paper-progress">
            <v-icon start icon="mdi-file-document-outline"></v-icon>
            Research Paper Progress
          </v-tab>
          <v-tab value="final-presentation">
            <v-icon start icon="mdi-calendar-month-outline"></v-icon>
            Final Presentation
          </v-tab>
          <v-tab value="incentive">
            <v-icon start icon="mdi-currency-php"></v-icon>
            Incentive Status
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" style="width: 100%">
          <v-window-item value="concept-note">
            <concept_note_tab />
          </v-window-item>
          <v-window-item value="title-presentation">
            <title_presentation_tab />
          </v-window-item>
          <v-window-item value="research-paper-progress">
            <research_paper_progress />
          </v-window-item>
          <v-window-item value="option-4">
            <final_presentation_tab />
          </v-window-item>
          <v-window-item value="option-5">
            <incentive_status_tab />
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useResearchesStore } from '@/stores/researches';
import { onMounted, ref } from 'vue';

const url = window.location.href;
const currentResearch = ref(null);
const param = url.split("/").slice(-1)[0];

const tab = ref("concept-note");
const r = useResearchesStore();

onMounted(() => {
  r.getCurrentResearch(param);
  currentResearch.value = r.currentResearch;
})

</script>
