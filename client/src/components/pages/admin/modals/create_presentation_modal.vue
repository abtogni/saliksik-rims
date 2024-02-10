<template>
  <v-btn class="button-regular" outlined @click="prompt = true">Create Presentation</v-btn>

  <v-dialog v-model="prompt">
    <v-card class="form_modal">
      <v-toolbar color="primary">
        <v-toolbar-title>Create Presentation Schedule</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form class="form_content" @submit.prevent="">
        <p>Date and Time</p>
        <VueDatePicker label="Date and Time" v-model="form_data.date" :min-date="new Date()" :is-24="false" />

        <v-text-field
          v-model="form_data.location"
          label="Location"
          variant="outlined"
        />

        <v-select
            label="Researches"
            multiple
            variant="outlined"
            v-model="form_data.research_ids"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          />

          <v-select
            label="Panelists"
            multiple
            variant="outlined"
            v-model="form_data.panelist_ids"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          />

          <v-btn @click="confirm = true" class="button-regular">Confirm Schedule</v-btn>

          <v-dialog v-model="confirm">
            <v-card class="dialog-box">
              <p>These will alert the research members of these researches: {{ form_data.research_ids.join(', ') }}. Do you want to send a notification to present?</p>
              <v-btn class="button-regular" type="submit">Confirm</v-btn>
              <v-btn @click="confirm = false">Cancel</v-btn>
            </v-card>
          </v-dialog>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
const prompt = ref(false);
const confirm = ref(false);

const form_data = reactive({
  date: null,
  location: '',
  research_ids: [],
  panelist_ids: []
});

</script>

<style lang="scss">
  .dialog-box{
    margin: 0 auto;
    padding: 2rem;
    width: 20rem;
  }
</style>
