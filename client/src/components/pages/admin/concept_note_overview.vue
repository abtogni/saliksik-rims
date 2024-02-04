<template>
  <div class="container">
    <div class="row_container">
      <div class="column_container">
        <v-card
          elevation="3"
          title="Implementing Agency/Department"
          text="..."
          style="width: 100%"
        ></v-card>
        <v-card
          elevation="3"
          title="Coopearting Agency"
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
        text="..."
        style="width: 100%"
      ></v-card>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
      expanded: [],
      concept_note_header: [
        { title: "Leaders", key: "leaders" },
        {
          title: "Title",
          key: "research_title",
          align: "start",
          width: "65rem",
        },
        { title: "Status", key: "status", align: "start", width: "7rem" },
        {
          title: "Submitted In",
          key: "submitted_in",
          align: "start",
          width: "13rem",
        },
      ],
      concept_note: [
        {
          research_title:
            "Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness",
          leaders: "Agnes Reyes June Areb DanilaDanny CasimeroDennis Ignacio",
          status: "No Status",
          submitted_in: "Insert Date of submission",
        },
        {
          research_title: "test",
          leaders: "Agnes Reyes June Areb Danila Danny Casimero Dennis Ignacio",
          status: "No Status",
          submitted_in: "Insert Date of submission",
        },
      ],
    };
  },
};
</script>
