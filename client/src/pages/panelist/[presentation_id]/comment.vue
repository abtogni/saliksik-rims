<template>

  <v-container fluid class="fill-height ctr">
    <!--header-->
    <v-card flat class="body">
      <v-form class="form-ctr">
        <v-card-title class="header">
          <div class="header-left">
            <div class="header-caption">
              <h5 style="margin-right: 0rem">
                Panelist Comments and Suggestions
              </h5>

              <p class="help" style="padding-top: .2rem;">
                help
                <v-tooltip activator="parent" location="bottom">
                  Enter your comments and suggestions on the respective research
                  projects.
                </v-tooltip>
              </p>
            </div>
          </div>
          <!--cta container-->
          <div class="header-right">
            <v-btn variant="tonal" prepend-icon="mdi-comment-check-outline" type="submit" text="Submit"
              class="button-regular" />
          </div>
        </v-card-title>

        <!--form-->

        <v-card-text class="txt-field-col">
          <v-card color="#fff7ed" variant="flat" rounded="20" class="txt-field-ctr" text="Research Title">
            <v-textarea label="Comment goes here..." variant="outlined" color="#5b21b6" required auto-grow
              style="color: #5b21b6" />

            <concept_note_overview />
          </v-card>
        </v-card-text>
      </v-form>
    </v-card>
  </v-container>
</template>
