<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h5>Research Papers</h5>

            <p class="caption">
              Track and monitor uploaded research paper and progress.
            </p>
          </div>
        </div>

        <div class="header-right">
          <v-btn
            type="submit"
            flat
            prepend-icon="mdi-phone-outline"
            class="button-regular"
            >Call To Update
          </v-btn>

          <!-- <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn>  -->
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="5" style="padding-bottom: 1rem">
          <div class="d-flex flex-row">
            <v-tabs v-model="tab" direction="vertical">
              <v-tab value="current">Current </v-tab>
              <v-tab value="all">All</v-tab>
            </v-tabs>
            <v-window v-model="tab" style="width: 100%;">
              <v-window-item value="current"> 
                <research_paper_preview/>

              </v-window-item>
              <v-window-item value="all"> all </v-window-item>
            </v-window>
          </div>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tab = ref("null");
</script>
