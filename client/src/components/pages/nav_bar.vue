<template>
  <v-navigation-drawer
    v-if="showDrawer"
    expand-on-hover
    rail
  >
    <!-- Drawer content -->
    <v-list>
      <v-list-item
        :title="user.name"
        :subtitle="user.user_id"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="All Research Projects" value="myfiles" href=""></v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared"></v-list-item>
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

  const user = {name: 'Test Account', user_id: '07-11312'}
  import { ref, watchEffect } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const showDrawer = ref(route.path !== '/');

  watchEffect(() => {
    showDrawer.value = route.path !== '/';
  });
</script>
