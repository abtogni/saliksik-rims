
<template>
  <h1>Presentations</h1>
  <create_presentation_modal />
  <presentation_overview :presentation="presentation" />
</template>

<script setup lang="ts">
  import presentation from '@/assets/sample_presentation.json' with { type: 'json' }
</script>


