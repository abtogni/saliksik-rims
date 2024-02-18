<template>
  <div style="padding-bottom: .833rem;">
    <v-row no-gutters class="table-toolbar">
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
        hide-details density="compact" class="search_bar" />
    </v-row>
    <v-data-table :headers="headers" :items-length="research.length" :items="research" :search="search"
      density="comfortable" style="
        text-transform: uppercase;
        font-weight: 600;
        color: #374151;
        font-size: 1rem;
      ">
      <!-- @vue-skip -->
      <template v-slot:item="{ item: research }">
        <tr style="
            text-transform: capitalize;
            font-weight: 400;
            color: #6b7280;
            font-size: 1rem;
          ">
          <td>
            <a :href="'/researcher/' + research._id">{{
              research.researchTitle
              }}</a>
          </td>
          <td>
            <span v-for="(leader, index) in research.researchLeaders" :key="index">
              {{ leader.name }}
              <template v-if="index !== research.researchLeaders.length - 1">, </template>
            </span>
          </td>
          <td>
            <v-chip variant="tonal" color="primary">{{
              research.researchStatus
              }}</v-chip>
          </td>
          <td>{{ research.createdAt }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
const { research }: any = defineProps(["research"]);
const headers = [
  { key: "researchTitle", title: "Research Title" },
  { key: "researchLeaders", title: "Research Leaders", sortable: false },
  { key: "researchStatus", title: "Research Status" },
  { key: "createdAt", title: "Created At"},
];


</script>
