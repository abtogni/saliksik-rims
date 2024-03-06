<template>
  <v-btn flat prepend-icon="mdi-check-circle-outline" class="button-regular" @click="prompt = true"
    text="Mark As Verified" />
  <v-dialog v-model="prompt">
    <v-card class="form_modal_small">
      <v-toolbar color="primary">
        <v-toolbar-title>Mark As Verified</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="form_content ">
        <div class=" h-40">
          <p class="p-reg ">
            Are you sure you want to verify the concept note titled
            <!-- @vue-skip -->
            <span class="p-reg b">{{ research.conceptNote.projectTitle }}</span> ?
          </p>
        </div>

        <v-btn class="button-regular" @click="confirm">Confirm</v-btn>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>


<script setup lang="ts">
import router from "@/router";
import { useResearchesStore } from "@/stores/researches";
import axios from "axios";
import { ref } from "vue";

const prompt = ref(false);
const research = useResearchesStore().currentResearch;

const confirm = async () => {
  const data = JSON.stringify({ conceptNote: { status: 'Verified' } });
  //@ts-ignore
  return axios.patch(`/api/research/update/${research._id}`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(() => alert("Concept note verified successfully!"))
    .catch(() => alert("An error occurred"))
    .finally(() => router.push("/administrator/concept_note"));
};

</script>
