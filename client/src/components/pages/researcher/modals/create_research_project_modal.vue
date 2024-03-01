<template>
  <v-btn
    flat
    prepend-icon="mdi-folder-plus-outline"
    class="button-regular"
    @click="prompt = true"
    text="Create
    Research Project"
  />
  <v-dialog v-model="prompt">
    <v-card class="form_modal">
      <v-toolbar color="primary">
        
        <v-toolbar-title>Create New Research</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form class="form_content" @submit.prevent="create">
        <v-textarea class="inputs" label="Research Title" :error-messages="researchTitle.errorMessage.value"
          v-model="researchTitle.value.value" variant="outlined" />
        <!-- @vue-ignore -->
        <v-select multiple class="input-field" v-model="researchLeaders.value.value"
          :error-messages="researchLeaders.errorMessage.value" label="Research Leaders" prepend-inner-icon="mdi-briefcase"
          :items="users" item-title="name" item-value="key" variant="outlined" />

        <v-btn type="submit" class="button-regular">Create New Research</v-btn>
      </v-form>

    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

import { useUsersStore } from '@/stores/users';
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';

const users = ref<{ key: any; name: string; }[]>([]);
const prompt = ref(false);


const { handleSubmit } = useForm({
  validationSchema: {
    researchTitle(v: string) {
      if (v) return true;

      return 'Field is required.'
    },
    researchLeaders(v: any[]) {
      if (Array.isArray(v) && v.length > 0) return true;
      return 'At least one research leader is required.';
    },
  }
})

const researchTitle = useField('researchTitle');
const researchLeaders = useField('researchLeaders');

const create = handleSubmit(async (values) => {
  const data = JSON.stringify(values);

  return axios.post('/api/research/create', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    alert("Succesfully created a new research");
    location.reload();
  }).catch((e) => {
    alert(`An error occurred while creating a new research with error ${e}.`);
  })
});

onMounted(async () => {
  const userList = useUsersStore().userList;
  users.value = userList.map((user: any) => ({
    key: user._id,
    name: user.firstName + ' ' + user.lastName
  }));
});

</script>



<style lang="scss">
.form {
  margin: 0 auto;
  height: 25rem;
  width: 40rem;

  .form_content {
    padding: 2rem;

    .inputs {
      margin-bottom: 1rem;
    }
  }
}
</style>
