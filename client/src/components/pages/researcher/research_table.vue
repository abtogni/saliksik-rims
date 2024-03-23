<template>
  <v-row no-gutters class="tbl-toolbar">
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
  </v-row>
  <v-data-table
    :headers="headers"
    :items-length="research.length"
    :items="research"
    :search="search"
    density="comfortable"
    class="b"
  >
    <!-- @vue-skip -->
    <template v-slot:item="{ item: research }">
      <tr style="align-items: center; white-space: nowrap">
        <td class="truncate-table">
          <v-btn
            variant="text"
            density="default"
            icon="mdi-account-multiple-outline"
            style="margin-right: .5rem"
          >
            <v-icon></v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              class="tooltip-list"
            >
              <div class="bold-upper">Researchers</div>
              <div
                v-for="(leader, index) in research.researchLeaders"
                :key="index"
              >
                {{ leader.name }}
              </div>
            </v-tooltip>
          </v-btn>
          <a :href="'/researcher/' + research._id" class="p-reg b truncate">{{
            research.researchTitle
          }}</a>
        </td>
        <td>
          <v-chip
            variant="outlined"
            density="default"
            class="button-outlined b"
            >{{ research.researchStatus }}</v-chip
          >
        </td>
        <td class="p-reg b">{{ research.createdAt }}</td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
const { research }: any = defineProps(["research"]);
const headers = [
  { key: "researchTitle", title: "Title" },
  { key: "researchStatus", title: "Status" },
  { key: "createdAt", title: "Created At" },
];
</script>
