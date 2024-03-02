<template>
  <!-- @vue-skip -->
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Concept Note Overview</h5>
          <!-- <p class="help" style="padding-top: 0.3rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >Create and submit concept note to start.
            </v-tooltip>
          </p> -->
        </div>
      </div>

      <div class="header-right">
        <concept_note_approve/>
        <concept_note_reject/>
      </div>
    </v-card-title>
    <v-card-text>
      <v-card variant="flat" class="overview-ctr" v-if="c">
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h5>
              {{ c.conceptNote.projectTitle }}
            </h5>
          </v-card-title>
          <v-card-text class="row">
            <div class="col">
              <div class="row-start">
                <div
                  class="p-reg b"
                  v-for="(leader, index) in c.researchLeaders"
                  :key="index"
                >
                  {{ leader.name }}
                </div>
              </div>
              <div class="row" style="padding-top: 0rem">
                <div class="col">
                  <div class="col-sm">
                    <h6>Implementing Agency/Department</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.implementingAgency }}
                    </p>
                  </div>
                  <div class="col-sm">
                    <h6>Site/s Of Implementation</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.siteOfImplementation }}
                    </p>
                  </div>
                  <div class="col-sm">
                    <h6>Cooperating Agency</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.cooperatingAgency }}
                    </p>
                  </div>
                </div>
                <div class="col">
                  <div class="col-sm">
                    <h6>Project Duration</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.projectDuration }}
                    </p>
                  </div>
                  <div class="col-sm">
                    <h6>Project Cost</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.totalProjectCost }}
                    </p>
                  </div>
                  <div class="col-sm">
                    <h6>Funding Source</h6>
                    <p class="p-reg b">
                      {{ c.conceptNote.fundingSource }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Project Description</h6>
          </v-card-title>
          <v-card-text class="p-reg b"
            >{{ c.conceptNote.projectDescription }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Significance</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.significance }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Objectives</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.objectives }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Methodology</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.methodology }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Technology Roadmap</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.technologyRoadmap }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Expected Outputs (6Ps)</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.expectedOutputs }}
          </v-card-text>
        </v-card>
        <v-card variant="flat" color="#fff7ed">
          <v-card-title>
            <h6>Work Plan</h6>
          </v-card-title>
          <v-card-text class="p-reg b">
            {{ c.conceptNote.workPlan }}
          </v-card-text>
        </v-card>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";
import { onMounted, ref } from "vue";

const c = ref(null);
const id = window.location.href.split("/").slice(-1)[0];

onMounted(async () => {
  const researchStore = useResearchesStore();
  await researchStore.getCurrentResearch(id);
  c.value = researchStore.currentResearch;
});
</script>
