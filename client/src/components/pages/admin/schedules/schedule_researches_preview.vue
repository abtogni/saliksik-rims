<template>
  <v-card flat class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6>Researches</h6>
        </div>
      </div>
    </v-card-title>

    <v-divider />
    <card style="width: 100%">
      <v-hover
        v-slot:default="{ isHovering, props }"
        v-for="research in researchData"
        :key="research._id"
      >
        <v-card
          flat
          rounded="0"
          v-bind="props"
          :color="isHovering ? '#eef2ff' : undefined"
          style="width: 100%"
        >
          <v-card-text class="pres-res-body">
            <div class="pres-res-left truncate">
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-icon></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Researchers</div>
                  <div
                    v-for="leader in research.researchLeaders"
                    :key="leader._id"
                  >
                    {{ leader.name }}
                  </div>
                </v-tooltip>
              </v-btn>
                <p class="p-reg b truncate">
                  {{ research.name }}
                </p>
            </div>
            <div class="pres-res-right" style="display: flex; flex-direction: row; gap: 0.5rem">
              
                <v-chip variant="text" class="b button-outlined">Time </v-chip>
                <v-chip color="primary" class="b">insert department </v-chip>
             
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </card>
  </v-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";

const { presentations, researches } = defineProps([
  "presentations",
  "researches",
]);

const presentationData: any = ref([]);
const researchData: any = ref([]);

onMounted(async () => {
  presentationData.value = await Promise.all(
    presentations.map(async (p: any) => {
      const response = await axios.get(`/api/presentation/${p}`);
      return response.data;
    }),
  );
  researchData.value = researches.filter((research: any) =>
    presentationData.value.some(
      (presentation: any) => presentation.research_id === research._id,
    ),
  );
});
</script>
