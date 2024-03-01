<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Research Paper Progress</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >Track and monitor your research paper. Upload a copy of the research paper regularly.

            </v-tooltip>
          </p>
        </div>
      </div>

      <div class="header-right">
        <v-btn
          type="submit"
          flat
          prepend-icon="mdi-file-upload-outline"
          class="button-regular"
          >Submit Research Paper
        </v-btn>

        <!-- <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn>  -->
      </div>
    </v-card-title>
    <v-card-text>
      <v-card variant="flat" class="overview-ctr">
        <v-card variant="outlined" class="card-style">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title class="title expansion-title-body">
                <span class="expansion-title-left truncate">
                  <span>
                    <v-icon start icon="mdi-account-multiple-outline"></v-icon>
                    <v-tooltip
                      activator="parent"
                      location="top"
                      style="display: flex; flex-direction: column"
                    >
                      <div style="text-transform: uppercase; font-weight: 600">
                        Uploaded by
                      </div>
                      <div>Jomari Valenciano</div>
                      <div>Andrei Togñi</div>
                    </v-tooltip>
                  </span>
                  <span class="truncate">
                    Insert research titleInsert research titleInsert research
                    titleInsert research titleInsert research titleInsert
                    research titleInsert research titleInsert research
                    titleInsert research titleInsert research titleInsert
                    research titleInsert research titleInsert research
                    title</span
                  >
                </span>
                <span class="expansion-title-right"
                  ><v-chip>January 21, 2023</v-chip></span
                >
              </v-expansion-panel-title>
              <v-expansion-panel-text>dasfdsaf</v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel title="Panelist Name 2"> </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-card>
    </v-card-text>
  </v-card>
</template>
