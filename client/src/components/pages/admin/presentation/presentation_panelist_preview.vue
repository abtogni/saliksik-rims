<template>
  <v-card flat class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6>Panelist</h6>

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

    <v-divider />

    <v-hover v-slot:default="{ isHovering, props }">
      <v-card
        flat
        rounded="0"
        v-bind="props"
        :color="isHovering ? '#eef2ff' : undefined"
        style="height: fit-content"
      >
        <v-card-text class="pres-res-body">
          <div class="pres-res-left">
            <v-btn variant="text" icon="mdi-account-multiple-outline"> </v-btn>
            <div class="text">insert panelist name</div>
          </div>
          <div class="pres-res-right">
            <!-- <v-btn variant="text" icon="mdi-trash-can-outline">
<v-icon></v-icon>
                  <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >Remove
                </v-tooltip>
                </v-btn> -->
          </div>

          <!-- cta
              <div>
              <v-btn
                flat
                density="comfortable"
                prepend-icon="mdi-calendar-month"
                class="button-regular"
              >
                Check Schedule
              </v-btn>
            </div> -->
        </v-card-text>
      </v-card>
    </v-hover>
  </v-card>
</template>
