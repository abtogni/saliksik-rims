
<template>
  <v-card>
    <template v-slot:text>
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" single-line variant="outlined"
        hide-details density="compact" />
    </template>
    <v-data-table v-model:expanded="expanded" :headers="concept_note_header" :items="formattedConceptNote"
      :search="search" item-value="research_title" show-expand class="table">
      <template v-slot:expanded-row="{ columns, item }">
        <tr>
          <td :colspan="columns.length">
            <!-- @vue-ignore -->
            <concept_note_overview :c="item.concept_note" />
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const search = ref('');
const expanded = ref([]);

const props = defineProps(['research_data']);


const concept_note_header: readonly { title: any, key: any, align?: any, width?: any }[] = [
  { title: "Leaders", key: "leaders" },
  {
    title: "Title",
    key: "research_title",
    align: "start",
    width: "65rem",
  },
  { title: "Status", key: "research_status", align: "start", width: "7rem" },
  {
    title: "Submitted In",
    key: "created_at",
    align: "start",
    width: "13rem",
  },
]

const formattedConceptNote = props.research_data.map((item: any) => ({
  ...item,
  leaders: item.research_members.join(', '),
}));
</script>
