<template>
  <h2>Hi {{ user.first_name }} !</h2>

  <span>You have {{ user.researchCount }} researches</span>

  <Research_table :research="research"/>
</template>

<script setup lang="ts">
  import moment from 'moment';

  const user: { first_name: string; last_name: string; avatar: string, researchCount: number } = {
    first_name: 'Angelo',
    last_name: 'Jimenez',
    avatar: '',
    researchCount: 6
  };

  const research = [
    {research_title: "Test Title", research_leaders: 'Test 1, Test 2', research_status: 'A', createdAt: moment().format('LL') },
    {research_title: "Test 2", research_leaders: 'Test 1, Test 2', research_status: 'B', createdAt: moment().format('LL') },
    {research_title: "Test", research_leaders: 'Test 1, Test 2', research_status: 'C', createdAt: moment().format('LL') },
    {research_title: "Testasdfgh", research_leaders: 'Test 1, Test 2', research_status: 'A', createdAt: moment().format('LL') }
  ]



</script>

<style lang="scss"></style>
