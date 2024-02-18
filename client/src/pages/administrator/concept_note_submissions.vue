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
            <v-window v-model="tab">
              <!-- Concept Note (Reviewing) -->
              <v-window-item value="For Review">
                <concept_note_submissions_table
                  :research_data="filteredResearchData('For Review')"
                />
              </v-window-item>

              <!-- Concept Note (Approval) -->
              <v-window-item value="Approval">
                <concept_note_submissions_table
                  :research_data="filteredResearchData('Approval')"
                />
              </v-window-item>

              <!-- Concept Note (Approved) -->
              <v-window-item value="Approved">
                <concept_note_submissions_table
                  :research_data="filteredResearchData('Approved')"
                />
              </v-window-item>

              <!-- Concept Note (Rejected) -->
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
import { ref, computed } from "vue";
import research_data from "@/assets/sample_research_data.json" with { type: "json" };

const tab = ref(null);
const tab_items = ["For Review", "Approval", "Approved", "Rejected"];

const filteredResearchData: any = computed(() => {
  return (status: string) => {
    return research_data.filter(
      (item) => item.research_status === `Concept Note (${status})`,
    );
  };
});
</script>
