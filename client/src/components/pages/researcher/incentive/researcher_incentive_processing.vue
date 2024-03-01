<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card
      flat
      rounded="0"
      v-bind="props"
      :color="isHovering ? '#eef2ff' : '#fff7ed'"
      style="padding: .5rem;"
    >
      <v-card-text class="pres-res-body">
        <div class="pres-res-left">

          <!-- <v-btn variant="text" icon="mdi-account-multiple-outline">
            <v-icon></v-icon>
            <v-tooltip
              activator="parent"
              location="bottom"
              class="tooltip-list"
            >
              <div class="bold-upper">Researches</div>
            </v-tooltip>
          </v-btn> -->
          
          <v-chip color="primary" class="status-txt">No Status</v-chip>
          <div class="text">Insert Date and Time</div>
          <v-chip color="primary" class="status-txt">Processing</v-chip>
          <div class="text">Insert Date and Time</div>
          <v-chip color="primary" class="status-txt">Released</v-chip>
          <div class="text">Insert Date and Time</div>
        </div>
        <div class="pres-res-right">
          <!-- <v-btn variant="text" icon="mdi-trash-can-outline">
<v-icon></v-icon>
                  <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >Remove
                </v-tooltip>
                </v-btn> -->
        </div>
        <!-- cta
              <div>
              <v-btn
                flat
                density="comfortable"
                prepend-icon="mdi-calendar-month"
                class="button-regular"
              >
                Check Schedule
              </v-btn>
            </div> -->
      </v-card-text>
      
    </v-card>
  </v-hover>
</template>
