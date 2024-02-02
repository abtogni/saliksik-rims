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
        <!--collapsible approval--
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
        <!--collapsible approved--
        <v-expansion-panel
          title="Approved"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible rejected--
        <v-expansion-panel
          title="Rejected"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
        <!--collapsible datails--
        <v-expansion-panel
          title="Details"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </v-row>
  </v-container> -->
<template>
  <!--main container-->
  <v-container fluid>
    <!--header container-->
    <v-row no gutters>
      <!--page name container-->
      <v-col>
        <!--pageName-cap container-->
        <v-row no-gutters class="pageName-cap-container">
          <h6>Concept Note Submissions</h6>
          <caption>
            Call for submission to start. Approve or reject submitted concept
            note. Click on the concept note, on the left, to see overview.
          </caption>
        </v-row>
      </v-col>
      <!--cta container-->
      <v-col cols="2" class="cta-container" style="background-color: orange">
        <!--cta call for submission-->
        <v-btn type="submit" tonal class="button-regular">
          <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Call For
          Submission
        </v-btn>
      </v-col>
    </v-row>

    <!--tab container-->
    <v-card elevation="2" style="height: 59rem; overflow: auto">
      <!--tab options-->
      <v-tabs v-model="tab1">
        <v-tab value="one" class="tab-option">
          <v-icon size="20" class="icon"
            >mdi-file-document-alert-outline</v-icon
          >
          Verify and Review
          <div class="count">10</div>
        </v-tab>
        <v-tab value="two" class="tab-option">
          <v-icon size="20" class="icon"
            >mdi-file-document-multiple-outline</v-icon
          >
          Approval
          <div class="count">10</div>
        </v-tab>
        <v-tab value="three" class="tab-option">
          <v-icon size="20" class="icon"
            >mdi-file-document-check-outline</v-icon
          >
          Approved
          <div class="count">10</div>
        </v-tab>
        <v-tab value="four" class="tab-option">
          <v-icon size="20" class="icon"
            >mdi-file-document-remove-outline</v-icon
          >
          Rejected
          <div class="count">10</div>
        </v-tab>
        <v-tab value="five" class="tab-option">
          <v-icon size="20" class="icon">mdi-information-outline</v-icon>
          Details
          <div class="count">10</div>
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab1">
          <v-window-item value="one">
            <v-expansion-panels mandatory="force" style="overflow: auto">
              <!--collapsible approval-->
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-row no-gutters align="center" class="truncate">
                    <v-avatar
                      color="#1d4ed8"
                      variant="tonal"
                      size="30"
                      class="avatar"
                    >
                      AR
                    </v-avatar>
                    <v-avatar
                      color="#1d4ed8"
                      variant="tonal"
                      size="30"
                      class="avatar"
                    >
                      JD
                    </v-avatar>
                    <v-avatar
                      color="#1d4ed8"
                      variant="tonal"
                      size="30"
                      class="avatar"
                    >
                      DI
                    </v-avatar>
                    <v-avatar
                      color="#1d4ed8"
                      variant="tonal"
                      size="30"
                      class="avatar"
                    >
                      DC
                    </v-avatar>
                    <span class="divider"> | </span>
                    <v-col class="truncate prev-title"
                      >Streamlining Outcome-Based Education and
                      ContinuousQuality Improvement of University of Nueva
                      Caceres through Technology: A Information Management
                      System for Improving InclusivenessStreamlining
                      Outcome-Based Education and ContinuousQuality Improvement
                      of University of Nueva Caceres through Technology: A
                      Information Management System for Improving Inclusiveness
                    </v-col>
                    <span class="center-dot"> · </span>
                    <p class="truncate prev-date">February 22, 2024</p>
                  </v-row>
                </v-expansion-panel-title>

                <!--overview context-->
                <v-expansion-panel-text style="height: 46rem; overflow: auto">
                  <v-row style="gap: 1rem; margin-top: 0.5rem">
                    <v-row no-gutters style="gap: 1rem">
                      <v-col>
                        <v-card
                          title="Implementing Agency/Department"
                          text="College of Computer Studies"
                        ></v-card>
                      </v-col>
                      <v-col>
                        <v-card
                          title="Cooperating Agency"
                          text="UNC Research Center, College Department, Vice-President in Academic Affairs"
                        ></v-card>
                      </v-col>
                      <v-col>
                        <v-card
                          title="Site's of Implementation"
                          text="Collegiate Level in the University of Nueva Caceres"
                        ></v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters style="gap: 1rem">
                      <v-col>
                        <v-card
                          title="Total Project Cost"
                          text="438,000"
                        ></v-card>
                      </v-col>
                      <v-col>
                        <v-card
                          title="Project Duration"
                          text="12 Months"
                        ></v-card>
                      </v-col>
                      <v-col>
                        <v-card title="Funding Source" text="UNC"></v-card>
                      </v-col>
                    </v-row>
                    <v-row no-gutters>
                      <v-card
                        title="Project Description"
                        text="Outcome-based education (OBE) and continuous quality improvement (CQI) are two of the most important concepts in education today. OBE is a student-centered approach that focuses on the development of specific skills, knowledge, and attitudes that are relevant to the needs of the society. (Akir et al., 2012) CQI, on the other hand, is a continuous process of reviewing, analyzing, and improving educational practices and policies to ensure that the highest quality of education is delivered. (Misran et al.,2011)

In recent years, there has been a growing interest in the development and utilization of new educational technologies and resources for inclusive education (Smith, 2018). This is because these technologies have the potential to significantly improve the efficiency and effectiveness of OBE-CQI processes.

The University of Nueva Caceres, like many other educational institutions, has faced various challenges in implementing OBE-CQI effectively. One of the main challenges is the manual entry of data, which can be time-consuming and prone to errors (Liu & Huang, 2019). To address this challenge, the researchers propose to develop an Information Management System (IMS) to automate the data entry process.

The IMS is expected to improve the inclusiveness of OBE-CQI at the University of Nueva Caceres by making the process more efficient and effective. By streamlining the data entry process, the faculty will be able to focus more on the important tasks of teaching and learning. Additionally, the IMS will also help to reduce the errors and inconsistencies that can occur in manual data entry (Chen, 2021).

Therefore, the research aims to design, develop, and evaluate the IMS for OBE-CQI at the University of Nueva Caceres. The study will focus on the following areas: variables or parameters to be measured and evaluated or analyzed; treatments to be used and their layout; experimental procedures and design; statistical analysis; evaluation method and observations to be made; and strategies for implementation.
"
                      ></v-card>
                    </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card title="Significance" text=""></v-card>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card title="Objectives" text=""></v-card>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card title="Methodology" text=""></v-card>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card title="Technology Roadmap" text=""></v-card>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card
                            title="Expected Ouputs (6Ps)"
                            text=""
                          ></v-card>
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col>
                          <v-card title="Work Plan" text=""></v-card>
                        </v-col>
                      </v-row>
                  </v-row>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-window-item>

          <v-window-item value="two"> Two </v-window-item>

          <v-window-item value="three"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
export default {
  data: () => ({
    tab1: "one",
  }),
};
</script>
