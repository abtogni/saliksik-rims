<template>
  <h1>Manage User Accounts</h1>
  <div id="user_list">
      <h3>{{ sampleUsers.length }} accounts</h3>
      <Create_user_modal />
      <User_list id="user_container" :sampleUsers="sampleUsers" />
  </div>
</template>

<script setup lang="ts">
  const sampleUsers = [
    { user_id: '12345661', first_name: 'John', last_name: 'Doe', user_role: 'Admin' },
    { user_id: '34567851', first_name: 'Jane', last_name: 'Doe', user_role: 'Researcher' },
    { user_id: '33353151', first_name: 'James', last_name: 'Bond', user_role: 'Internal Panelist' },
    { user_id: '33212331', first_name: 'Fredrik', last_name: 'Chopan', user_role: 'Internal Panelist' },
    { user_id: '33243431', first_name: 'Test', last_name: 'A', user_role: 'External Panelist' },
    { user_id: '41243431', first_name: 'Test', last_name: 'B', user_role: 'External Panelist' },
  ];
</script>
