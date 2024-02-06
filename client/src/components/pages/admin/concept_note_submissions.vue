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
          key: "submitted_in",
          align: "start",
          width: "13rem",
        },
      ]
    const concept_note = [
      {
        research_title:
          "Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness",
        leaders: ["Agnes Reyes", "June Arreb Danila", "Danny Casimero", "Dennis Ignacio"],
        status: "No Status",
        submitted_in: "Insert Date of submission",
      },
      {
        research_title: "test",
        leaders: ["Agnes Reyes", "June Arreb Danila", "Danny Casimero", "Dennis Ignacio"],
        status: "No Status",
        submitted_in: "Insert Date of submission",
      },
    ];

    const formattedConceptNote = concept_note.map(item => ({
      ...item,
      leaders: item.leaders.join(', '),
    }));
</script>
