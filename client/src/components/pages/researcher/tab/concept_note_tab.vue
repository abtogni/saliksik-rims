<template>
  <v-card variant="flat" class="overview-ctr">
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h5>
          {{ data.projectTitle }}
        </h5>
      </v-card-title>
      <v-card-text class="row">
        <div class="col">
          <p>
            <span style="font-weight: 500">Implementing Agency/Department </span
            ><br />{{ data.implementingAgency }}
          </p>
          <p>
            <span style="font-weight: 500">Site/s Of Implementation </span
            ><br />{{ data.siteOfImplementation }}
          </p>
          <p>
            <span style="font-weight: 500">Cooperating Agency </span><br />{{
              data.cooperatingAgency
            }}
          </p>
        </div>
        <div class="col">
          <p>
            <span style="font-weight: 500">Project Duration </span><br />{{
              data.projectDuration
            }}
          </p>
          <p>
            <span style="font-weight: 500">Project Cost </span><br />{{
              data.totalProjectCost
            }}
          </p>
          <p>
            <span style="font-weight: 500">Funding Source </span><br />{{
              data.fundingSource
            }}
          </p>
        </div>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Project Description</h6>
      </v-card-title>
      <v-card-text>
        <p>
          {{ data.projectDescription }}
        </p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Significance</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.significance }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Objectives</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.objectives }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Methodology</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.methodology }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Technology Roadmap</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.technologyRoadmap }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Expected Outputs (6Ps)</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.expectedOutputs }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" color="#fff7ed">
      <v-card-title>
        <h6>Work Plan</h6>
      </v-card-title>
      <v-card-text>
        <p>{{ data.workPlan }}</p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
const { data } = defineProps(["data"]);
</script>
