<template>
  <v-btn flat prepend-icon="mdi-file-document-plus-outline" class="button-regular" @click="prompt = true" text="Upload Research Paper"></v-btn>
  <v-dialog v-model="prompt">
    <v-card class="form_modal_small" style="height: auto;">
      <v-toolbar color="primary">
        <v-toolbar-title>Upload Research Paper</v-toolbar-title>
        <v-btn icon @click="prompt = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-form class="form_content" @submit.prevent="uploadFile">
        <v-file-input v-model="file" class="inputs" label="Research Paper In PDF" prepend-icon="mdi-file-document-outline" rows="1" auto-grow variant="outlined" accept=".pdf" name="research"></v-file-input>

        <v-btn type="submit" variant="flat" class="button-regular">Submit Paper</v-btn>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import { useResearchesStore } from "../../../../stores/researches";

const currentResearch: any = useResearchesStore().currentResearch;
const prompt = ref(false);
const file: any = ref(null);

const uploadFile = async () => {
  if (file.value) {
    const formData = new FormData();
    const uploadedFile = file.value[0];
    formData.append("file", uploadedFile);

    try {
      const response = await axios.post(`/api/research/upload/${currentResearch._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(response.data.message);
      location.reload();
    } catch (error: any) {
      console.error(error.response.data);
    }
  }
};


</script>

<style lang="scss">
.form_modal_small {
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
