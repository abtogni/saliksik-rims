<template>
  <v-card flat style="padding-top: 0.833rem">
    <v-card flat class="header-body">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h5>
            Final Presentation Schedule 
          </h5>

          <p class="caption">Check and view final presentation schedule.</p>
        </div>
      </div>

      <div class="header-right">
        <!-- <v-btn
          type="submit"
          flat
          prepend-icon="mdi-check-circle-outline"
          class="button-regular"
          >Going
        </v-btn>
        <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn> -->
      </div>
    </v-card>
    <div class="overview-ctr">
      <v-card elevation="5" >
        <v-card-title>
          <h5 style="text-transform: uppercase">
            <v-icon start icon="mdi-calendar-month-outline"></v-icon>Sunday, January 21, 2024 9:00 am
          </h5>
        </v-card-title>
        <v-card-text>
          <p style="font-weight: 600;">
            <v-icon start icon="mdi-map-marker-outline"></v-icon>UNC Testing Center AMS110
          </p>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
  <v-card flat style="padding-top: 0.833rem">
    <v-card flat class="header-body">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h5>Panelist Comments And Suggestions</h5>

          <p class="caption">
            View and read panelist comments and suggestions.
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
    </v-card>
    <v-card></v-card>
    <div class="overview-ctr">
      <v-card elevation="5">
          <v-expansion-panels >
            <v-expansion-panel 
              title="Panelist Name 1"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
            >
            </v-expansion-panel>
            <v-expansion-panel
              title="Panelist Name 2"
              text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
            >
            </v-expansion-panel>
          </v-expansion-panels>
      </v-card>
    </div>
  </v-card>
</template>
