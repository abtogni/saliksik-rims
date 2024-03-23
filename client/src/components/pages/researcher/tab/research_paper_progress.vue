<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Research Paper Progress</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >Track and monitor your research paper. Upload a copy of the
              research paper regularly.
            </v-tooltip>
          </p>
        </div>
      </div>

      <div class="header-right">
        <upload_research_paper />

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
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style ">
        <div
          style="
            display: flex;
            flex-direction: row;
            gap: 1rem;
            justify-content: space-between;
            padding: 0;
            margin: 0;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              gap: 1rem;
              align-items: center;
            "
            class="truncate"
          >
            <v-btn variant="text" icon="mdi-account-multiple-outline">
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
              >
                <div class="bold-upper">Uploaded By</div>
                <div>insert name</div>
              </v-tooltip>
            </v-btn>
              <p class="p-reg b truncate">
                Streamlining Outcome-Based Education and Continuous Quality
                Improvement of University of Nueva Caceres through Technology: A
                Information Management System for Improving Inclusiveness
              </p>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              gap: 1rem;
              align-items: center;
            "
            class="pres-res-right"
          >
            <v-chip variant="text" class="b button-outlined"
              >Uploaded In
            </v-chip>

            <v-btn variant="text" icon="mdi-file-download-outline">
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
                >Download As PDF
              </v-tooltip>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>
