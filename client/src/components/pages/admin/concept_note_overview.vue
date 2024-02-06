<template>
  <div class="container" v-for="c in concept_note">
    <div class="row_container" >
      <div class="column_container" >
        <v-card
          elevation="3"
          title="Implementing Agency/Department"
          :text="c.researchTitle"
          style="width: 100%"
        ></v-card>
        <v-card
          elevation="3"
          title="Cooperating Agency"
          text="..."
          style="width: 100%"
        ></v-card>
        <v-card
          elevation="3"
          title="Site/s of Implementation"
          text="..."
          style="width: 100%"
        ></v-card>
      </div>
      <div class="column_container">
        <v-card
          elevation="3"
          title="Project Duration"
          text="..."
          style="width: 100%"
        ></v-card>
        <v-card
          elevation="3"
          title="Total Cost"
          text="..."
          style="width: 100%"
        ></v-card>
        <v-card
          elevation="3"
          title="Funding Source"
          text="..."
          style="width: 100%"
        ></v-card>
      </div>
    </div>
    <div class="column_container" style="padding-bottom: 1rem">
      <v-card
        elevation="3"
        title="Project Description"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Significance"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Objectives"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Methodology"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Technology Rodamap"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Expected Outputs (6Ps)"
        text="..."
        style="width: 100%"
      ></v-card>
      <v-card
        elevation="3"
        title="Work Plan"
        text="concept_note.leaders"
        style="width: 100%"
      ></v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
const concept_note = [{
    researchTitle:'Sample'
  }]

</script>
