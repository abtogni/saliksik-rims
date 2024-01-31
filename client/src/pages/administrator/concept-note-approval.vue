<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-row no-gutters class="header-caption">
          <h6>Concept Note Submissions</h6>
          <caption>
            Call for submission to start. Approve or reject submitted concept
            note. Click on the concept note, on the left, to see overview.
          </caption>
        </v-row>
      </v-col>
      <v-col cols="3" class="header-button">
        <v-btn type="submit" tonal class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
          Submission
        </v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-expansion-panels mandatory="force">
        <!--collapsible approval-->
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col class="counter">
                <span class="count">00</span> Approval
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="d-flex flex-row">
              <v-tabs
                v-model="tab"
                direction="vertical"
                color="primary"
                style="width: 25%"
              >
                <v-tab value="option-1" height="auto"> <p style="word-wrap: break-word;">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</p> </v-tab>
                <v-tab value="option-2"> dasd </v-tab>
              </v-tabs>
              <v-window v-model="tab">
                <v-window-item value="option-1">
                  <v-card flat>
                    <v-card-text>
                      <p>
                        Sed aliquam ultrices mauris. Donec posuere vulputate
                        arcu. Morbi ac felis. Etiam feugiat lorem non metus. Sed
                        a libero.
                      </p>

                      <p>
                        Nam ipsum risus, rutrum vitae, vestibulum eu, molestie
                        vel, lacus. Aenean tellus metus, bibendum sed, posuere
                        ac, mattis non, nunc. Aliquam lobortis. Aliquam
                        lobortis. Suspendisse non nisl sit amet velit hendrerit
                        rutrum.
                      </p>

                      <p class="mb-0">
                        Phasellus dolor. Fusce neque. Fusce fermentum odio nec
                        arcu. Pellentesque libero tortor, tincidunt et,
                        tincidunt eget, semper nec, quam. Phasellus blandit leo
                        ut odio.
                      </p>
                    </v-card-text>
                  </v-card>
                </v-window-item>
                <v-window-item value="option-2">
                  <v-card flat>
                    <v-card-text>
                      <p>asdasd</p>
                    </v-card-text>
                  </v-card>
                </v-window-item>
              </v-window>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <!--collapsible approved-->
        <v-expansion-panel
          title="Approved"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible rejected-->
        <v-expansion-panel
          title="Rejected"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible datails-->
        <v-expansion-panel
          title="Details"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab: "option-1",
  }),
};
</script>
