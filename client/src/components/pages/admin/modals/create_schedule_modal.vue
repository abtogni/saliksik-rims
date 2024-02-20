<template>
  <v-btn flat prepend-icon="mdi-calendar-plus-outline" class="button-regular" @click="prompt = true"
    text="Create Schedule" />

  <v-dialog v-model="prompt">
    <v-card class="form_modal">
      <v-toolbar color="primary">
        <v-toolbar-title>Create Presentation Schedule</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form class="form_content" @submit.prevent="create">
        <p>Date and Time</p>
        <VueDatePicker label="Date and Time" v-model="dateAndTime.value.value" :min-date="new Date()" :is-24="false"
          aria-errormessage="dateAndTime.errorMessage.value" />

        <v-text-field v-model="location.value.value" label="Location" :error-messages="dateAndTime.errorMessage.value"
          variant="outlined" required />

        <v-select label="Researches" multiple variant="outlined" required v-model="researches.value.value"
          :error-messages="researches.errorMessage.value"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" />

        <v-select label="Panelists" multiple variant="outlined" required v-model="panelists.value.value"
          :error-messages="panelists.errorMessage.value"
          :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']" />

        <v-btn class="button-regular" type="submit">Confirm</v-btn>
        <!-- <v-btn @click="confirm = true" class="button-regular">Confirm Schedule</v-btn>

        <v-dialog v-model="confirm">
          <v-card class="dialog-box">
            <p>These will alert the research members of these researches: {{ researches.value.value }}. Do you
              want to send a notification to present?</p>
            <v-btn class="button-regular" type="submit">Confirm</v-btn>
            <v-btn @click="confirm = false">Cancel</v-btn>
          </v-card>
        </v-dialog> -->
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';

const prompt = ref(false);
const confirm = ref(false);

const dateAndTime = useField('dateAndTime');
const location = useField('location');
const panelists = useField('panelists');
const researches = useField('researches')

const { handleSubmit } = useForm({
  validationSchema: {
    dateAndTime(v: string) {
      if (v) return true;

      return 'Select an item.'
    },
    location(v: string) {
      if (v) return true;

      return 'Select an item.'
    },
    panelists(v: string) {
      if (v) return true;

      return 'Select an item.'
    },
    researches(v: string) {
      if (v) return true;

      return 'Select an item.'
    },
  }
});

const create = handleSubmit(async values => {
  console.log(JSON.stringify(values));
})

</script>

<style lang="scss">
.dialog-box {
  margin: 0 auto;
  padding: 2rem;
  width: 20rem;
}
</style>
