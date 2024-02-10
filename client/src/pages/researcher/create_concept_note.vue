<template>
  <v-container fluid class="fill-height body pa-0">
    <!--header-->
    <v-row no-gutters class="form-body">
      <v-form class="form-concept-note" @submit.prevent="create">
        <v-row no-gutters>
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
            <v-btn variant="tonal" type="submit" class="button-regular">
              <v-icon start icon="mdi-file-document-check-outline"></v-icon> Submit
            </v-btn>
            <v-btn variant="outlined" type="submit" class="button-outlined">
              <v-icon start icon="mdi-file-document-outline"></v-icon> Save As Draft
            </v-btn>
          </v-col>
        </v-row>

        <!--form-->

        <v-card class="card-concept-note">
          <v-text-field
            v-model="formData.project_title"
            label="Project Title"
            density="compact"
            required
            variant="outlined"
            :rules="field_required"
          />
          <v-select
            v-model="formData.project_leaders"
            label="Project Leaders"
            density="compact"
            variant="outlined"
            multiple
            chips
            :rules="field_required"
            :items="users"
          />
          <v-row >
            <v-col class="card-concept-note">
              <v-text-field
                v-model="formData.implementing_agency"
                label="Implementing Agency/Department"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              />
              <v-text-field
                v-model="formData.cooperating_agency"
                label="Cooperating Agency"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              >
                <v-tooltip activator="parent" location="top">
                  State the name of agency to be tapped for funding/
                  co-implementing the project.
                </v-tooltip>
              </v-text-field>
              <v-text-field
                v-model="formData.site_of_implementation"
                label="Site/s of Implementation"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              />
            </v-col>
            <v-col class="card-concept-note">
              <v-text-field
                v-model="formData.project_duration"
                label="Project Duration"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              >
                <v-tooltip activator="parent" location="top" width="30%"
                  >Specific dates that the project will be undertaken
                  (month/year); ideally to be completed minimum 1 year/
                  depending on the approved grant.</v-tooltip
                >
              </v-text-field>
              <v-text-field
                v-model="formData.total_project_cost"
                label="Total Project Cost"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              >
                <v-tooltip activator="parent" location="top" width="30%">
                  Include the specific budget allocations for personnel service,
                  maintenance and operations, equipment, trainings/workshops,
                  and administrative costs.</v-tooltip
                >
              </v-text-field>
              <v-text-field
                v-model="formData.funding_source"
                label="Funding Source"
                density="compact"
                required
                variant="outlined"
                :rules="field_required"
              >
                <v-tooltip activator="parent" location="top">
                  Specific funding source, including counterpart funds.
                </v-tooltip>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.project_description"
            label="Project Description"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%">
            Formally written declaration of the project and its idea and context
            to explain the goals and objectives to be reached and other relevant
            information that explains the need for the project and aims to
            describe the amount of work planned for implementation; refers to a
            simple explanation or depiction of the project that can be used as
            communication material.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.significance"
            label="Significance"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%"
            >Refers to the alignment to UNC research agenda/ UN SDG / tapped
            agency provided in the matrix attached; review of literature may
            refer to the following: (a) related researches that have been
            conducted, state-of-the-art or current technologies from which the
            project will take off; (b) scientific/technical merit; (c) results
            of related research conducted by the same Project Leader, if any;
            (d) Prior Art Search, and; (e) other relevant.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.objectives"
            label="Objectives"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%"
            >Statements of the general and specific purposes to address the
            problem areas of the project; must anchor to the UNC agenda/ SDG/
            grant giving body’s agenda.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.methodology"
            label="Methodology"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%"
            >Discuss the following: (a) variables or parameters to be measured
            and evaluated or analyzed; (b) treatments to be used and their
            layout; (c) experimental procedures and design; (d) statistical
            analysis; (e) evaluation method and observations to be made,
            strategies for implementation (Conceptual/Analytical framework).
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.technology_roadmap"
            label="Technology Roadmap"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%">
            (If applicable) A visual document that communicates the plan for
            technology.
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea
            v-model="formData.expected_outputs"
            label="Expected Outputs (6Ps)"
            variant="outlined"
            required
            rows="20"
            auto-grow
            :rules="field_required"
          />
          <v-tooltip activator="parent" location="top" width="75%"
            >Deliverables of the project based on the 6Ps metrics of DOST/
            typical grants suggested deliverables (Publication,
            Patent/Intellectual Property, Product, People Service, Place and
            Partnership, and Policy).
          </v-tooltip>
          <v-file-input
            label="Upload images, charts, tables here, if necessary."
            variant="outlined"
            required
            chips
            multiple
          />
        </v-card>
        <!-- Other v-card elements -->
      </v-form>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const field_required = [(v: string) => !!v.length || "Field is required"];
const users = ["Agnes Reyes", "June Arreb Danila", "Danny Casimero", "Dennis Ignacio"];

const formData = reactive({
  project_title: '',
  project_leaders: [],
  implementing_agency: '',
  cooperating_agency: '',
  site_of_implementation: '',
  project_duration: '',
  total_project_cost: '',
  funding_source: '',
  project_description: '',
  significance: '',
  objectives: '',
  methodology: '',
  technology_roadmap: '',
  expected_outputs: ''
});

const create = async () => {
  console.log('test');
  alert(JSON.stringify(formData))
};
</script>
