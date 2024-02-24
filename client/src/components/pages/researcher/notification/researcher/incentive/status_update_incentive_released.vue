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
              >Incentive Status Update ~<span class="notif-txt">
                The incentive for research project titled
                <span class="bold"
                  >Streamlining Outcome-Based Education and Continuous Quality
                  Improvement of University of Nueva Caceres through Technology:
                  A Information Management System for Improving Inclusiveness </span
                >is has been <span class="bold">released. You may now claim the incentive on the accounting office or check your bank account.</span> </span
              >
            </h7>
            <span
              class="notif-date-txt"
            >
              Jan 21, 2023
            </span>
          </div>
          <div class="notif-right">
            <v-badge dot color="primary"></v-badge>
          </div>
        </div>

        <div>
          <v-btn flat density="comfortable" class="button-regular">
            Check Status
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>
