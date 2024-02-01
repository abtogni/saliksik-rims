<template>
  <v-card>
    <v-tabs
      v-model="tab"
      align-tabs="center"
    >
      <v-tab
        v-for="(user, i) in user_roles"
        :key="i"
        :value="i"
      >{{user}}</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in user_roles.length"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          Yo
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const user_roles = ["Admin", "Internal Panelist" , "External Panelist", "Researcher"];
const tab = ref(null);
</script>
