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
              >Concept Note Status Update ~<span class="notif-txt">
                The concept note titled
                <span class="bold"
                  >Streamlining Outcome-Based Education and Continuous Quality
                  Improvement of University of Nueva Caceres through Technology:
                  A Information Management System for Improving Inclusiveness </span
                >has been <span class="bold">verified and reviewed.</span> A
                notice to present will be sent after the submission of concept
                note is closed.</span
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
