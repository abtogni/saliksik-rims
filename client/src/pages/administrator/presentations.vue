
<template>
  <h1>Presentations</h1>
  <v-btn class="button-regular" outlined>Create Presentation</v-btn>
  <presentation_overview :presentation="presentation" />
</template>

<script setup lang="ts">
  import presentation from '@/assets/sample_presentation.json' with { type: 'json' }
</script>


