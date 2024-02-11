<template>
  <v-container fluid class="fill-height body pa-0">
    <v-row no gutters class="table-body">
      <v-row no-gutters class="table-header-row">
        <v-col class="col-start" style="background-color: red;">
          <div class="header">
            <h2>All Research Projects</h2>
            <v-chip color="primary" class="header-count"> You have {{ research.length }} research projects </v-chip>
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
          <v-btn type="submit" variant="tonal" class="button-regular">
            <v-icon start icon="mdi-folder-plus-outline"></v-icon> Create
            Research Project
          </v-btn>
        </v-col>
      </v-row>
      <v-card class="table-card">
        <research_table :research="research" />
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import moment from "moment";

const research = [
  {
    _id: 1,
    research_title: "Test Title",
    research_leaders: "Test 1, Test 2",
    research_status: "No Status",
    createdAt: moment().format("LL"),
  },
  {
    _id: 2,
    research_title: "Test 2",
    research_leaders: "Test 1, Test 2",
    research_status: "Approval",
    createdAt: moment().format("LL"),
  },
  {
    _id: 3,
    research_title: "Test",
    research_leaders: "Test 1, Test 2",
    research_status: "Reviewing",
    createdAt: moment().format("LL"),
  },
  {
    _id: 4,
    research_title: "Testasdfgh",
    research_leaders: "Test 1, Test 2",
    research_status: "Initial Presentation",
    createdAt: moment().format("LL"),
  },
];
</script>
<style lang="scss">

</style>
