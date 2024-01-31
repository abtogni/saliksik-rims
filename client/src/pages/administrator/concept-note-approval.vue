<template>
  <v-container >
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters class="header-caption">
          <h6>Concept Note Submissions</h6>
          <caption>
            Call for submission to start. Approve or reject submitted concept
            note. Click on the concept note, on the left, to see overview.
          </caption>
        </v-row>
      </v-col>
      <v-col cols="3" class="header-button">
        <v-btn type="submit" tonal class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
          Submission
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-expansion-panels mandatory="force">
        <!--collapsible approval-->
        <v-expansion-panel
          title="Approval"
        >
      
      </v-expansion-panel>
        <!--collapsible approved-->
        <v-expansion-panel
          title="Approved"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible rejected-->
        <v-expansion-panel
          title="Rejected"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible datails-->
        <v-expansion-panel
          title="Details"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>

      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script  lang="ts">
  export default {
    data: () => ({
      trip: {
        name: '',
        location: null,
        start: null,
        end: null,
      },
      locations: ['Australia', 'Barbados', 'Chile', 'Denmark', 'Ecuador', 'France'],
    }),
  }
</script>
