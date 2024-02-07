<template>

  <div id="research_table">
    <v-row no gutters class="header-container">
      <!--page name container-->
      <v-col>
        <!--pageName-cap container-->
        <v-row no-gutters class="pageName-container">
          <h2>All Researches</h2>
          <h4>You have {{ research.length }} researches</h4>
          <p class="caption">
            Create new research to start. View and manage your researches here.
          </p>
        </v-row>
      </v-col>
      <!--cta container-->
      <v-col cols="4" class="cta-container">
        <!--cta call for submission-->
        <create_research_modal />
      </v-col>
    </v-row>


    <research_table  :research="research"/>
  </div>
</template>

<script setup lang="ts">
  import moment from 'moment';

  const research = [
    { _id: 1,research_title: "Test Title", research_leaders: 'Test 1, Test 2', research_status: 'A', createdAt: moment().format('LL') },
    {_id: 2, research_title: "Test 2", research_leaders: 'Test 1, Test 2', research_status: 'B', createdAt: moment().format('LL') },
    {_id: 3, research_title: "Test", research_leaders: 'Test 1, Test 2', research_status: 'C', createdAt: moment().format('LL') },
    {_id: 4, research_title: "Testasdfgh", research_leaders: 'Test 1, Test 2', research_status: 'A', createdAt: moment().format('LL') }
  ];



</script>

