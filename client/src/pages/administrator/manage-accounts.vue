<template>
  <h1>Manage User Accounts</h1>
  <div id="user_list">
    <h3>{{ users.userCount }} accounts</h3>
    <create_user_modal />
    <User_list id="user_container" :userList="users.userList" />
  </div>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users';

const users = useUsersStore();

</script>

<style lang="scss">
h1 {
  text-align: center;
}
</style>
