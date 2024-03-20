<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body" v-cloak>
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge color="primary" prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content">
              <h5 style="margin-right: 0.5rem">Concept Note Submissions</h5>
            </v-badge>

            <p class="help">
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
          <v-tabs v-model="tab" :items="tab_items" color="primary" />
          <v-window v-model="tab" v-for="item in tab_items" :key="item" :class="{ 'active': item === 'Submitted' }">
            <v-window-item :value="item">
              <concept_note_submissions_table :research_data="filteredResearchData(item)" />
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

const research_data = ref([]);
const tab = ref('');
const tab_items = ["Submitted", "Verified", "Approved", "Rejected"];
const loading = ref(true);

onMounted(async () => {
  const researchStore = useResearchesStore();
  await researchStore.getResearchList();
  research_data.value = researchStore.researchList;
  loading.value = false;
});

const filteredResearchData = computed(() => {
  return (status: string) => {
    return research_data.value.filter((item: any) => {
      return item.conceptNote && item.conceptNote["status"] === status;
    });
  };
});
</script>
