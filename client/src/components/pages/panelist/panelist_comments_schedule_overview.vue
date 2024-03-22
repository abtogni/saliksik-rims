<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="title expansion-title-body b">
              <v-btn variant="text" icon="mdi-note-outline">
                <v-badge color="info" floating >
                  <v-icon></v-icon>
                </v-badge>

                <v-tooltip activator="parent" location="bottom" class="tooltip-list">
                  <div class="bold-upper">Research Projects</div>
                </v-tooltip>
              </v-btn>
              <span class="expansion-title-left truncate">
                  {{ moment(schedule.dateAndTime).format('MMMM D YYYY, h:mm A') }} <span class="p-reg b" >|</span>
                  {{ schedule.location }}
              </span>
              <span class="expansion-title-right">
                <v-chip color="primary" class="b">{{ moment(schedule.createdIn).format('MMMM D YYYY, h:mm A') }}
                  <v-tooltip activator="parent" location="bottom">Created In
                  </v-tooltip>
                </v-chip>
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card flat class="body">
                <v-card-title flat class="header">
                  <!-- <div class="header-left truncate">
                    <div class="header-caption-ctr">
                      <h5>{{ moment(schedule.dateAndTime).format('MMMM D YYYY, h:mm A') }} · {{ schedule.location }}
                      </h5>
                    </div>
                  </div> -->

                  <div class="header-right">
                  </div>
                </v-card-title>
              </v-card>
              <panelist_comments_researches :presentations="schedule.presentations" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from 'moment';
const { schedule, researchList } = defineProps(['schedule', 'researchList']);
</script>
