<template>
  <v-container fluid class="nav-ctr pa-0">
    <!-- @vue-skip -->
    <v-card elevation="1" class="nav-body" v-if="currentResearch">
      <div class="nav-left truncate">
        <v-icon start icon="mdi-folder-open-outline"></v-icon>
        <h6 class="truncate">
          {{ currentResearch.researchTitle }}
        </h6>
      </div>

      <div class="nav-right">
        <v-chip color="primary" class="status-txt"> {{ currentResearch.researchStatus }} </v-chip>
        <v-btn variant="text" icon="mdi-dots-horizontal"> </v-btn>
      </div>
    </v-card>
  </v-container>
  <v-container fluid class="fill-height ctr">
    <v-card class="body" v-if="currentResearch">
      <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab v-for="item in tabItems" :key="item.value" :value="item.value">
            <v-icon start :icon="item.icon" />
            {{ item.label }}
          </v-tab>
        </v-tabs>
        <!-- @vue-skip -->
        <v-window v-model="tab" style="width: 100%">
          <v-window-item value="concept-note">
            <concept_note_tab :concept-note="currentResearch.conceptNote" />
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

const tabItems = [
  {
    value: "concept-note",
    icon: "mdi-file-document-outline",
    label: "Concept Note"
  },
  {
    value: "title-presentation",
    icon: "mdi-calendar-month-outline",
    label: "Title Presentation"
  },
  {
    value: "research-paper-progress",
    icon: "mdi-file-document-outline",
    label: "Research Paper Progress"
  },
  {
    value: "final-presentation",
    icon: "mdi-calendar-month-outline",
    label: "Final Presentation"
  },
  {
    value: "incentive",
    icon: "mdi-currency-php",
    label: "Incentive Status"
  }
];

const url = window.location.href;
const currentResearch = ref(null);
const param = url.split("/").slice(-1)[0];

const tab = ref("concept-note");
const r = useResearchesStore();

onMounted(async () => {
  await r.getCurrentResearch(param);
  currentResearch.value = r.currentResearch;
})

</script>
