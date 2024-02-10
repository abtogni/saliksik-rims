<template>
  <v-card flat style="padding-top: 0.833rem">
    <v-card flat class="header-body">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h5>Concept Note <title_presentation_waiting_response/> </h5>
          
          <p class="caption">Create and submit concept note to start.</p>
        </div>
      </div>

      <div class="header-right">
        <v-btn
          type="submit"
          flat
          prepend-icon="mdi-file-document-plus-outline"
          class="button-regular"
          >Create Concept Note
        </v-btn>
        <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-file-document-edit-outline"
          class="button-outlined"
          >Edit Concept Note
        </v-btn>
      </div>
    </v-card>
    <v-card></v-card>
    <div id="overview">
      <v-card flat>
        <v-card-title>
          <h5>
            Streamlining Outcome-Based Education and Continuous Quality
            Improvement of University of Nueva Caceres through Technology: A
            Information Management System for Improving Inclusiveness
          </h5>
        </v-card-title>
        <v-card-text style="display: flex; flex-direction: row; justify-content: space-between; align-items: start; gap: 1rem;">
          <div style="display:flex; flex-direction: column; gap: 1rem; width: 100%;">
            <p><span style="font-weight: 600">Implementing Agency/Department </span><br>Insert text</p>
            <p><span style="font-weight: 600">Site's Of Implementation </span><br>Insert text</p>
            <p><span style="font-weight: 600">Cooperating Agency </span><br>Insert text</p>
          </div>
          <div style="display:flex; flex-direction: column; gap: 1rem; width: 100%;">
            <p><span style="font-weight: 600">Project Duration </span><br>Insert text</p>
            <p><span style="font-weight: 600">Project Cost </span><br>Insert text</p>
            <p><span style="font-weight: 600">Funding Source </span><br>Insert text</p>
          </div>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Project Description</h6> </v-card-title>
        <v-card-text>
          <p>
          </p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Significance</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Objectives</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Methodology</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Technology Roadmap</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Expected Outputs (6Ps)</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
      <v-card flat>
        <v-card-title> <h6>Work Plan</h6> </v-card-title>
        <v-card-text>
          <p>Insert text</p>
        </v-card-text>
      </v-card>
    </div>
  </v-card>
    <v-row no-gutters class="card">
      <v-col class="col-start">
        <div class="header">
          <h2 style="padding-bottom: .833rem;">Title Presentation Schedule</h2>
          <!-- <v-chip color="primary" class="header-count"> Schedule Not Set </v-chip> -->
        </div>
        <v-row no-gutters>
          <h2 class="caption"></h2>
        </v-row>
      </v-col>
      <!--cta container-->
      <v-col class="col-end">
        <!-- <v-btn type="submit" variant="tonal" class="button-regular">
            <v-icon start icon="mdi-folder-plus-outline"></v-icon> Create
            Research Project
          </v-btn> -->
      </v-col>

      <v-card class="card">
        <h3>
          <v-icon start icon="mdi-calendar-clock-outline"></v-icon>Sunday,
          January 21, 2024 9:00 AM
        </h3>
        <h4>
          <v-icon start icon="mdi-map-marker-outline"></v-icon>AMS 107 PEP Room
        </h4>
        <h4>
          <v-icon start icon="mdi-account-group"></v-icon>5 Researchers Going
        </h4>
      </v-card>
    </v-row>
      <v-row no-gutters class="card">
        <v-col class="col-start">
          <div class="header">
            <h2 style="padding-bottom: .833rem;">Panelist Comments and Suggestions</h2>
            <!-- <v-chip color="primary" class="header-count"> Schedule Not Set </v-chip> -->
          </div>
          <v-row no-gutters>
            <h2 class="caption"></h2>
          </v-row>
        </v-col>
        <!--cta container-->
        <v-col class="col-end">
          <!-- <v-btn type="submit" variant="tonal" class="button-regular">
            <v-icon start icon="mdi-folder-plus-outline"></v-icon> Create
            Research Project
          </v-btn> -->
        </v-col>
      
      <v-expansion-panels>
        <v-expansion-panel
          title="Panelist Name 1"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
        >
        </v-expansion-panel>
        <v-expansion-panel
          title="Panelist Name 2"
          text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
        >
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
</template>
