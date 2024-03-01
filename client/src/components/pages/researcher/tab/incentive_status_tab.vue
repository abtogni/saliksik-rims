
<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Incentive Status</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >Check and track when the incentive can be claimed.
            </v-tooltip>
          </p>
        </div>
      </div>

      <div class="header-right">
        <status_incentive_processing/>
         <v-btn
          type="submit"
          flat
          prepend-icon="mdi-phone-outline"
          class="button-regular"
          >Ask For Update
        </v-btn>
        <!--
        <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn> -->
      </div>
    </v-card-title>
    <v-card-text class="overview-ctr">
      <v-card elevation="0" >
        <researcher_incentive_processing/>
        <researcher_incentive_processing/>
        <researcher_incentive_processing/>
      </v-card>
    </v-card-text>
  
</v-card>
</template>
