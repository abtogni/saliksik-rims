<template>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
      />


    <v-data-table
      :headers="headers"
      :items="research"
      :search="search"
    />

</template>

<script setup lang="ts">
import { ref } from 'vue';

  const { research }: any = defineProps(['research']);
  const headers = [
    {key: 'research_title', title: 'Research Title'},
    {key: 'research_leaders', title: 'Research Leaders', sortable: false},
    {key: 'research_status', title: 'Research Status'},
    {key: 'createdAt', title: 'Created At'},
  ]

  const search = ref('');
</script>

<style lang="scss"></style>
