<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left truncate">
          <div class="header-caption">
            <h2>
              Accounts
              <v-chip class="header-count">
                {{ users.userCount }}
              </v-chip>
            </h2>

            <p class="caption">
              Create and manage accounts here.
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <create_user_modal />
        </div>
      </v-card-title>
      <v-card-text elevation="5" class="content">
        <v-card elevation="5">
          <User_list id="user_container" :userList="users.userList" />
        </v-card>
      </v-card-text>
    </v-card>
  </v-container>
  <h1>Manage User Accounts</h1>
  <div id="user_list">
    <h3>{{ users.userCount }} accounts</h3>
    <create_user_modal />
    <User_list id="user_container" :userList="users.userList" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';

const users = useUsersStore();
onMounted(async () => {
  await users.getUsers();
})
</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
