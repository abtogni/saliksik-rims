<template>
  <v-btn
    flat
    prepend-icon="mdi-check-circle-outline"
    class="button-regular"
    @click="prompt = true"
    text="Approve"
  />
  <v-dialog v-model="prompt">
    <v-card class="form_modal_small">
      <v-toolbar color="primary">
        <v-toolbar-title>Approve Concept Note?</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="form_content ">
        <div class=" h-40">
          <p class="p-reg ">

          
          This action will send a <span class="p-reg b">notice to proceed</span> to <span class="p-reg b">NameOfResearch</span> by <span class="p-reg b">NameOfResearchers</span>
        </p>
        </div>
        
        <v-btn type="submit" class="button-regular">Approve Concept Note</v-btn>
      </v-card-text>

        
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import axios from "axios";
import { useField, useForm } from "vee-validate";
import { onMounted, ref } from "vue";

const users = ref<{ key: any; name: string }[]>([]);
const prompt = ref(false);

const { handleSubmit } = useForm({
  validationSchema: {
    researchTitle(v: string) {
      if (v) return true;

      return "Field is required.";
    },
    researchLeaders(v: any[]) {
      if (Array.isArray(v) && v.length > 0) return true;
      return "At least one research leader is required.";
    },
  },
});

const researchTitle = useField("researchTitle");
const researchLeaders = useField("researchLeaders");

const create = handleSubmit(async (values) => {
  const data = JSON.stringify(values);

  return axios
    .post("/api/research/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => {
      alert("Succesfully created a new research");
      location.reload();
    })
    .catch((e) => {
      alert(`An error occurred while creating a new research with error ${e}.`);
    });
});

onMounted(async () => {
  const userList = useUsersStore().userList;
  users.value = userList.map((user: any) => ({
    key: user._id,
    name: user.firstName + " " + user.lastName,
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
