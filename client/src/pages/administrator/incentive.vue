<template>
  <v-container fluid class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge
              color="primary"
              prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content"
            >
              <h5 style="margin-right: 0.5rem">Incentive</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                Track and manage incentives here.
              </v-tooltip>
            </p>
          </div>
        </div>
        <!--cta container
        <div class="header-right">
          <v-btn type="submit" class="button-regular">
            <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
            Submission
          </v-btn>
        </div>
        -->
      </v-card-title>

      <!--tab container-->
      <v-card-text elevation="0" class="content">
        <v-card elevation="0" variant="flat" class="">
          <v-tabs v-model="tab" color="#5b21b6">
            <v-tab value="No Status" 
              >No Status
              <template v-slot:append>
                <v-badge color="info" content="6" inline>
                  <v-tooltip activator="parent" location="top">
                    Previous Schedule
                  </v-tooltip>
                </v-badge>
              </template>
            </v-tab>
            <v-tab value="Processing"
              >Processing
              <template v-slot:append>
                <v-badge color="info" content="6" inline>
                  <v-tooltip activator="parent" location="top">
                    Previous Schedule
                  </v-tooltip>
                </v-badge>
              </template>
            </v-tab>
            <v-tab value="Released"
              >Released
              <template v-slot:append>
                <v-badge color="info" content="6" inline>
                  <v-tooltip activator="parent" location="top">
                    Previous Schedule
                  </v-tooltip>
                </v-badge>
              </template>
            </v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="No Status">
              <incentive_no_status />
            </v-window-item>
            <v-window-item value="Processing">
              <incentive_processing />
            </v-window-item>

            <v-window-item value="Released">
              <incentive_released />
            </v-window-item>
          </v-window>
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
};
</script>
