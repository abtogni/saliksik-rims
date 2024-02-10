<template>
 <v-btn type="submit" class="button-regular" @click="prompt = true">
    <v-icon start icon="mdi-phone-in-talk-outline"></v-icon> Create Research Project
  </v-btn>

  <v-dialog
      v-model="prompt"
      width="auto"
    >
    <v-card class="form_modal">
      <v-toolbar color="primary">
          <v-btn icon @click="prompt = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Create New Research</v-toolbar-title>
        </v-toolbar>
        <v-form class="form_content" @submit.prevent="create" >
          <v-text-field :rules="field_required" label="Research Title" v-model="form_data.research_title" variant="outlined"/>

          <v-select
            label="Research Leaders"
            multiple
            variant="outlined"
            :rules="field_required"
            v-model="form_data.research_leaders"
            :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
          />

          <v-btn type="submit" class="button-regular">Create New Research</v-btn>
        </v-form>

      </v-card>
    </v-dialog>


</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

const field_required = [(v: string) => !!v || "Field is required"];

  const prompt = ref(false);
  const form_data = reactive({
    research_title:'',
    research_leaders: []
  });

const create = async () => {
  alert(JSON.stringify(form_data));
};

</script>
