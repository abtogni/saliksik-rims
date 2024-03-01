<template>
  <div style="padding-bottom: 0.833rem">
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
        <tr style="align-items:center; white-space: nowrap">
          <td class="truncate-table">
            <v-btn
              variant="text"
              density="comfortable"
              icon="mdi-account-multiple-outline"
              style="margin-right: 1rem"
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
              <a class="" :href="'/researcher/' + research._id">{{
                research.researchTitle
              }}</a>
              
          </td>
          <td >
            <v-chip variant="text" color="" density="compact" prepend-icon="mdi-file-document-outline" class="b">{{
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
  { key: "researchTitle", title: "Title" },
  { key: "researchStatus", title: "Status"},
  { key: "createdAt", title: "Created At" },
];
</script>
