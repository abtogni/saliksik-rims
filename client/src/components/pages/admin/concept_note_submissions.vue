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
      :items="concept_note"
      :search="search"
      item-value="research_title"
      show-expand
      class="table"
    >
      <template v-slot:expanded-row="{ columns, item}">
        <tr>
          <td :colspan="columns.length">
          <concept_note_overview/>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
export default {
  data() {
    return {
      search: "",
      expanded: [],
      concept_note_header: [
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
      ],
      concept_note: [
        {
          research_title:
            "Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness",
          leaders: "Agnes Reyes June Areb DanilaDanny CasimeroDennis Ignacio",
          status: "No Status",
          submitted_in: "Insert Date of submission",
        },
        {
          research_title: "test",
          leaders: "Agnes Reyes June Areb Danila Danny Casimero Dennis Ignacio",
          status: "No Status",
          submitted_in: "Insert Date of submission",
        },
      ],
    };
  },
};
</script>
