<template>
  <v-card>
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
        density="compact"
      ></v-text-field>
    </template>
    <v-data-table
      v-model:expanded="expanded"
      :headers="concept_note_header"

      :items="formattedConceptNote"
      :search="search"
      item-value="research_title"
      show-expand
      class="table"
    >
      <template v-slot:expanded-row="{ columns }">
        <tr>
          <td :colspan="columns.length">
            <concept_note_overview/>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
  import concept_note from '@/assets/sample_research_data.json' with {type: 'json'}
  const search = ref('');
  const expanded = ref([]);
  const concept_note_header: readonly { title: any, key: any, align?: any, width?: any}[] = [
        { title: "Leaders", key: "leaders" },
        {
          title: "Title",
          key: "research_title",
          align: "start",
          width: "65rem",
        },
        { title: "Status", key: "status", align: "start", width: "7rem" },
        {
          title: "Submitted In",
          key: "created_at",
          align: "start",
          width: "13rem",
        },
      ]

    const formattedConceptNote = concept_note.map(item => ({
      ...item,
      leaders: item.research_members.join(', '),
    }));
</script>
