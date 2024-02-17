<template>
  <v-container fluid class="fill-height body pa-0">
    <v-row no gutters class="table-body">
      <v-row no-gutters class="table-header-row">
        <v-col class="col-start" style="background-color: red;">
          <div class="header">
            <h2>All Research Projects</h2>
            <v-chip color="primary" class="header-count"> You have {{ research.researchCount }} research projects
            </v-chip>
          </div>
          <v-row no-gutters>
            <h2 class="caption">
              Create new research project to start. View and manage your
              research projects here.
            </h2>
          </v-row>
        </v-col>
        <!--cta container-->
        <v-col class="col-end">
          <create_research_project_modal />
        </v-col>
      </v-row>
      <v-card class="table-card">
        <research_table :research="researchList" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import { onMounted, ref } from "vue";

const researchList = ref([]);
const research = useResearchesStore();

onMounted(async () => {
  await research.getResearchList();
  researchList.value = research.researchList;
})

</script>
<style lang="scss"></style>
