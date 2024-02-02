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


const props = defineProps(['sampleUsers']);
const user_roles = ["Admin", "Internal Panelist", "External Panelist", "Researcher"];
const tab = ref(null);

const filteredUsers = computed(() => tab.value ? props.sampleUsers.filter((user: any) => user.user_role === tab.value) : []);
</script>

<style lang="scss">
  @import '../../styles/pages/manage-accounts.scss';
</style>
