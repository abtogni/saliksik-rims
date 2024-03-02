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

    <card style="width: 100%;">
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
          style="width: 100%;"
        >
          <v-card-text class="pres-res-body">
            <div class="pres-res-left ">
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
              <div class="text">
                <p class="truncate-table">
                  {{ research.researchTitle }}
                </p>
                
              </div>
            </div>
            <div class="pres-res-right">
            <v-btn variant="text" icon="mdi-file-eye-outline">
                <v-icon></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >Overview
                </v-tooltip>
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-hover>
    </card>
  </v-card>
</template>

<script setup lang="ts">
import { useResearchesStore } from "@/stores/researches";

const { presentations, users } = defineProps(["presentations", "users"]);
//@ts-ignore
const researchData = useResearchesStore().researchList.filter((research) =>
  presentations.some(
    (presentation: any) => presentation.researchID === research._id,
  ),
);
</script>
