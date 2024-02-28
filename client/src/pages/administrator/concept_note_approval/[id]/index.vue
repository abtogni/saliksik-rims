<template>
  <div class="container">
    <div class="row_container">
      <div class="column_container">
        <v-card title="Implementing Agency/Department" :text="c.implementing_agency" style="width: 100%" />
        <v-card title="Cooperating Agency" :text="c.cooperating_agency" style="width: 100%" />
        <v-card title="Site/s of Implementation" :text="c.site_of_implementation" style="width: 100%" />
      </div>
      <div class="column_container">
        <v-card title="Project Duration" :text="c.project_duration" style="width: 100%" />
        <v-card title="Total Cost" :text="c.total_project_cost" style="width: 100%" />
        <v-card title="Funding Source" :text="c.funding_source" style="width: 100%" />
      </div>
    </div>
    <div class="column_container" style="padding-bottom: 10rem">
      <v-card variant="flat" color="blue" title="Project Description" :text="c.project_description" style="width: 100%" />
      <v-card title="Significance" :text="c.significance" style="width: 100%" />
      <v-card title="Objectives" :text="c.objectives" style="width: 100%" />
      <v-card elevation="3" title="Methodology" :text="c.methodology" style="width: 100%" />
      <v-card title="Technology Roadmap" :text="c.technology_roadmap" style="width: 100%" />
      <v-card title="Expected Outputs (6Ps)" :text="c.expected_outputs" style="width: 100%" />
      <v-card title="Work Plan" :text="c.work_plan" style="width: 100%" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const c = ref('');
</script>
