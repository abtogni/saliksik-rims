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
                Create new research project to start. View and manage your
                research projects here.
              </p>
            </div>
          </div>
          <!--cta container-->
          <div class="header-right">
            <v-btn
              variant="tonal"
              prepend-icon="mdi-file-document-check-outline"
              type="submit"
              text="Submit"
              class="button-regular"
            />
          </div>
        </v-card-title>

        <!--form-->

        <v-card-text class="txt-field-col">
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
