<template>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
        density="compact"
        class="search_bar"
      />
      <v-btn @click="toggleFilter" id="filter-button">
        <v-icon icon="mdi-filter-outline"/>
         Filter
      </v-btn>

        <v-combobox
          v-model="select"
          :items="statuses"
          label="Filter Research Status"
          multiple
          chips
        />


    <v-data-table
      :headers="headers"
      :items="research"
      :search="search"
    />

</template>

<script setup lang="ts">
import { ref } from 'vue';

  const select = ref([]);
  const statuses = ['A', 'B', 'C', 'D'];
  const { research }: any = defineProps(['research']);
  const headers = [
    {key: 'research_title', title: 'Research Title'},
    {key: 'research_leaders', title: 'Research Leaders', sortable: false},
    {key: 'research_status', title: 'Research Status'},
    {key: 'createdAt', title: 'Created At'},
  ]
  const filter_dropdown: any = ref(false);

  const toggleFilter = () => filter_dropdown.value = !filter_dropdown.value;

  const search = ref('');
</script>

<style lang="scss"></style>
