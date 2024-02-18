<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h2>
              All Research Projects
              <v-chip class="header-count">
                You have {{ researches.length }} research projects
              </v-chip>
            </h2>

            <p class="caption">
              Create new research project to start. View and manage your
              research projects here.
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <create_research_project_modal />
        </div>
      </v-card-title>
      <v-card-text elevation="5" class="content">
        <v-card elevation="5">
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
})

</script>
<style lang="scss"></style>
