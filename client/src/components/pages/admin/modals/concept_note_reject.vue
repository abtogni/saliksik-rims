<template>
  <v-btn flat prepend-icon="mdi-check-circle-outline" class="button-outlined" @click="prompt = true" text="Reject" />
  <v-dialog v-model="prompt">
    <v-card class="form_modal_small">
      <v-toolbar color="primary">
        <v-toolbar-title>Reject Concept Note?</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text class="form_content ">
        <div class=" h-40">
          <!-- @vue-skip -->
          <p class="p-reg ">


            Are you sure you want to reject this concept note titled

            <span class="p-reg b">{{ research.conceptNote.projectTitle }}</span>
            by <span class="p-reg b" v-for="(leader, index) in research.researchLeaders" :key="leader.name">
              {{ leader.name }}{{ index !== research.researchLeaders.length - 1 ? ', ' : '' }}
            </span> ?
          </p>


        </div>

        <v-btn @click="confirm" class="button-regular">Confirm</v-btn>
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
  const data = JSON.stringify({ conceptNote: { status: 'Rejected' } });

  return axios
    //@ts-ignore
    .patch(`/api/research/update/${research._id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(() => alert("Concept note has been rejected"))
    .catch(() => alert("An error occurred"))
    .finally(() => router.push("/administrator/concept_note"));
};

</script>
