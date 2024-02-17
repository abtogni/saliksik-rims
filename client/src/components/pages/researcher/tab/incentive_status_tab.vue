
<template>
  <v-card flat style="padding-top: 0.833rem">
    <v-card flat class="header-body">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h5>
            Incentive Status
          </h5>

          <p class="caption">Check and track when the incentive can be claimed.</p>
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
        <Status_update_concept_note/>
      </v-card>
    </div>
  </v-card>
</template>
