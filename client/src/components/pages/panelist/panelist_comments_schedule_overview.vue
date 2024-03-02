<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <!-- <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption">
          <h6>asdas</h6>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> --
        </div>
      </div>
    </v-card-title> -->
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="title expansion-title-body b">
              <v-btn variant="text" icon="mdi-note-outline">
                <v-badge color="info" floating>
                  <v-icon></v-icon>
                </v-badge>

                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Research Projects</div>
                  <div></div>
                </v-tooltip>
              </v-btn>
              <span class="expansion-title-left truncate">
                <span class="truncate"> Date and Time </span>
                <span class="truncate"> | </span>
                <span class="truncate"> Location </span>
              </span>
              <span class="expansion-title-right">
                <panelist_schedule_accept/>
                <panelist_schedule_decline/>
                <v-chip color="primary" class="b"
                  >CreatedIn
                  <v-tooltip activator="parent" location="bottom"
                    >Created In
                  </v-tooltip>
                </v-chip>
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card flat class="body">
                <v-card-title flat class="header">
                  <div class="header-left truncate">
                    <div class="header-caption-ctr">
                      <h5>Date and Time · Location</h5>
                    </div>
                  </div>

                  <div class="header-right">
                  </div>
                </v-card-title>


              </v-card>
              <panelist_comments_schedule_researches_preview   />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-card-text>
  </v-card>
  
</template>

<script setup lang="ts">
</script>
