<template>
  <v-container id="login-container" class="fill-height" fluid>
    <v-row class="login-row">
      <img src="@/assets/schoolSeal.png" alt="schoolLogo" />
    </v-row>
    <v-row class="login-row">
      <v-card id="login-field" elevation="8">
        <h6>Account Login</h6>
        <v-form @submit.prevent="login">
          <!-- @vue-ignore -->
          <v-select class="input-field" v-model="role.value.value" :error-messages="role.errorMessage.value"
            label="User Role" prepend-inner-icon="mdi-briefcase" :items="user_roles" variant="outlined" />
          <v-text-field class="input-field" v-model="userID.value.value" :error-messages="userID.errorMessage.value"
            label="User ID" prepend-inner-icon="mdi-account" variant="outlined" />
          <v-text-field class="input-field" label="Password" v-model="password.value.value"
            :error-messages="password.errorMessage.value" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'" prepend-inner-icon="mdi-lock-outline" variant="outlined"
            @click:append-inner="visible = !visible" />
          <v-btn color="#297be5" type="submit" block> Login </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from "axios";
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';

const visible = ref(false);


const { handleSubmit, setFieldError } = useForm({
  validationSchema: {
    role: (v: string) => v ? true : 'Field is required.',
    userID: (v: string) => v ? true : 'User ID is required.',
    password: (v: string) => v ? true : 'Password is required.'
  }
})

const role = useField('role');
const userID = useField('userID');
const password = useField('password');

const user_roles = ["Administrator", "Panelist", "Researcher"];

const login = handleSubmit(async (values) => {
  const data = JSON.stringify(values);

  return axios.post('/api/auth/login', data, {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    alert(response.data.message);
    if (response.data.role == 'Administrator') {
      window.location.href = '/administrator/concept_note_approval';
    } else if (response.data.role == 'Researcher') {
      window.location.href = '/researcher/research_projects';
    } else if (response.data.role == 'Panelist') {
      window.location.href = '/panelists';
    }
  }).catch(error => {

    if (error.response && error.response.data) {
      const { passwordError, userError } = error.response.data;
      if (passwordError) {
        setFieldError('password', passwordError);
      } else if (userError) {
        setFieldError('userID', userError);
      } else {
        alert('An error occurred while logging in.');
      }
    } else {
      alert('An error occurred while logging in.');
    }
  })
});

</script>
