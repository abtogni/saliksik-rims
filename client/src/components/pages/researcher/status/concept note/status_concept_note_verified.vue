<template>
  <v-chip
    color="primary"
    prepend-icon="mdi-file-document-outline"
    class="status-txt"
    >Concept Note | Verified
    <div>
      <v-icon end icon="mdi-check-circle-outline"></v-icon>
      <v-tooltip activator="parent" location="bottom">
        The submitted concept note is verified and is due for a presentation.
      </v-tooltip>
    </div>
  </v-chip>
</template>
