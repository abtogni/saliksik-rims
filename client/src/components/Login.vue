<template>
  <v-container id="login-container" class="fill-height" fluid>
    <v-row class="login-row">
      <img src="@/assets/schoolSeal.png" alt="schoolLogo" />
    </v-row>
    <v-row class="login-row">
      <v-card id="login-field" elevation="8">
        <h6>Account Login</h6>
        <v-form fast-fail @submit.prevent="login">
          <v-select
          class="input-field"
            v-model="form_data.user_role"
            label="User Role"
            :items="user_roles"
            variant="outlined"
            :rules="field_required"
          >
          </v-select>
          <v-text-field
          class="input-field"
            v-model="form_data.user_id"
            label="User ID"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            :rules="userid_rules"
          ></v-text-field>
          <v-text-field
            class="input-field"
            v-model="form_data.password"
            label="Password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
            :rules="password_rules"
          ></v-text-field>
          <v-btn type="submit" block id="login-button"> Login </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import router from '@/router';
import { ref, reactive } from 'vue';

  const form_data = reactive({
    user_role: null,
    user_id: "",
    password: "",
  });
  const visible = ref(false);

  const field_required = [
    (v: any) => !!v || "Field is required",
  ]

  const userid_rules = [
    ...field_required,
    (v: any) => (v && v.length > 5) || 'User ID must be atleast 6 characters',
  ]

  const password_rules = [
    ...field_required,
    (v: any) => (v && v.length > 5) || 'Password must be atleast 6 characters',
  ]


  const user_roles = ["Admin", "Internal Panelist" , "External Panelist", "Researcher"];

  const login = async () => {
    alert(JSON.stringify(form_data))
    router.push('administrator/concept-note-approval');
  };
</script>
