<template>
  <v-container id="login-container" class="fill-height" fluid>
    <v-row class="login-row">
      <img src="@/assets/schoolSeal.png" alt="schoolLogo" />
    </v-row>
    <v-row class="login-row">
      <v-card id="login-field" elevation="2">
        <h1>Account Login</h1>

        <v-form fast-fail @submit.prevent="login">
          <v-select
          class="input-field"
            v-model="form_data.user_role"
            label="User Role"
            :error-messages="v$.user_type.$errors.map((e:any) => e.$message)"
            :items="user_roles"
            variant="outlined"
          >
          </v-select>
          <v-text-field
          class="input-field"
            :error-messages="v$.user_id.$errors.map((e:any) => e.$message)"
            v-model="form_data.user_id"
            label="User ID"
            prepend-inner-icon="mdi-account"
            variant="outlined"
            required
          ></v-text-field>
          <v-text-field
            class="input-field"
            v-model="form_data.password"
            :error-messages="v$.password.$errors.map((e:any) => e.$message)"
            label="Password"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="toggleVisibility"
            required
          ></v-text-field>


          <v-btn type="submit" block id="login-button"> Login </v-btn>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { minLength, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import { reactive, ref } from "vue";

const form_data = reactive({
  user_id: "",
  password: "",
  user_role: "",
});
const visible = ref(false);
const toggleVisibility = () => {
  visible.value = !visible.value;
};

const user_roles = ["Admin", "Internal Panelist" , "External Panelist", "Researcher"];
const rules = {
  user_id: {
    required,
    minLength: minLength(6),
  },
  password: {
    required,
    minLength: minLength(6),
  },
  user_type: {
    required,
  },
};

const v$ = useVuelidate(rules, form_data);

const login = async () => {
  const response = await v$.value.$validate();
  if (response) {
    alert("Form successfully submitted!");
  } else {
    alert("Form has an error");
  }
};
</script>
