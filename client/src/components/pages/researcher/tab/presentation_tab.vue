<template>
<div>
  <div v-for="p in presentations" :key="p._id">
    <presentation_overview :p="p" />
  </div>
</div>
</template>

<script setup lang="ts">
import moment from 'moment';

const { presentations } = defineProps(['presentations']);
</script>
