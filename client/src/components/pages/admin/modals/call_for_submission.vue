<template>
  <v-btn
    flat
    prepend-icon="mdi-phone-outline"
    class="button-regular"
    @click="prompt = true"
    text="Call For Submission"
  />

  <v-dialog v-model="prompt">
    <v-card class="form_modal">
      <v-toolbar color="primary">
        <v-toolbar-title>Call For Submission</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-form class="form_content" @submit.prevent="create">
        <div
          style="
            display: flex;
            flex-direction: row;
            align-items: start;
            gap: 1rem;
          "
        >
          <date-picker
            label="Deadline"
            v-model="dateAndTime.value.value"
          />
        </div>
        
        <v-btn class="button-regular" type="submit">Confirm</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import axios from "axios";

const prompt = ref(false);


const { handleSubmit } = useForm({
  validationSchema: {
    dateAndTime(v: string) {
      if (v) return true;

      return "Please enter a string.";
    },
    location(v: string) {
      if (v) return true;

      return "Please enter a string.";
    },
    panelists(v: string) {
      if (v) return true;

      return "Select an item.";
    },
    researches(v: string) {
      if (v) return true;

      return "Select an item.";
    },
  },
});

const dateAndTime = useField("dateAndTime");

const create = handleSubmit(async (values) => {
  const data = JSON.stringify(values);
  return axios
    .post("/api/schedule/create", data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => alert("Successfully set a new schedule"))
    .catch(() => alert("An error occurred"))
    .finally(() => window.location.reload());
});
</script>

<style lang="scss">
.dialog-box {
  margin: 0 auto;
  padding: 2rem;
  width: 20rem;
}
</style>
