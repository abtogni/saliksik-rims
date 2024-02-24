<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card
      flat
      rounded="0"
      v-bind="props"
      :color="isHovering ? '#eef2ff' : undefined"
    >
      <v-card-text class="notif-body">
        <div class="notif-header">
          <div class="notif-left">
            <h7
              >Notice To Present ~<span class="notif-txt">
                The schedule for Title Presentation has been set for
                <span class="bold"
                  >Smart Tourism Practices in Naga City: An Assessment.</span
                >
              </span>
            </h7>
            <span class="notif-date-txt"> Jan 21, 2023 </span>
          </div>
          <div class="notif-right">
            <v-badge dot color="primary"></v-badge>
          </div>
        </div>

        <div>
          <v-btn
            flat
            density="comfortable"
            prepend-icon="mdi-calendar-month"
            class="button-regular"
          >
            Check Schedule
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
