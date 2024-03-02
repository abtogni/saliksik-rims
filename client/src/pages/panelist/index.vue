<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge  color="primary" prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content">
              <h5 style="margin-right: 0.5rem">Panelist Dashboard</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                Check, track and manage your presentation schedules here.
              </v-tooltip>
            </p>
          </div>
        </div>
        <div class="header-right">
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-card elevation="0" variant="flat" style="padding-bottom: 1rem">
          <v-tabs v-model="tab" color="primary">
            <v-tab value="current">Current
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
            <v-tab value="previous">Previous</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="current">
              <panelist_comments_schedule_overview/>
            </v-window-item>
            <v-window-item value="previous"> Previous </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const tab = ref("null");
</script>
