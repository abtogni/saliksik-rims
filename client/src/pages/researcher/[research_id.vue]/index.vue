<template>
  <div v-if="currentResearch" class="overview-ctr">
    <v-container fluid class="nav-ctr pa-0">
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
      <v-card elevation="5" class="body">
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
              <v-card flat style="padding-top: 0.833rem">
                <v-card flat class="header-body">
                  <div class="header-left truncate">
                    <div class="header-caption-ctr">
                      <h5>Concept Note
                        <concept_note_reviewing />
                      </h5>

                      <p class="caption">Create and submit concept note to start.</p>
                    </div>
                  </div>

                  <div class="header-right">
                    <v-btn type="submit" flat prepend-icon="mdi-file-document-plus-outline" class="button-regular"
                      @click="$router.push(`dss/create_concept_note`)">Create Concept Note
                    </v-btn>
                    <v-btn type="submit" flat variant="outlined" prepend-icon="mdi-file-document-edit-outline"
                      class="button-outlined">Edit Concept Note
                    </v-btn>
                  </div>
                </v-card>


                <v-card v-if="currentResearch.conceptNote">
                  <concept_note_tab :data="currentResearch.conceptNote" />
                </v-card>
                <v-card text="You don't have a concept note yet, you should create one." class="bold" v-else>
                </v-card>


              </v-card>
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
  </div>
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
