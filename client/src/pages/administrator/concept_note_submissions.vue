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
          <!-- Concept Note (Reviewing) -->
          <v-window-item value="For Review">
            <concept_note_submissions_table :research_data="filteredResearchData('For Review')" />
          </v-window-item>

          <!-- Concept Note (Approval) -->
          <v-window-item value="Approval">
            <concept_note_submissions_table :research_data="filteredResearchData('Approval')" />
          </v-window-item>

          <!-- Concept Note (Approved) -->
          <v-window-item value="Approved">
            <concept_note_submissions_table :research_data="filteredResearchData('Approved')" />
          </v-window-item>

          <!-- Concept Note (Rejected) -->
          <v-window-item value="Rejected">
            <concept_note_submissions_table :research_data="filteredResearchData('Rejected')" />
          </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import research_data from '@/assets/sample_research_data.json' with { type: 'json' };

const tab = ref(null);
const tab_items = ['For Review', 'Approval', 'Approved', 'Rejected',];

const filteredResearchData: any = computed(() => {
  return (status: string) => {
    return research_data.filter(item => item.research_status === `Concept Note (${status})`);
  };
});
</script>
