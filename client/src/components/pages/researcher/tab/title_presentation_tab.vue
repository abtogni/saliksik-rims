<template>
  <title_presentation_overview/>  
  <v-card flat style="padding-top: 0rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Previous Schedule</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >View previous schedules.
            </v-tooltip>
          </p>
        </div>
      </div>

      <div class="header-right">
        <!-- <v-btn
          type="submit"
          flat
          prepend-icon="mdi-file-document-plus-outline"
          class="button-regular"
          >Create Concept Note
        </v-btn>
        <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-file-document-edit-outline"
          class="button-outlined"
          >Edit Concept Note
        </v-btn> -->
      </div>
    </v-card-title>
    <v-card-text>
      <v-card flat class="overview-ctr">
        <v-card variant="outlined" class="card-style">
          <v-expansion-panels>
            <v-expansion-panel title="Insert date and time and location" class="p-reg b">
              <v-expansion-panel-text>
              <title_presentation_overview/>  
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-card>
    </v-card-text>
  </v-card>
</template>
