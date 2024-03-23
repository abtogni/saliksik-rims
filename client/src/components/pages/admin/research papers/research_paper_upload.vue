<template>
  <v-card flat class="body">
    <v-card-title flat class="header" style="padding: 0">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6></h6>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> -->
        </div>
      </div>

      <div class="header-right">
         <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-check-circle-outline"
          class="button-regular"
          >Mark As Verified
        </v-btn>  
      </div>
    </v-card-title>

    <div class="content" style="padding: 0">
      <v-card variant="outlined" class="card-style">
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
              padding: 1rem;
            "
            class="truncate"
          >
              <a
                target="_blank"
                class="p-reg b truncate">Insert File Name 
              </a>
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
    </div>
  </v-card>
</template>
