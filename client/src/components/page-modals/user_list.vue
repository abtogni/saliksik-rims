<template>
  <v-card class="user_table">
    <v-tabs v-model="tab" align-tabs="center">
      <v-tab
        color="#297be5"
        v-for="(user, i) in user_roles"
        :key="i"
        :value="user"
      >{{ user }}</v-tab>
    </v-tabs>

    <v-container>
      <v-window>
        <v-window-item :value="tab">
          <div
          v-for="user in filteredUsers"
            :key="user.user_id"
          >{{ `${user.first_name} ${user.last_name}` }}</div>

        </v-window-item>
      </v-window>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const user_roles = ["Admin", "Internal Panelist", "External Panelist", "Researcher"];
const tab = ref(null);

const sampleUsers = [
  { user_id: '12345661', first_name: 'John', last_name: 'Doe', user_role: 'Admin' },
  { user_id: '34567851', first_name: 'Jane', last_name: 'Doe', user_role: 'Researcher' },
  { user_id: '33353151', first_name: 'James', last_name: 'Bond', user_role: 'Internal Panelist' },
  { user_id: '33212331', first_name: 'Fredrik', last_name: 'Chopan', user_role: 'Internal Panelist' },
  { user_id: '33243431', first_name: 'Test', last_name: 'A', user_role: 'External Panelist' },
  { user_id: '41243431', first_name: 'Test', last_name: 'B', user_role: 'External Panelist' },
];

const filteredUsers = computed(() => tab.value ? sampleUsers.filter(user => user.user_role === tab.value) : []);
</script>

<style lang="scss">
  @import '../../styles/manage-accounts.scss';
</style>
