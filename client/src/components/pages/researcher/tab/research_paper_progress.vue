<template>
  <v-card flat style="padding-top: 0.833rem" class="body">
    <v-card-title flat class="header">
      <div class="header-left">
        <div class="header-caption">
          <h5 style="margin-right: 0rem">Research Paper Progress</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom"
              >Track and monitor your research paper. Upload a copy of the
              research paper regularly.
            </v-tooltip>
          </p>
        </div>
      </div>

      <div class="header-right">
        <upload_research_paper />
      </div>
    </v-card-title>
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style" v-for="f in files">
        <div
          style="
            display: flex;
            flex-direction: row;
            gap: 1rem;
            justify-content: space-between;
            padding: 0;
            margin: 0;
          "
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              gap: 1rem;
              align-items: center;
              width: 100%;
            "
          >
            <div>
              <a :href="`/api/uploads/${id}/${f}`" target="_blank">{{ f }}</a>
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              gap: 1rem;
              align-items: center;
            "
          >
            <v-chip variant="text" class="b button-outlined"
              >Uploaded In
            </v-chip>

            <v-btn variant="text" icon="mdi-file-download-outline">
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
                >Download As PDF
              </v-tooltip>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

  const {id} = defineProps(['id']);

  const files = ref(null);

  onMounted(() => {
    checkIfDirExists();
  });

  
  const checkIfDirExists = async () => {
    try {
      const response = await axios.get(`/api/research/files/${id}`);
      if (response.status === 200) {
        files.value = response.data;
        console.log(files.value);
      }
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
</script>
