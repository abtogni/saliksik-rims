<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Welcome to the Incentives Page</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h2>Incentives List</h2>
          </v-card-title>
          <v-data-table :headers="headers" :items="incentives" :search="search" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const search = ref('');

const headers = [
  { title: 'Name', key: 'name' },
  { title: 'Description', key: 'description' },
  { title: 'Amount', key: 'amount' },
  { title: 'Actions', key: 'actions', sortable: false },
];

const incentives = ref([
  { name: 'Incentive 1', description: 'Description 1', amount: 100 },
  { name: 'Incentive 2', description: 'Description 2', amount: 200 },
  { name: 'Incentive 3', description: 'Description 3', amount: 300 },
]);
</script>


