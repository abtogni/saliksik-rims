<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body">
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <v-badge
              :content="users.userCount"
              color="primary"
              prepend-icon="mdi-folder-multiple-outline"
              style="text-align: start; width: fit-content"
            >
              <h5 style="margin-right: 0.5rem">Accounts</h5>
            </v-badge>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom">
                Create and manage accounts here.
              </v-tooltip>
            </p>
          </div>
        </div>
        <!--cta container-->
        <div class="header-right">
          <create_user_modal />
        </div>
      </v-card-title>
      <v-card-text elevation="0" class="content">
        <v-card elevation="0" variant="flat">
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
