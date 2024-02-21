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
            <v-btn variant="tonal" @click="statusType = 'Verify and Review'"
              prepend-icon="mdi-file-document-check-outline" type="submit" text="Submit" class="button-regular" />
            <v-btn variant="outlined" @click="statusType = 'Draft'" type="submit" prepend-icon="mdi-file-document-outline"
              text="Save as Draft" class="button-outlined" />
          </v-col>
        </v-row>

        <!--form-->

        <v-card class="card-concept-note">
          <v-text-field v-model="projectTitle.value.value" :error-messages="projectTitle.errorMessage.value"
            label="Project Title" density="compact" required variant="outlined" />
          <v-row>
            <v-col class="card-concept-note">
              <v-text-field v-model="implementingAgency.value.value"
                :error-messages="implementingAgency.errorMessage.value" label="Implementing Agency/Department"
                density="compact" required variant="outlined" />
              <v-text-field v-model="cooperatingAgency.value.value" :error-messages="cooperatingAgency.errorMessage.value"
                label="Cooperating Agency" density="compact" required variant="outlined">
                <v-tooltip activator="parent" location="top">
                  State the name of agency to be tapped for funding/
                  co-implementing the project.
                </v-tooltip>
              </v-text-field>
              <v-text-field v-model="siteOfImplementation.value.value"
                :error-messages="siteOfImplementation.errorMessage.value" label="Site/s of Implementation"
                density="compact" required variant="outlined" />
            </v-col>
            <v-col class="card-concept-note">
              <v-text-field v-model="projectDuration.value.value" :error-messages="projectDuration.errorMessage.value"
                label="Project Duration" density="compact" required variant="outlined">
                <v-tooltip activator="parent" location="top" width="30%">Specific dates that the project will be
                  undertaken
                  (month/year); ideally to be completed minimum 1 year/
                  depending on the approved grant.</v-tooltip>
              </v-text-field>
              <v-text-field v-model="totalProjectCost.value.value" :error-messages="totalProjectCost.errorMessage.value"
                label="Total Project Cost" density="compact" required variant="outlined">
                <v-tooltip activator="parent" location="top" width="30%">
                  Include the specific budget allocations for personnel service,
                  maintenance and operations, equipment, trainings/workshops,
                  and administrative costs.</v-tooltip>
              </v-text-field>
              <v-text-field v-model="fundingSource.value.value" :error-messages="fundingSource.errorMessage.value"
                label="Funding Source" density="compact" required variant="outlined">
                <v-tooltip activator="parent" location="top">
                  Specific funding source, including counterpart funds.
                </v-tooltip>
              </v-text-field>
            </v-col>
          </v-row>
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="projectDescription.value.value" :error-messages="projectDescription.errorMessage.value"
            label="Project Description" variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">
            Formally written declaration of the project and its idea and context
            to explain the goals and objectives to be reached and other relevant
            information that explains the need for the project and aims to
            describe the amount of work planned for implementation; refers to a
            simple explanation or depiction of the project that can be used as
            communication material.
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="significance.value.value" :error-messages="significance.errorMessage.value"
            label="Significance" variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">Refers to the alignment to UNC research agenda/ UN SDG
            / tapped
            agency provided in the matrix attached; review of literature may
            refer to the following: (a) related researches that have been
            conducted, state-of-the-art or current technologies from which the
            project will take off; (b) scientific/technical merit; (c) results
            of related research conducted by the same Project Leader, if any;
            (d) Prior Art Search, and; (e) other relevant.
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="objectives.value.value" :error-messages="objectives.errorMessage.value" label="Objectives"
            variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">Statements of the general and specific purposes to
            address the
            problem areas of the project; must anchor to the UNC agenda/ SDG/
            grant giving body’s agenda.
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="methodology.value.value" :error-messages="methodology.errorMessage.value"
            label="Methodology" variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">Discuss the following: (a) variables or parameters to
            be measured
            and evaluated or analyzed; (b) treatments to be used and their
            layout; (c) experimental procedures and design; (d) statistical
            analysis; (e) evaluation method and observations to be made,
            strategies for implementation (Conceptual/Analytical framework).
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="technologyRoadmap.value.value" :error-messages="technologyRoadmap.errorMessage.value"
            label="Technology Roadmap" variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">
            (If applicable) A visual document that communicates the plan for
            technology.
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="expectedOutputs.value.value" :error-messages="expectedOutputs.errorMessage.value"
            label="Expected Outputs (6Ps)" variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="75%">Deliverables of the project based on the 6Ps metrics of
            DOST/
            typical grants suggested deliverables (Publication,
            Patent/Intellectual Property, Product, People Service, Place and
            Partnership, and Policy).
          </v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
        <v-card class="card-concept-note2">
          <v-textarea v-model="workPlan.value.value" :error-messages="workPlan.errorMessage.value" label="Work Plan"
            variant="outlined" required rows="20" auto-grow />
          <v-tooltip activator="parent" location="top" width="25%">Detailed plan of activities and timeline for the
            project</v-tooltip>
          <v-file-input label="Upload images, charts, tables here, if necessary." variant="outlined" required chips
            multiple />
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router';
import { useResearchesStore } from '@/stores/researches';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
const r = useResearchesStore();
const research = r.currentResearch;
const statusType = ref('');

const { handleSubmit } = useForm({
  validationSchema: {
    projectTitle: (v: string) => v ? true : 'Field is required.',
    implementingAgency: (v: string) => v ? true : 'Field is required.',
    cooperatingAgency: (v: string) => v ? true : 'Field is required.',
    siteOfImplementation: (v: string) => v ? true : 'Field is required.',
    projectDuration: (v: string) => v ? true : 'Field is required.',
    totalProjectCost: (v: string) => !isNaN(Number(v)) ? true : 'Field must be a number.',
    fundingSource: (v: string) => v ? true : 'Field is required.',
    projectDescription: (v: string) => v ? true : 'Field is required.',
    significance: (v: string) => v ? true : 'Field is required.',
    objectives: (v: string) => v ? true : 'Field is required.',
    methodology: (v: string) => v ? true : 'Field is required.',
    technologyRoadmap: (v: string) => v ? true : 'Field is required.',
    expectedOutputs: (v: string) => v ? true : 'Field is required.',
    workPlan: (v: string) => v ? true : 'Field is required.',
  }
})

const projectTitle = useField('projectTitle');
const implementingAgency = useField('implementingAgency');
const cooperatingAgency = useField('cooperatingAgency');
const siteOfImplementation = useField('siteOfImplementation');
const projectDuration = useField('projectDuration');
const totalProjectCost = useField('totalProjectCost');
const fundingSource = useField('fundingSource');
const projectDescription = useField('projectDescription');
const significance = useField('significance');
const objectives = useField('objectives');
const methodology = useField('methodology');
const technologyRoadmap = useField('technologyRoadmap');
const expectedOutputs = useField('expectedOutputs');
const workPlan = useField('workPlan');

const create = handleSubmit(async (values) => {
  const data = JSON.stringify({
    researchStatus: 'Concept Note',
    conceptNote: {
      ...values,
      status: statusType.value
    }
  });
  // @ts-ignore
  return axios.patch(`/api/research/update/${research._id}`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(() => alert('Successfully created a new concept note'))
    .catch(() => alert('An error occurred')).finally(() => router.push('/researcher/research_projects'));
});
</script>
