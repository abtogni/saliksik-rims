<!-- <v-container>
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
        collapsible approval
        <v-expansion-panel>
          <v-expansion-panel-title>
            <v-row no-gutters>
              <v-col class="counter">
                <span class="count">00</span> Approval
              </v-col>
            </v-row>
          </v-expansion-panel-title>
          <v-expansion-panel-text
            ><v-toolbar color="primary">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>Page title</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
            <div class="d-flex flex-row">
              <v-tabs
                v-model="tab"
                direction="vertical"
                color="primary"
                style="width: 35%; height: auto"
              >
                <v-tab value="option-1" stacked height="auto">
                  <v-row align="center" justify="start">
                    <v-col cols="auto">
                      <p class="research-title">
                        Streamlining Outcome-Based Education and
                        ContinuousQuality Improvement of University of Nueva
                        Caceres through Technology: A Information Management
                        System for Improving Inclusiveness
                      </p>
                    </v-col>
                  </v-row>
                </v-tab>
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
              </v-window>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        collapsible approved--
        <v-expansion-panel
          title="Approved"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        collapsible rejected--
        <v-expansion-panel
          title="Rejected"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        collapsible datails--
        <v-expansion-panel
          title="Details"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container> -->
<template>
  <v-container fluid >
    <v-row no gutters class="header-container">
      <v-col>
        <v-row no-gutters class="pageName-container">
          <h2>Concept Note Submissions</h2>
          <p class="caption">
            Call for submission to start. Approve or reject submitted concept
            note. Click on the concept note, on the left, to see overview.
          </p>
        </v-row>
      </v-col>
      <v-col cols="4" class="cta-container">
        <v-btn type="submit" class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
          Submission
        </v-btn>
      </v-col>
    </v-row>

    <!--tab container-->
      <v-card elevation="5" class="">
        <v-tabs v-model="tab"
          :items="tab_items"
        />


        <v-card-text style="">
          <v-window v-model="tab"  >
            <v-window-item value="Verify and Review" >
              <concept_note_submissions />
            </v-window-item>
            <v-window-item value="Approval"> Two </v-window-item>
            <v-window-item value="Approved"> Three </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const tab = ref(null)
  const tab_items = ['Verify and Review', 'Approval', 'Approved', 'Rejected', 'Summary'];
</script>

