<template>
  <div style="padding-bottom: .833rem;">
    <v-row no-gutters class="table-toolbar">
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
      <v-btn
        @click="toggleFilter"
        variant="outlined"
        class="button-regular"
        id="filter-button"
      >
        <v-icon icon="mdi-filter-outline" />
        Filter
      </v-btn>

      <v-sheet
        :elevation="5"
        id="filter_dropdown"
        v-show="filter_dropdown"
        style="position: absolute"
      >
        <v-checkbox
          v-for="status in statuses"
          :key="status"
          :label="status"
          v-model="statusFilters[status]"
          dense
        />
      </v-sheet>
    </v-row>
    <v-data-table
      :headers="headers"
      :items-length="filteredResearch.length"
      :items="filteredResearch"
      :search="search"
      density="comfortable"
      style="
        text-transform: uppercase;
        font-weight: 600;
        color: #374151;
        font-size: 1rem;
      "
    >
      <!-- @vue-skip -->
      <template v-slot:item="{ item: research }">
        <tr
          style="
            text-transform: capitalize;
            font-weight: 400;
            color: #6b7280;
            font-size: 1rem;
          "
        >
          <td>
            <a :href="'/researcher/' + research._id">{{
              research.research_title
            }}</a>
          </td>
          <td>{{ research.research_leaders }}</td>
          <td>
            <v-chip variant="tonal" color="primary">{{
              research.research_status
            }}</v-chip>
          </td>
          <td>{{ research.createdAt }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const statusFilters = ref<{ [key: string]: boolean }>({});

const statuses = ["A", "B", "C", "D"];
const { research }: any = defineProps(["research"]);
const headers = [
  { key: "research_title", title: "Research Title" },
  { key: "research_leaders", title: "Research Leaders", sortable: false },
  { key: "research_status", title: "Research Status" },
  { key: "createdAt", title: "Created At" },
];
const filter_dropdown = ref(false);
const search = ref("");

const toggleFilter = () => (filter_dropdown.value = !filter_dropdown.value);

const filteredResearch = computed(() => {
  const activeFilters = Object.values(statusFilters.value).some(
    (filter) => filter
  );

  if (!activeFilters) {
    return research;
  }
  return research.filter(
    (item: any) => statusFilters.value[item.research_status]
  );
});
</script>
