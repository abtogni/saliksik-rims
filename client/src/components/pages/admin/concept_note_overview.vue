<template>
  <div class="container" :key="c._id" v-for="c in concept_note">
    <div class="row_container" >
      <div class="column_container" >
        <v-card
          elevation="3"
          title="Implementing Agency/Department"
          :text="c.implementing_agency"
          style="width: 100%"
        />
        <v-card
          elevation="3"
          title="Cooperating Agency"
          :text="c.cooperating_agency"
          style="width: 100%"
        />
        <v-card
          elevation="3"
          title="Site/s of Implementation"
          :text="c.site_of_implementation"
          style="width: 100%"
        />
      </div>
      <div class="column_container">
        <v-card
          elevation="3"
          title="Project Duration"
          :text="c.project_duration"
          style="width: 100%"
        />
        <v-card
          elevation="3"
          title="Total Cost"
          :text="c.total_project_cost"
          style="width: 100%"
        />
        <v-card
          elevation="3"
          title="Funding Source"
          :text="c.funding_source"
          style="width: 100%"
        />
      </div>
    </div>
    <div class="column_container" style="padding-bottom: 1rem">
      <v-card
        elevation="3"
        title="Project Description"
        :text="c.project_description"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Significance"
        :text="c.significance"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Objectives"
        :text="c.objectives"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Methodology"
        :text="c.methodology"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Technology Rodamap"
        :text="c.technology_roadmap"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Expected Outputs (6Ps)"
        :text="c.expected_outputs"
        style="width: 100%"
      />
      <v-card
        elevation="3"
        title="Work Plan"
        :text="c.work_plan"
        style="width: 100%"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import concept_note from '@/assets/sample_concept_note.json' with {type: 'json'}

  console.log(concept_note);
</script>
