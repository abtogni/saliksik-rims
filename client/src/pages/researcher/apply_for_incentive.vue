<template>
  <v-container class="fill-height ctr">
    <v-card flat class="body" v-cloak>
      <v-form class="form_content" @submit.prevent="create">
      <v-card-title class="header" style="padding-bottom: 1rem">
        <div class="header-left">
          <div class="header-caption">
            <h5 style="margin-right: 0.5rem">Application For Incentive</h5>

            <p class="help">
              help
              <v-tooltip activator="parent" location="bottom"> </v-tooltip>
            </p>
          </div>
        </div>
        <div class="header-right">
          <v-btn variant="flat" class="button-regular" type="submit"
            >Submit Application</v-btn
          >
        </div>
      </v-card-title>
      <v-card-text class="content">
        
          1
          <v-select
            label="Level Of Dissemination"
            variant="outlined"
            :error-messages="researches.errorMessage.value"
            :items="level_of_dissemination"
            item-title="name"
            item-value="key"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <v-file-input
            label="Completed Research Paper"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <v-file-input
            label="Powerpoint Presentation Of Completed Research Paper"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <v-file-input
            label="Certificate Of Originality"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <div>
            <v-file-input
              label="Dean's Certification"
              variant="outlined"
              style="padding: 0; margin: 0"
              color="#5b21b6"
            />
            <v-tooltip activator="parent" location="bottom">
              Proof that the research paper was presented in the Department's
              Research Conference and published in its journal.
            </v-tooltip>
          </div>

          2
          <v-file-input
            label="Notice Of Acceptance To A Regional Or National Research Conference"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />

          3
          <v-file-input
            label="Notice Of Acceptance To An International Research Conference"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />

          <v-file-input
            label="Notice Of Publication To A Reputable Journal"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />

          4
          <v-file-input
            label="Notice Of Acceptance To An International Research Conference"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
          <v-file-input
            label="Notice Of Acceptance To An ISI/SCOPUS Journal Publication"
            variant="outlined"
            style="padding: 0; margin: 0"
            color="#5b21b6"
          />
        
      </v-card-text>
    </v-form>
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

const level_of_dissemination = [
  "1 ~ ₱5,000.00",
  "2 ~ ₱10,000.00",
  "3 ~ ₱15,000.00",
  "4 ~ ₱30,000.00",
];

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
