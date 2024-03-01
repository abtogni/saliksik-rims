<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge
              :content="researches.length"
              color="primary"
              prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content"
            >
              <h5 style="margin-right: 0.5rem">Research Projects</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                View and manage your research projects here. Create new research
                project to start.
              </v-tooltip>
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <create_research_project_modal />
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="0">
          <research_table :research="researches" />
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import { onMounted, ref } from "vue";

const researchStore = useResearchesStore();
const researches = ref([]);

onMounted(async () => {
  await researchStore.getUserResearches();
  researches.value = researchStore.userResearchList;
});
</script>
