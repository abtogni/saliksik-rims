<template>
  <v-card flat class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6>Panelist</h6>
        </div>
      </div>


    </v-card-title>

    <v-divider />

    <v-hover v-slot:default="{ isHovering, props }">
      <v-card flat rounded="0" v-bind="props" :color="isHovering ? '#eef2ff' : undefined" style="height: fit-content">
        <v-card-text class="pres-res-body">
          <div class="pres-res-left">
            <v-btn variant="text" icon="mdi-account-multiple-outline"> </v-btn>
            <div class="text">{{ panelists.join(', ') }}</div>
          </div>
          <div class="pres-res-right">
          </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-card>
</template>

<script setup lang="ts">
const { panelists } = defineProps(['panelists']);
</script>
