<template>
  <v-hover v-slot:default="{ isHovering, props }">
    <v-card flat rounded="0" v-bind="props" :color="isHovering ? '#eef2ff' : undefined">
      <v-card-text class="notif-body" v-for="user in users" :key="user.userID">
        <h7>{{ `${user.firstName} ${user.lastName}` }} </h7>
      </v-card-text>
    </v-card>
  </v-hover>
</template>


<script setup lang="ts">
const { users } = defineProps(['users'])
</script>
