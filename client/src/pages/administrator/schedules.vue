<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h5>Presentations</h5>

            <p class="caption">
              Create schedule, add research projects and assign panelist for
              title and final presentation.
            </p>
          </div>
        </div>

        <div class="header-right">
          <create_schedule_modal />
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="5" style="padding-bottom: 1rem">
          <v-tabs v-model="tab">
            <v-tab value="title">Title
              <template v-slot:append>
                <v-badge color="info" content="6" inline>
                  <v-tooltip activator="parent" location="top">
                    Previous Schedule
                  </v-tooltip>
                </v-badge>
                <v-badge color="warning" content="1" inline>
                  <v-tooltip activator="parent" location="top">
                    On Going Schedule
                  </v-tooltip>
                </v-badge>
              </template>
            </v-tab>
            <v-tab value="final">Final</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="title">
              <create_presentation_modal />
              <presentation_overview :presentation="presentation" />
            </v-window-item>
            <v-window-item value="final"> final </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import presentation from "@/assets/sample_presentation.json" with { type: "json" };
import { ref } from "vue";

const tab = ref("null");
</script>
