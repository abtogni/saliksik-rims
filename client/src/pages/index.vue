<template>
  <Login />
</template>

<script lang="ts" setup>
import { useUsersStore } from '@/stores/users';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const usersStore = useUsersStore();
const router = useRouter();

onMounted(async () => {
  await usersStore.getCurrentUser();

  if (usersStore.currentUser !== null) {
    router.push('/researcher');
  }
})
</script>
