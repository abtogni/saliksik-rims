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

        <!-- <v-btn
          type="submit"
          flat
          variant="outlined"
          prepend-icon="mdi-close-circle-outline"
          class="button-outlined"
          >Not Going
        </v-btn>  -->
      </div>
    </v-card-title>
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style">
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
            <v-btn variant="text" icon="mdi-account-multiple-outline">
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
              >
                <div class="bold-upper">Uploaded By</div>
                <div>insert name</div>
              </v-tooltip>
            </v-btn>
            <div>
              <p class="p-reg b truncate-table-long">
                Streamlining Outcome-Based Education and Continuous Quality
                Improvement of University of Nueva Caceres through Technology: A
                Information Management System for Improving Inclusiveness
              </p>
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

  const checkFile = ref(false);

  onMounted(() => {
    checkIfFileExists();
  });

  
  const checkIfFileExists = async () => {
    try {
      const response = await axios.get(`/api/uploads/${id}/research-paper.pdf`);
      if (response.status === 200) {
        checkFile.value = true;
      }
    } catch (error: any) {
      console.error(error.response.data);
    }
  };
</script>
