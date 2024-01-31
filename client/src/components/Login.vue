<template>
  <v-container id="login-container" class="fill-height" fluid>
    <v-row class="login-row">
      <img src="@/assets/schoolSeal.png" alt="schoolLogo">
    </v-row>
    <v-row class="login-row">

      <v-card
      id="login-field"
      elevation="2"
      >
      <h1>Login</h1>
          <v-form fast-fail @submit.prevent="login">
            <v-text-field
              :error-messages="v$.user_id.$errors.map((e:any) => e.$message)"
              v-model="form_data.user_id"
              label="User ID"
              prepend-inner-icon="mdi-account"
              variant="outlined"
              required
            ></v-text-field>
            <v-text-field
              v-model="form_data.password"
              label="Password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline"
              variant="outlined"
              @click:append-inner="toggleVisibility"
              required
            ></v-text-field>
            <v-select
              v-model="form_data.user_type"
              label="User Type"
              :items="user_types"
              variant="outlined">
            </v-select>

            <v-btn type="submit" @click="submit" block id="login-button">
              Submit
            </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { reactive, ref } from 'vue';

  const form_data = reactive({
        user_id: '',
        password: '',
        user_type: '',
      })
  const visible = ref(false);
  const toggleVisibility = () => {
      visible.value = !visible.value;
    };

  const user_types = ['Admin', 'Panelist', 'Researcher'];


  async function submit(e: Event) {
    e.preventDefault();

  }

</script>
