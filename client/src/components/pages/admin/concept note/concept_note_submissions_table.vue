<template>
  <div style="padding-bottom: 0.833rem">
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
    </v-row>
    <v-data-table
      v-model:expanded="expanded"
      :headers="concept_note_header"
      :items="formattedConceptNote"
      :search="search"
      item-value="research_title"
      show-expand
      class="table"
    >
      <!-- @vue-skip -->
      <template v-slot:item="{ item: concept_note }">
        <tr
          style="
            text-transform: capitalize;
            font-weight: 400;
            color: #6b7280;
            font-size: 1rem; 
          "
        >
          <td >
            <span 
              v-for="(leader, index) in concept_note.research_members"
              :key="index"
            >
              {{ leader }}
              <template
                v-if="index !== concept_note.research_members.length - 1"
                >,
              </template>
            </span>
          </td>
          <td >
            <a href="%">{{ concept_note.research_title }}</a>
          </td>

          <td>
            <v-chip variant="tonal" color="primary">{{
              concept_note.research_status
            }}</v-chip>
          </td>
          <td>{{ concept_note.created_at }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const search = ref("");
const expanded = ref([]);

const props = defineProps(["research_data"]);

const concept_note_header: readonly {
  title: any;
  key: any;
  align?: any;
  width?: any;
}[] = [
  { title: "Leaders", key: "leaders", width: "10%", },
  {
    title: "Title",
    key: "research_title",
    align: "start",
    width: "60%",
  },
  { title: "Status", key: "research_status", align: "start", width: "20%" },
  {
    title: "Submitted In",
    key: "created_at",
    align: "start",
    width: "120%",
  },
];

const formattedConceptNote = props.research_data.map((item: any) => ({
  ...item,
  leaders: item.research_members.join(", "),
}));
</script>
