<template>
  <v-card class="user_table">
    <v-tabs v-model="tab">
      <v-tab color="#297be5" v-for="(user, i) in user_roles" :key="i" :value="user">{{ user }}</v-tab>
    </v-tabs>

    <v-container>
      <v-window >
        <v-window-item :value="tab">
          <user_preview :users="filteredUsers" />
        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const { userList } = defineProps(["userList"]);
const user_roles = [
  "Administrator",
  "Panelist",
  "Researcher",
];
const tab = ref(null);

const filteredUsers = computed(() =>
  tab.value
    ? userList.filter((user: any) => user.role === tab.value)
    : [],
);
</script>
