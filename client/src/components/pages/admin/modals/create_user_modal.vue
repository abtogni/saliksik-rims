<template>
  <v-btn variant="flat" prepend-icon="mdi-account-plus-outline" class="new_user button-regular">Create Account
    <v-dialog v-model="create_user" activator="parent">
      <v-card class="form_modal">
        <v-toolbar color="#1d4ed8">
          <v-toolbar-title>Create Account</v-toolbar-title>
          <v-btn icon="mdi-close" @click="create_user = false">
          </v-btn>
        </v-toolbar>
        <v-form class="form_content" @submit.prevent="register">
          <div style="display: flex; flex-direction: column; gap: 1rem">
            <!-- @vue-ignore -->
            <v-select v-model="role.value.value" label="User Role" :error-messages="role.errorMessage.value"
              prepend-inner-icon="mdi-card-account-details-outline" :items="user_roles" variant="outlined" />
            <div style="display: flex; flex-direction: row; gap: 1rem">
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value" label="UNC Email"
                variant="outlined" />

              <v-text-field v-model="affiliation.value.value" :error-messages="affiliation.errorMessage.value"
                label="Affiliation" variant="outlined" />
            </div>
            <div style="display: flex; flex-direction: row; gap: 1rem">
              <v-text-field v-model="firstName.value.value" :error-messages="firstName.errorMessage.value"
                label="First Name" variant="outlined" />
              <v-text-field v-model="middleName.value.value" :error-messages="middleName.errorMessage.value"
                label="Middle Name" variant="outlined" />
            </div>

            <v-text-field v-model="lastName.value.value" :error-messages="lastName.errorMessage.value" label="Last Name"
              variant="outlined" />
            <div style="display: flex; flex-direction: row; gap: 1rem">
              <v-text-field v-model="suffix.value.value" :error-messages="suffix.errorMessage.value" label="Suffix"
                variant="outlined" />
              <v-text-field v-model="honorifics.value.value" :error-messages="honorifics.errorMessage.value"
                label="Honorifics" variant="outlined" />
            </div>
            <v-text-field v-model="userID.value.value" :error-messages="userID.errorMessage.value" label="Username"
              prepend-inner-icon="mdi-account-outline" variant="outlined" />
            <v-text-field v-model="password.value.value" :error-messages="password.errorMessage.value" label="Password"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'" :type="visible ? 'text' : 'password'"
              prepend-inner-icon="mdi-lock-outline" variant="outlined" @click:append-inner="visible = !visible" />
          </div>

          <v-btn variant="flat" type="submit" block class="button-regular"> Create Account </v-btn>
        </v-form>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script setup lang="ts">
import axios from "axios";
import { useField, useForm } from "vee-validate";
import { ref } from "vue";

const create_user = ref(false);

const { handleSubmit } = useForm({
  validationSchema: {
    honorifics(v: string) {
      if (v && v.length < 2) {
        return "Name needs to be at least 2 characters.";
      }
      return true;
    },
    firstName(v: string) {
      if (!v) {
        return "Name is required.";
      } else if (v.length < 2) {
        return "Name needs to be at least 2 characters.";
      } else if (!/^[a-zA-Z ]+$/.test(v)) {
        return "Name must only contain alphabet characters.";
      }
      return true;
    },
    lastName(v: string) {
      if (!v) {
        return "Name is required.";
      } else if (v.length < 2) {
        return "Name needs to be at least 2 characters.";
      } else if (!/^[a-zA-Z ]+$/.test(v)) {
        return "Name must only contain alphabet characters.";
      }
      return true;
    },
    middleName(v: string) {
      if (v && v.length < 2) {
        return "Name needs to be at least 2 characters.";
      } else if (v && !/^[a-zA-Z ]+$/.test(v)) {
        return "Name must only contain alphabet characters.";
      }
      return true;
    },
    suffix(v: string) {
      if (v && v.length < 2) {
        return "Name needs to be at least 2 characters.";
      } else if (v && !/^[a-zA-Z. ]+$/.test(v)) {
        return "Name must only contain alphabet characters.";
      }
      return true;
    },
    role(v: string) {
      if (v) return true;

      return "Select an item.";
    },
    email(v: string) {
      if (v) return true;

      return "Please enter your email.";
    },
    affiliation(v: string) {
      if (v) return true;

      return "Select an item.";
    },
    userID(v: string) {
      if (!v) {
        return "User ID is required";
      } else if (v.length < 3 && v.length > 8) {
        return "User ID must be between 3-8 characters.";
      }
      return true;
    },
    password(v: string) {
      if (!v) {
        return "Password is required.";
      } else if (v.length < 8) {
        return "Password must be atleast 8 characters.";
      }
      return true;
    },
  },
});
const honorifics = useField("honorifics");
const role = useField("role");
const firstName = useField("firstName");
const middleName = useField("middleName");
const lastName = useField("lastName");
const suffix = useField("suffix");
const email = useField("email");
const affiliation = useField("affiliation");
const userID = useField("userID");
const password = useField("password");

const visible = ref(false);

const user_roles = ["Administrator", "Panelist", "Researcher"];

const register = handleSubmit(async (values) => {
  const data = JSON.stringify(values);

  try {
    await axios.post("/api/auth/register", data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("Successfully created a new account!");
    location.reload();
  } catch (error) {
    alert(error);
  }
});
</script>
