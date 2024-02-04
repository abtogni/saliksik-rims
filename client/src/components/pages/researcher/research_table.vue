<template>
  <div>
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
    <v-btn @click="toggleFilter" class="button-regular" id="filter-button">
      <v-icon icon="mdi-filter-outline"/>
      Filter
    </v-btn>

    <v-sheet :elevation="5" id="filter_dropdown" v-show="filter_dropdown" style="position: absolute;">
      <v-checkbox
        v-for="status in statuses"
        :key="status"
        :label="status"
        v-model="statusFilters[status]"
        dense
      />
    </v-sheet>

    <v-data-table
      :headers="headers"
      :items="filteredResearch"
      :search="search"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const statusFilters = ref<{ [key: string]: boolean }>({});
const statuses = ['A', 'B', 'C', 'D'];
const { research }: any = defineProps(['research']);
const headers = [
  { key: 'research_title', title: 'Research Title' },
  { key: 'research_leaders', title: 'Research Leaders', sortable: false },
  { key: 'research_status', title: 'Research Status' },
  { key: 'createdAt', title: 'Created At' },
];
const filter_dropdown = ref(false);
const search = ref('');

const toggleFilter = () => filter_dropdown.value = !filter_dropdown.value;

const filteredResearch = computed(() => {
  const activeFilters = Object.values(statusFilters.value).some(filter => filter);

  if (!activeFilters) {
    return research;
  }

  return research.filter((item: any) => statusFilters.value[item.research_status]);
});
</script>
