<template>
  <h1>Manage User Accounts</h1>

  <span>{{ user_count }} accounts</span>
  <User_list />
</template>

<script setup lang="ts">
const user_count = 1;
</script>
<style lang="scss">

  @import '../../styles/manage-accounts.scss';
</style>
