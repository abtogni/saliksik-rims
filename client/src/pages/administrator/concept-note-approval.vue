<template>
  <v-container fluid>
    <v-row no gutters class="header-container">
      <v-col>
        <v-row no-gutters class="pageName-container">
          <h2>Concept Note Submissions</h2>
          <p class="caption">
            Call for submission to start. Approve or reject submitted concept
            note. Click on the concept note, on the left, to see overview.
          </p>
        </v-row>
      </v-col>
      <v-col cols="4" class="cta-container">
        <v-btn type="submit" class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
          Submission
        </v-btn>
      </v-col>
    </v-row>

    <!--tab container-->
    <v-card elevation="5" class="">
      <v-tabs v-model="tab" :items="tab_items" />

      <v-card-text style="">
        <v-window v-model="tab">
          <!-- BEGIN: Concept Note (Reviewing) -->
          <v-window-item value="Concept Note (Reviewing)">
            <concept_note_submissions
              :research_data="filteredResearchData('Concept Note (Reviewing)')"
            />
          </v-window-item>
          <!-- END: Concept Note (Reviewing) -->

          <!-- BEGIN: Concept Note (Approved) -->
          <v-window-item value="Concept Note (Approved)">
            <concept_note_submissions
              :research_data="filteredResearchData('Concept Note (Approved)')"
            />
          </v-window-item>
          <!-- END: Concept Note (Approved) -->

          <!-- BEGIN: Concept Note (Rejected) -->
          <v-window-item value="Concept Note (Rejected)">
            <concept_note_submissions
              :research_data="filteredResearchData('Concept Note (Rejected)')"
            />
          </v-window-item>
          <!-- END: Concept Note (Rejected) -->
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import research_data from '@/assets/sample_research_data.json' with { type: 'json' };

const tab = ref(null);
const tab_items = ['Concept Note (Reviewing)', 'Concept Note (Approved)', 'Concept Note (Rejected)', 'Summary'];

const filteredResearchData: any = computed(() => {
  return (status: string) => {
    return research_data.filter(item => item.research_status === status);
  };
});
</script>
