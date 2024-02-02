<template>
  <h1>Manage User Accounts</h1>


  <div id="user_list">
      <h3>{{ user_count }} accounts</h3>
      <v-btn color="#297be5" class="new_user">Create New Account</v-btn>
      <User_list id="user_container" />
  </div>
</template>

<script setup lang="ts">
const user_count = 1;
</script>
<style lang="scss">

  @import '../../styles/manage-accounts.scss';
</style>
