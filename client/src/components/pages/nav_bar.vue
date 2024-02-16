<template>
  <v-navigation-drawer v-if="showDrawer" expand-on-hover rail>
    <!-- Drawer content -->
    <v-list v-if="user">
      <v-list-item :title="user.firstName + ' ' + user.lastName" :subtitle="user.email" />
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
import { ref, watchEffect, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUsersStore, User } from '@/stores/users';

const user = ref<User | null>(null);
const showDrawer = ref(false);

const route = useRoute();

onMounted(async () => {
  const usersStore = useUsersStore();
  await usersStore.getCurrentUser();
  console.log(usersStore.currentUser);
  await usersStore.getUsers();
  user.value = usersStore.currentUser;
});

watchEffect(() => {
  showDrawer.value = route.path !== '/';
});
</script>
