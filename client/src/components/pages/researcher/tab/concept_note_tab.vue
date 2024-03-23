<template>
  <v-card variant="flat" class="overview-ctr">
    <v-card variant="flat" >
      <v-card-title style="padding-bottom: 2rem;">
        <h5>
          {{ data.projectTitle }}
        </h5>
      </v-card-title>
      <v-card-text class="row">
        <div class="col">
          <p class="p-reg">
            <span style="font-weight: 700; color: #111827;">Implementing Agency/Department </span
            ><br />{{ data.implementingAgency }}
          </p>
          <p class="p-reg">
            <span style="font-weight: 700; color: #111827;">Site/s Of Implementation </span
            ><br />{{ data.siteOfImplementation }}
          </p>
          <p class="p-reg">
            <span style="font-weight: 700; color: #111827;">Cooperating Agency </span><br />{{
              data.cooperatingAgency
            }}
          </p>
        </div>
        <div class="col">
          <p class="p-reg">
            <span style="font-weight: 700; color: #111827;">Project Duration </span><br />{{
              data.projectDuration
            }}
          </p>
          <p class="p-reg" >
            <span style="font-weight: 700; color: #111827;">Project Cost </span><br />{{
              data.totalProjectCost
            }}
          </p>
          <p class="p-reg">
            <span style="font-weight: 700; color: #111827;">Funding Source </span><br />{{
              data.fundingSource
            }}
          </p>
        </div>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Project Description</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">
          {{ data.projectDescription }}
        </p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Significance</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.significance }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Objectives</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.objectives }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6 >Methodology</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.methodology }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Technology Roadmap</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.technologyRoadmap }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Expected Outputs (6Ps)</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.expectedOutputs }}</p>
      </v-card-text>
    </v-card>
    <v-card variant="flat" >
      <v-card-title>
        <h6>Work Plan</h6>
      </v-card-title>
      <v-card-text>
        <p class="p-reg">{{ data.workPlan }}</p>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script setup lang="ts">
const { data } = defineProps(["data"]);
</script>
