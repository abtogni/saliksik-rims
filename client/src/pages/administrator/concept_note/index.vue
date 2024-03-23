<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body" v-if="mounted">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <h5 style="margin-right: 0rem">Concept Note Submissions</h5>

            <p class="help" style="margin-top: 0.3rem">
              help
              <v-tooltip activator="parent" location="bottom">
                Call for submission to start. Approve or reject submitted
                concept note. Click on the concept note, on the left, to see
                overview.
              </v-tooltip>
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <call_for_submission />
        </div>
      </v-card-title>

      <!--tab container-->
      <v-card-text class="content">
        <v-card elevation="0" variant="flat" class="">
          <v-tabs v-model="tab">
            <v-tab
              v-for="item in tab_items"
              :key="item.value"
              :value="item.value"
            >
              <v-badge
                color="primary"
                style="text-align: start; width: fit-content"
                :content="item.content"
                floating
              >
                {{ item.label }}
              </v-badge>
            </v-tab>
            <v-tab
              v-for="item in tab_items2"
              :key="item.value"
              :value="item.value"
            >
              {{ item.label }}
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="Submitted" mandatory="force">
              <concept_note_submissions_table
                :research_data="filteredResearchData('Submitted')"
              />
            </v-window-item>
            <v-window-item value="Verified">
              <concept_note_submissions_table
                :research_data="filteredResearchData('Verified')"
              />
            </v-window-item>
            <v-window-item value="Approved">
              <concept_note_submissions_table
                :research_data="filteredResearchData('Approved')"
              />
            </v-window-item>
            <v-window-item value="Rejected">
              <concept_note_submissions_table
                :research_data="filteredResearchData('Rejected')"
              />
            </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import { ref, computed, onMounted } from "vue";


const mounted = ref(false);
const research_data = ref([]);
const tab = ref("");
const tab_items = [
  {
    value: "Submitted",
    label: "Submitted",
    content: "22",
  },
  {
    value: "Verified",
    label: "Verified",
    content: "",
  },
];

const tab_items2 = [
  {
    value: "Approved",
    label: "Approved",
    content: "",
  },
  {
    value: "Rejected",
    label: "Rejected",
    content: "",
  },
];

onMounted(async () => {
  const researchStore = useResearchesStore();
  await researchStore.getResearchList();
  research_data.value = researchStore.researchList;
  mounted.value = true;
});

const filteredResearchData = computed(() => {
  return (status: string) => {
    return research_data.value.filter((item: any) => {
      return item.conceptNote && item.conceptNote["status"] === status;
    });
  };
});
</script>
