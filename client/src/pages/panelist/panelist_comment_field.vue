<template>
  <v-container fluid class="fill-height ctr">
    <!--header-->
    <v-card flat class="body">
      <v-form class="form-ctr">
        <v-card-title class="header">
          <div class="header-left truncate">
            <div class="header-caption">
              <h2>Panelist Comments and Suggestions</h2>

              <p class="caption">
                Enter your comments and suggestions on the respective research projects.
              </p>
            </div>
          </div>
          <!--cta container-->
          <div class="header-right">
            <v-btn
              variant="tonal"
              prepend-icon="mdi-comment-check-outline"
              type="submit"
              text="Submit"
              class="button-regular"
            />
          </div>
        </v-card-title>

        <!--form-->

        <v-card-text class="txt-field-col">
          <v-card color="#fff7ed" variant="flat" rounded="20" class="txt-field-ctr">
            <v-textarea
              label="Utilization And Effectiveness Of Disaster Risk Reduction Management Interventions In Naga City: Basis For A Tactical Framework"
              variant="outlined"
              color="#5b21b6"
              required
              rows="20"
              auto-grow
              style="color: #5b21b6"
            />
            
            insert concept note overview
          </v-card>
          <v-card color="#1d4ed8" variant="outlined" class="txt-field-ctr">
            <v-textarea
              label="Utilization And Effectiveness Of Disaster Risk Reduction Management Interventions In Naga City: Basis For A Tactical Framework"
              variant="outlined"
              base-color="black"
              color="black"
              required
              rows="20"
              auto-grow
              style="color: black"
            />
            
            insert concept note overview
          </v-card>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup lang="ts"></script>
