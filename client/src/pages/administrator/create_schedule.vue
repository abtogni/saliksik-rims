<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body" v-cloak>
      <v-card-title class="header">
        <div class="header-left">
          <div class="header-caption">
            <h5 style="margin-right: 0.5rem">Create Schedule</h5>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom"> </v-tooltip>
            </p>
          </div>
        </div>
        <div class="header-right">
          <v-btn variant="flat" class="button-regular" type="submit"
            >Create</v-btn
          >
        </div>
      </v-card-title>
      <v-card-text class="content">
        <v-form class="form_content" @submit.prevent="create">
          <v-select
            label="Presentation Type"
            variant="outlined"
            :items="presentation_type"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: start;
              gap: 1rem;
            "
          >
            <date-picker label="Date" v-model="dateAndTime.value.value" />

            <v-text-field
              v-model="location.value.value"
              label="Location"
              :error-messages="location.errorMessage.value"
              variant="outlined"
              style="padding: 0; margin: 0"
              color="#5b21b6"
            />
          </div>
          <!-- @vue-ignore -->
          <v-select
            label="Panelists"
            multiple
            variant="outlined"
            v-model="panelists.value.value"
            :error-messages="panelists.errorMessage.value"
            :items="users"
            item-title="name"
            item-value="key"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />

          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: start;
              gap: 1rem;
            "
          >
            <!-- @vue-ignore -->
            <v-select
              label="Researches"
              variant="outlined"
              v-model="researches.value.value"
              :error-messages="researches.errorMessage.value"
              :items="researchList"
              item-title="name"
              item-value="key"
              style="padding: 0; margin: 0; width: 75%"
              color="#5b21b6"
            />
            <date-picker label="Time" v-model="dateAndTime.value.value" />
          </div>

          <v-btn variant="flat" prepend-icon="mdi-folder-plus-outline" class="button-outlined" type="submit">Add Research Project</v-btn>

          <v-card variant="outlined" color="primary">
            <v-card-text style="display: flex; flex-direction: row; gap: 1rem; text-wrap: nowrap;">
              <div class="truncate">
                <p class="p-reg truncate">Streamlining Outcome-Based Education and Continuous Quality Improvement of University of Nueva Caceres through Technology: A Information Management System for Improving Inclusiveness</p>
              </div>
              <span>|</span>
              <p class="p-reg b" style="text-wrap: nowrap;">10:30 AM - 12:00 NN</p>
            </v-card-text>
          </v-card>
          
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import axios from "axios";


const { users, researchList } = defineProps(["users", "researchList"]);

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
const location = useField("location");
const panelists = useField("panelists");
const researches = useField("researches");

const presentation_type = ["Title Presentation", "Final Presentation"];

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
