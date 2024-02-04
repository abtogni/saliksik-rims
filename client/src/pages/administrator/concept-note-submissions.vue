<template>
  <v-container fluid>
    <!--header container-->
    <v-row no gutters class="header-container">
      <!--page name container-->
      <v-col>
        <!--pageName-cap container-->
        <v-row no-gutters class="pageName-container">
          <h2>Concept Note Overview</h2>
          <p class="caption">View submitted concept note.</p>
        </v-row>
      </v-col>
      <!--cta container-->
      <v-col cols="4" class="cta-container">
        <!--cta call for submission-->
        <!-- <v-btn type="submit" class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Filter
        </v-btn> -->
      </v-col>
    </v-row>
    <v-card elevation="5" class="tab">
      <template v-slot:text>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
          hide-details
        ></v-text-field>
      </template>
      <v-data-table
        v-model:expanded="expanded"
        :headers="concept_note_header"
        :items="concept_note"
        :search="search"
        density="comfortable"
        item-value="research_title"
        show-expand
      >
        <template v-slot:expanded-row="{ columns, item }">
          <tr>
            <td :colspan="columns.length">
              More info about {{ item.research_title }}
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Bluetooth } from 'lucide-react';

export default {
  data() {
    return {
      search: "",
      expanded: [],
      concept_note_header: [
        { title: "Leaders", key: "leaders" },
        { title: "Title", key: "research_title", align: "start" },
        { title: "Submitted In", key: "submitted_in", align: "end"},
      ],
      concept_note: [
        {
          research_title:
            "Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness",
          leaders: "Agnes Reyes June Areb DanilaDanny CasimeroDennis Ignacio",
          submitted_in: "Insert Date of submission",
        },
        {
          research_title: "test",
          leaders: "Agnes Reyes June Areb DanilaDanny CasimeroDennis Ignacio",
          submitted_in: "Insert Date of submission",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import '../../styles/pages/tabs.scss';
</style>
