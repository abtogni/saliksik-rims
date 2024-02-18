<template>
  <v-card class="user_table">
    <v-tabs v-model="tab" align-tabs="center">
      <v-tab color="#297be5" v-for="(user, i) in user_roles" :key="i" :value="user">{{ user }}</v-tab>
    </v-tabs>

    <v-container>
      <v-window>
        <v-window-item :value="tab">
          <div v-for="user in filteredUsers" :key="user.userID">{{ `${user.firstName} ${user.lastName}` }}</div>

        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';


const props = defineProps(['userList']);
const user_roles = ["Administrator", "Internal Panelist", "External Panelist", "Researcher"];
const tab = ref(null);

const filteredUsers = computed(() => tab.value ? props.userList.filter((user: any) => user.role === tab.value) : []);
</script>

