<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h2>
              All Research Projects
              <v-chip  class="header-count">
                You have {{ research.length }} research projects
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
          <research_table :research="research" />
        </v-card>
      </v-card-text>
    </v-card>
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
<style lang="scss"></style>
