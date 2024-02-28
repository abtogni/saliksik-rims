<template>
  <!-- @vue-skip -->
  <div class="container" v-if="c">
    <div class="row_container">
      <div class="column_container">
        <v-card title="Implementing Agency/Department" :text="c.conceptNote.implementingAgency" style="width: 100%" />
        <v-card title="Cooperating Agency" :text="c.conceptNote.cooperatingAgency" style="width: 100%" />
        <v-card title="Site/s of Implementation" :text="c.conceptNote.siteOfImplementation" style="width: 100%" />
      </div>
      <div class="column_container">
        <v-card title="Project Duration" :text="c.conceptNote.projectDuration" style="width: 100%" />
        <v-card title="Total Cost" :text="c.conceptNote.totalProjectCost" style="width: 100%" />
        <v-card title="Funding Source" :text="c.conceptNote.fundingSource" style="width: 100%" />
      </div>
    </div>
    <div class="column_container" style="padding-bottom: 10rem">
      <v-card variant="flat" color="blue" title="Project Description" :text="c.conceptNote.projectDescription"
        style="width: 100%" />
      <v-card title="Significance" :text="c.conceptNote.significance" style="width: 100%" />
      <v-card title="Objectives" :text="c.conceptNote.objectives" style="width: 100%" />
      <v-card elevation="3" title="Methodology" :text="c.conceptNote.methodology" style="width: 100%" />
      <v-card title="Technology Roadmap" :text="c.conceptNote.technologyRoadmap" style="width: 100%" />
      <v-card title="Expected Outputs (6Ps)" :text="c.conceptNote.expectedOutputs" style="width: 100%" />
      <v-card title="Work Plan" :text="c.conceptNote.workPlan" style="width: 100%" />
    </div>
  </div>
  <v-btn class="button-regular" text="Approve" />  <v-btn class="button-regular" text="Reject" />

</template>

<script setup lang="ts">
import { useResearchesStore } from '@/stores/researches';
import { onMounted, ref } from 'vue';

const c = ref(null);
const id = window.location.href.split("/").slice(-1)[0];


onMounted(async () => {
  const researchStore = useResearchesStore();
  await researchStore.getCurrentResearch(id);
  c.value = researchStore.currentResearch;
});

</script>
