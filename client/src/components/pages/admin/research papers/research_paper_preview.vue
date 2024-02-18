<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card flat class="header">
      <div class="header-left truncate">
        <div class="header-caption">
          <h5></h5>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> -->
        </div>
      </div>

      <div class="header-right">
        <!--cta
        <v-btn
          type="submit"
          flat
          prepend-icon="mdi-file-upload-outline"
          class="button-regular"
          >Submit Research Paper
        </v-btn>

         <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn>  -->
      </div>
    </v-card>
    <div class="content">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="title expansion-title-body">
              <v-badge color="warning" content="6" inline>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                  >New Uploads
                </v-tooltip>
              </v-badge>
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-icon></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Researchers</div>
                  <div>insert name</div>
                </v-tooltip>
              </v-btn>

              <span class="expansion-title-left truncate">
                <span class="truncate"> Insert research project name</span>
              </span>
              <span class="expansion-title-right">
                <v-btn variant="text" icon="mdi-file-upload-outline">
                  <v-badge color="info" content="6" floating>
                    <v-icon></v-icon>
                  </v-badge>

                  <v-tooltip
                    activator="parent"
                    location="bottom"
                    class="tooltip-list"
                    >No. Of Uploads
                  </v-tooltip>
                </v-btn>
                <v-chip
                  >January 21, 2023
                  <v-tooltip activator="parent" location="bottom"
                    >Last Upload
                  </v-tooltip>
                </v-chip></span
              >
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <research_paper_upload/>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </v-card>
</template>
