<template>
  <v-btn color="#297be5" class="new_user">Create New Account
    <v-dialog
      v-model="create_user"
      activator="parent"
    >
    <v-card id="create_user_card">
      <h2>Create A New Account</h2>
      <v-icon id="close_create_user" icon="mdi-close" @click="create_user = false"></v-icon>
      <v-form @submit.prevent="register">


          <v-row>
              <v-col>
                <v-select
                v-model="form_data.user_role"
                label="User Role"
                prepend-inner-icon="mdi-briefcase"
                :items="user_roles"
                variant="outlined"
                :rules="field_required"
                />
              </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="form_data.first_name"
                label="First Name"
                variant="outlined"
                :rules="[name_rules, field_required].flat()"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="form_data.last_name"
                label="Last Name"
                variant="outlined"
                :rules="[name_rules, field_required].flat()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="form_data.middle_name"
                label="Middle Name"
                variant="outlined"
                :rules="name_rules"
              />
            </v-col>
            <v-col>
              <v-text-field
                v-model="form_data.suffix"
                label="Suffix"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                v-model="form_data.user_id"
                label="User ID"
                prepend-inner-icon="mdi-account"
                variant="outlined"
                :rules="userid_rules"
              />
            </v-col>
            <v-col>
                <v-text-field
                v-model="form_data.password"
                label="Password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                @click:append-inner="visible = !visible"
                :rules="password_rules"
                />
            </v-col>
          </v-row>

          <v-btn color="#297be5" type="submit" block> Create Account </v-btn>
        </v-form>

    </v-card>

  </v-dialog>


  </v-btn>
</template>


<script setup lang="ts">
  import { reactive, ref } from 'vue';

  const create_user = ref(false);

  const form_data = reactive({
    user_role: null,
    user_id: "",
    password: "",
    first_name: '',
    last_name: '',
    middle_name: '',
    suffix: ''
  });
  const visible = ref(false);

  const field_required = [
    (v: string) => !!v || "Field is required",
  ]

  const userid_rules = [
    ...field_required,
    (v: string) => (v && v.length > 5 && v.length < 11) || 'User ID must be between 6 to 10 characters',
  ]

  const name_rules = [
    (v: string) => (!v || /^[a-zA-Z ]+$/.test(v)) || 'Name must only contain alphabet characters',
    (v: string) => (!v || v.length > 2) || 'Name must be at least 3 characters',
  ];


  const password_rules = [
    ...field_required,
    (v: string) => (v && v.length > 5) || 'Password must be atleast 6 characters',
  ]


  const user_roles = ["Admin", "Internal Panelist" , "External Panelist", "Researcher"];

  const register = async () => {
    alert(JSON.stringify(form_data))
  };
</script>

<style lang="scss">
  @import '../../styles/pages/manage-accounts.scss'
</style>
