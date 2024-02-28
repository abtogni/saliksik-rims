<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h2>Concept Note Submissions</h2>
            <p class="caption">
              Call for submission to start. Approve or reject submitted concept
              note. Click on the concept note, on the left, to see overview.
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <v-btn type="submit" class="button-regular">
            <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
            Submission
          </v-btn>
        </div>
      </v-card-title>

      <!--tab container-->
      <v-card-text elevation="5" class="content">
        <v-card elevation="5" class="">
          <v-tabs v-model="tab" :items="tab_items" />
          <v-window v-model="tab" v-for="item in tab_items" :key="item">
            <v-window-item :value="item">
              <concept_note_submissions_table :research_data="filteredResearchData(item)" />
            </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>

  {{ JSON.stringify(filteredResearchData) }}
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import { ref, computed, onMounted } from "vue";

const research_data = ref([]);
const tab = ref(null);
const tab_items = ["Verify and Review", "Approval", "Approved", "Rejected"];

onMounted(() => {
  const researchStore = useResearchesStore();
  researchStore.getResearchList();
  research_data.value = researchStore.researchList;
});

const filteredResearchData: any = computed(() => {
  return (status: string) => {
    return research_data.value.filter(
      (item: any) => {
        console.log(item);
        item.conceptNote.status === status
      },
    );
  };
});
</script>
