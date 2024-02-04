<template>
  <h2>Hi {{ user.first_name }} !</h2>

  <span>You have {{ user.researchCount }} researches</span>

  <Research_table />
</template>

<script setup lang="ts">
  const user: { first_name: string; last_name: string; avatar: string, researchCount: number } = {
    first_name: 'Angelo',
    last_name: 'Jimenez',
    avatar: '',
    researchCount: 6
  };

user.avatar = user.first_name.charAt(0) + user.last_name.charAt(0);
</script>

<style lang="scss"></style>
