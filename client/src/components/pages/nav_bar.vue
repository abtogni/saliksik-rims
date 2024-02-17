<template>
  <v-navigation-drawer v-if="showDrawer" expand-on-hover rail>
    <!-- Drawer content -->
    <v-list>
      <v-list-item :title="user.name" :subtitle="user.user_id"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- Sample -->
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="Researcher" value="myfiles" href="/researcher"
        link />
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="All Research Projects" value="myfiles" href=""
        link />
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" link />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" link />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

const user = { name: 'Test Account', user_id: '07-11312' }
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(async () => {
  const usersStore = useUsersStore();
  await usersStore.getUsers();
  user.value = usersStore.currentUser;
});

watchEffect(() => {
  showDrawer.value = route.path !== '/';
});
</script>
