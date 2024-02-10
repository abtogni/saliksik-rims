<template>
  <v-container fluid class="nav-ctr pa-0">
    <v-card elevation="1" class="nav-body">
      <div class="nav-left truncate">
        <v-icon start icon="mdi-folder-open-outline"></v-icon>
        <h6 class="truncate">
          Streamlining Outcome-Based Education and Continuous Quality
          Improvement of University of Nueva Caceres through Technology: A
          Information Management System for Improving Inclusiveness Streamlining
          Outcome-Based Education and Continuous Quality Improvement of
          University of Nueva Caceres through Technology: A Information
          Management System for Improving Inclusiveness
        </h6>
      </div>

      <div class="nav-right">
        <v-chip color="primary" class="status-txt"> No Status </v-chip>
        <v-btn variant="text" icon="mdi-dots-horizontal"> </v-btn>
      </div>
    </v-card>
  </v-container>
  <v-container fluid class="fill-height ctr">
    <v-card class="body">
      <div class="d-flex flex-row">
        <v-tabs v-model="tab" direction="vertical" color="primary">
          <v-tab value="option-2">
            <v-icon start icon="mdi-file-document-outline"> </v-icon>
            Concept Note
          </v-tab>
          <v-tab value="option-1">
            <v-icon start icon="mdi-calendar-month-outline"> </v-icon>
            Title Presentation
          </v-tab>
          <v-tab value="option-3">
            <v-icon start icon="mdi-file-document-outline"></v-icon>
            Research Paper Progress
          </v-tab>
          <v-tab value="option-4">
            <v-icon start icon="mdi-calendar-month-outline"></v-icon>
            Final Presentation
          </v-tab>
          <v-tab value="option-5">
            <v-icon start icon="mdi-currency-php"></v-icon>
            Incentive
          </v-tab>
        </v-tabs>
        <v-window v-model="tab" style="width: 100%">
          <v-window-item value="option-2">
            <concept_note_tab />
          </v-window-item>
          <v-window-item value="option-1">
            <title_presentation_tab/>
          </v-window-item>
          <v-window-item value="option-3">
            <v-card flat>
              <v-card-text>
                <p>
                  Fusce a quam. Phasellus nec sem in justo pellentesque
                  facilisis. Nam eget dui. Proin viverra, ligula sit amet
                  ultrices semper, ligula arcu tristique sapien, a accumsan nisi
                  mauris ac eros. In dui magna, posuere eget, vestibulum et,
                  tempor auctor, justo.
                </p>

                <p class="mb-0">
                  Cras sagittis. Phasellus nec sem in justo pellentesque
                  facilisis. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Donec quam felis, ultricies nec, pellentesque eu,
                  pretium quis, sem. Nam at tortor in tellus interdum sagittis.
                </p>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>
      </div>
    </v-card>
  </v-container>
</template>

<script lang="ts">

export default {
    data: () => ({
        tab: "option-1",
    }),
};
</script>
