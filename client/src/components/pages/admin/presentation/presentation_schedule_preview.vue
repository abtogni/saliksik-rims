<template>
  <v-card flat class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h5>Insert Schedule and Location</h5>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> -->
        </div>
      </div>

      <div class="header-right">
        <v-btn type="submit" flat icon="mdi-calendar-edit-outline">
          <v-icon></v-icon>
          <v-tooltip activator="parent" location="bottom"
            >Change Schedule
          </v-tooltip>
        </v-btn>
        <!--cta
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
  </v-card>
</template>
