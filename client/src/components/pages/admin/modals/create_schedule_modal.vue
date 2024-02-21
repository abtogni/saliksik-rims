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


        <date-picker label="Date and Time" v-model="dateAndTime.value.value" />

        <v-text-field v-model="location.value.value" label="Location" :error-messages="location.errorMessage.value"
          variant="outlined" />

        <!-- @vue-ignore -->
        <v-select label="Researches" multiple variant="outlined" v-model="researches.value.value"
          :error-messages="researches.errorMessage.value" :items="researchList" item-title="name" item-value="key" />

        <!-- @vue-ignore -->
        <v-select label="Panelists" multiple variant="outlined" v-model="panelists.value.value"
          :error-messages="panelists.errorMessage.value" :items="users" item-title="name" item-value="key" />

        <v-btn class="button-regular" type="submit">Confirm</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useUsersStore } from '@/stores/users';
import { useResearchesStore } from '@/stores/researches';
import { useField, useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import axios from 'axios';
import router from '@/router';

const prompt = ref(false);
const users = ref<{ key: any; name: string; }[]>([]);
const researchList = ref<{ key: any; name: string; }[]>([]);

const { handleSubmit } = useForm({
  validationSchema: {
    dateAndTime(v: string) {
      if (v) return true;

      return 'Please enter a string.'
    },
    location(v: string) {
      if (v) return true;

      return 'Please enter a string.'
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

const dateAndTime = useField('dateAndTime');
const location = useField('location');
const panelists = useField('panelists');
const researches = useField('researches')

const create = handleSubmit(async values => {
  const data = JSON.stringify(values);
  return axios
    .post('/api/schedule/create', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => alert('Successfully set a new schedule'))
    .catch(() => alert('An error occurred'))
    .finally(() => window.location.reload());
});

onMounted(async () => {
  await useResearchesStore().getResearchList();
  const userStore = useUsersStore().userList;
  const researchStore = useResearchesStore().researchList;
  users.value = userStore.map((user: any) => ({
    key: user._id,
    name: user.firstName + ' ' + user.lastName
  }));

  researchList.value = researchStore.map((research: any) => ({
    key: research._id,
    name: research.researchTitle
  }));
});
</script>

<style lang="scss">
.dialog-box {
  margin: 0 auto;
  padding: 2rem;
  width: 20rem;
}
</style>
