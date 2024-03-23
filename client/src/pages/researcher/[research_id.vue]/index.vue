<template>
  <div v-if="currentResearch">
    <v-container fluid class="nav-ctr pa-0">
      <v-card elevation="1" class="nav-body" v-if="currentResearch">
        <div class="nav-left truncate">
          <v-icon start icon="mdi-folder-open-outline"></v-icon>
          <h6 class="truncate">
            {{ currentResearch.researchTitle }}
          </h6>
        </div>

        <div class="nav-right">
          <v-chip color="primary" class="status-txt">
            {{ currentResearch.researchStatus }}
          </v-chip>
          <v-btn variant="text" icon="mdi-dots-horizontal"> </v-btn>
        </div>
      </v-card>
    </v-container>
    <v-container fluid class="fill-height ctr">
      <v-card elevation="0" variant="flat" class="body">
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" direction="vertical" color="primary">
            <v-tab v-for="item in tabItems" :key="item.value" :value="item.value">
              <v-icon start :icon="item.icon" />
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <v-window v-model="tab" style="width: 100%">
            <v-window-item value="concept-note">
              <v-card flat style="padding-top: 0.833rem" class="body">
                <v-card-title flat class="header">
                  <div class="header-left">
                    <div class="header-caption">
                      <h5 style="margin-right: 0rem">
                        Concept Note

                      </h5>
                      <p class="help" style="padding-top: 0.3rem">
                        help
                        <v-tooltip activator="parent" location="bottom">Create and submit concept note to start.
                        </v-tooltip>
                      </p>
                    </div>
                  </div>

                  <div class="header-right">
                    <status_concept_note_submitted
                      v-if="currentResearch.conceptNote && currentResearch.conceptNote.status == 'Submitted'" />
                    <status_concept_note_verified
                      v-else-if="currentResearch.conceptNote && currentResearch.conceptNote.status == 'Verified'" />
                    <status_concept_note_approved
                      v-else-if="currentResearch.conceptNote && currentResearch.conceptNote.status == 'Approved'" />
                    <status_concept_note_rejected
                      v-else-if="currentResearch.conceptNote && currentResearch.conceptNote.status == 'Rejected'" />
                    <status_no_status v-else />
                    <v-btn v-if="currentResearch.conceptNote" type="submit" flat variant="outlined"
                      prepend-icon="mdi-file-document-edit-outline" class="button-outlined">Edit Concept Note
                    </v-btn>
                    <v-btn type="submit" flat prepend-icon="mdi-file-document-plus-outline" class="button-regular"
                      @click="$router.push(`${currentResearch._id}/create_concept_note`,)" v-else>Create Concept Note
                    </v-btn>

                  </div>
                </v-card-title>

                <v-card-text v-if="currentResearch.conceptNote">
                  <concept_note_tab :data="currentResearch.conceptNote" />
                </v-card-text>
                <v-card variant="flat" text="You don't have a concept note yet, you should create one." class="bold"
                  v-else>
                </v-card>
              </v-card>
            </v-window-item>
            <v-window-item value="title-presentation">
              <presentation_tab
                :presentations="presentations.filter((presentation: any) => presentation.presentationType === 'Title')" />
            </v-window-item>
            <v-window-item value="research-paper">
              <research_paper_progress :id="currentResearch._id" :title="currentResearch.researchTitle"/>
            </v-window-item>
            <v-window-item value="final-presentation">
              <presentation_tab
                :presentations="presentations.filter((presentation: any) => presentation.presentationType === 'Final')" />
            </v-window-item>
            <!-- <v-window-item value="incentive">
              <incentive_status_tab />
            </v-window-item> -->
          </v-window>
        </div>
      </v-card>
    </v-container>

  </div>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import axios from "axios";
import { onMounted, ref } from "vue";


const tabItems = [
  {
    value: "concept-note",
    icon: "mdi-file-document-outline",
    label: "Concept Note",
  },
  {
    value: "title-presentation",
    icon: "mdi-calendar-month-outline",
    label: "Title Presentation",
  },
  {
    value: "research-paper",
    icon: "mdi-file-document-outline",
    label: "Research Paper",
  },
  {
    value: "final-presentation",
    icon: "mdi-calendar-month-outline",
    label: "Final Presentation",
  },
];

const url = window.location.href;
const currentResearch: any = ref(null);
const param = url.split("/").slice(-1)[0];
const presentations: any = ref([]);
const tab = ref("concept-note");
const r = useResearchesStore();

onMounted(async () => {
  await r.getCurrentResearch(param);
  currentResearch.value = r.currentResearch;
  presentations.value = await Promise.all(currentResearch.value.presentations.map(async (p: any) => {
    const response = await axios.get(`/api/presentation/${p}`);
    return response.data;
  }));
});

</script>
