<template>
  <v-card flat class="body">
    <v-card-title flat class="header" style="padding: 0">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6>January</h6>

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
          prepend-icon="mdi-note-plus-outline"
          class="button-regular"
          >Add More
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
    </v-card-title>

    <div class="content" style="padding: 0">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-title class="title expansion-title-body">
              <span class="expansion-title-left truncate">
                <span class="truncate"> Insert research project name</span>
              </span>
              <span class="expansion-title-right">
                <v-chip
                  >January 21, 2023
                  <v-tooltip activator="parent" location="bottom"
                    >Uploaded In
                  </v-tooltip>
                </v-chip>
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>embed pdf file for overview </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </v-card>
</template>
