<template>
    <v-card flat class="body">
      <v-card-title flat class="header">
        <div class="header-left truncate">
          <div class="header-caption-ctr">
            <h5>Researchers</h5>

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
      </v-card-title>

      <v-divider />
      
      <v-hover v-slot:default="{ isHovering, props }">
        <v-card
          flat
          rounded="0"
          v-bind="props"
          :color="isHovering ? '#eef2ff' : undefined"
          style="height: fit-content;"
        >
          <v-card-text class="pres-res-body">
            <div class="pres-res-left">

            
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-icon></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Researchers</div>
                  <div >
                    insert researcher name
                  </div>
                </v-tooltip>
              </v-btn>
              <div class="text" >
                insert researcher project name
              </div>
              
            </div>
              <div class="pres-res-right">
                <v-btn variant="text" icon="mdi-dots-vertical">
                </v-btn>
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
