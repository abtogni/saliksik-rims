<template>
  <v-container fluid class="fill-height body pa-0">
    <!--header-->
    <v-row no-gutters class="row-content">
    <v-row no-gutters class="row-header">
      <v-col class="col-start">
        <v-row no-gutters>
          <h2>Create Concept Note</h2>
        </v-row>
        <v-row no-gutters>
          <h2 class="caption">
            Fill out all required fields. Put "N/A" if not applicable.
          </h2>
        </v-row>
      </v-col>
      <v-col class="col-end">
        <v-btn type="submit" variant="tonal" class="button-regular">
          <v-icon start type="submit" icon="mdi-file-upload"></v-icon> Submit
        </v-btn>
        <v-btn type="submit" variant="outlined" class="button-outlined">
          <v-icon start type="save_as_draft" icon="mdi-file"></v-icon> Save As
          Draft
        </v-btn>
      </v-col>
    </v-row>

    <!--form-->
    
      <v-form class="form-concept-note">
        <v-card class="card-concept-note">
          <v-text-field
            label="Project Title"
            density="compact"
            required
            variant="outlined"
          ></v-text-field>
          <v-select
            label="Project Leaders"
            density="compact"
            variant="outlined"
            multiple
            chips
          >
          </v-select>
          <v-row>
            <v-col>
              <v-text-field
                label="Implementing Agency/Department"
                density="compact"
                required
                variant="outlined"
              ></v-text-field>
              <v-text-field
                label="Cooperating Agency"
                density="compact"
                required
                variant="outlined"
              >
                <v-tooltip activator="parent" location="top"
                  >State the name of agency to be tapped for funding/
                  co-implementing the project.</v-tooltip
                ></v-text-field
              >
              <v-text-field
                label="Site/s of Implementation"
                density="compact"
                required
                variant="outlined"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                label="Project Duration"
                density="compact"
                required
                variant="outlined"
              >
                <v-tooltip activator="parent" location="top" width="30%"
                  >Specific dates that the project will be undertaken
                  (month/year); ideally to be completed minimum 1 year/
                  depending on the approved grant.</v-tooltip
                ></v-text-field
              >
              <v-text-field
                label="Total Project Cost"
                density="compact"
                required
                variant="outlined"
              >
                <v-tooltip activator="parent" location="top" width="30%"
                  >Include the specific budget allocations for personnel
                  service, maintenance and operations, equipment,
                  trainings/workshops, and administrative costs.</v-tooltip
                ></v-text-field
              >
              <v-text-field
                label="Funding Source"
                density="compact"
                required
                variant="outlined"
              >
                <v-tooltip activator="parent" location="top"
                  >Specific funding source, including counterpart
                  funds.</v-tooltip
                ></v-text-field
              >
            </v-col>
          </v-row>
        </v-card>
        <v-card class="card-concept-note">
          <v-textarea
            label="Project Description"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea>
          <v-tooltip activator="parent" location="top" width="75%"
            >Formally written declaration of the project and its idea and
            context to explain the goals and objectives to be reached and other
            relevant information that explains the need for the project and aims
            to describe the amount of work planned for implementation; refers to
            a simple explanation or depiction of the project that can be used as
            communication material.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input>
        </v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Significance"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea
          ><v-tooltip activator="parent" location="top" width="75%"
            >Refers to the alignment to UNC research agenda/ UN SDG / tapped
            agency provided in the matrix attached; review of literature may
            refer to the following: (a) related researches that have been
            conducted, state-of-the-art or current technologies from which the
            project will take off; (b) scientific/technical merit; (c) results
            of related research conducted by the same Project Leader, if any;
            (d) Prior Art Search, and; (e) other relevant. </v-tooltip
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Objectives"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea
          ><v-tooltip activator="parent" location="top" width="75%" 
            >Statements of the general and specific purposes to address the
            problem areas of the project; must anchor to the UNC agenda/ SDG/
            grant giving body’s agenda. </v-tooltip
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Methodology"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea
          ><v-tooltip activator="parent" location="top" width="75%"
            >Discuss the following: (a) variables or parameters to be measured
            and evaluated or analyzed; (b) treatments to be used and their
            layout; (c) experimental procedures and design; (d) statistical
            analysis; (e) evaluation method and observations to be made,
            strategies for implementation (Conceptual/Analytical framework). </v-tooltip
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Technology Roadmap"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea
          ><v-tooltip activator="parent" location="top" width="75%"
            >(If applicable) A visual document that communicates the plan for
            technology. </v-tooltip
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Expected Outputs (6Ps)"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea
          ><v-tooltip activator="parent" location="top" width="75%"
            >Deliverables of the project based on the 6Ps metrics of DOST/
            typical grants suggested deliverables (Publication,
            Patent/Intellectual Property, Product, People Service, Place and
            Partnership, and Policy). </v-tooltip
          ><v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input
        ></v-card>
        <v-card class="card-concept-note"
          ><v-textarea
            label="Work Plan"
            variant="outlined"
            required
            rows="20"
            auto-grow
          >
          </v-textarea>
          <v-tooltip activator="parent" location="top" width="75%"
            >specific activity to be undertaken per month in a gantt chart to
            produce the promised results to attain the objectives of the
            project.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          ></v-file-input>
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>
