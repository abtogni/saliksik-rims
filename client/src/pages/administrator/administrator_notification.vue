<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h5>Notifications <v-chip>00</v-chip></h5>

            <p class="caption">
              Check unread notifications, updates, submissions and
              other things that may require your attention.
            </p>
          </div>
        </div>

        <div class="header-right">
          <v-btn
            type="submit"
            flat
            prepend-icon="mdi-email-open-outline"
            class="button-regular"
            >Mark All As Read
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
        <v-card elevation="5">
          <v-tabs v-model="tab">
            <v-tab value="one">All</v-tab>
            <v-tab value="two">Unread</v-tab>
            <v-tab value="three">Read</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item value="one">
            </v-window-item>

            <v-window-item value="two"> Two </v-window-item>
            <v-window-item value="three"> Three </v-window-item>
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
