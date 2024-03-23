<template>
  <v-container class="fill-height ctr" v-if="mounted"> 
    <v-card flat class="body">
      <v-form class="form_content" @submit.prevent="create">
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
          <v-btn variant="flat" class="button-regular" type="submit"
            >Create</v-btn
          >
      </v-card-title>
      <v-card-text class="content">
        <!-- @vue-ignore -->
          <v-select
            label="Presentation Type"
            variant="outlined"
            :items="presentation_type"
            v-model="presentationType.value.value"
            :error-messages="presentationType.errorMessage.value"
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
            <date-picker label="Date" v-model="date.value.value" />

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
              v-model="research"
              :items="researchList"
              item-title="name"
              item-value="key"
              style="padding: 0; margin: 0; width: 75%"
              color="#5b21b6"
            />
            <v-text-field
              label="Time"
              v-model="time"
              variant="outlined"
              style="padding: 0; margin: 0"
              color="#5b21b6"
            />
            <v-btn variant="flat" icon="mdi-folder-plus-outline" size="x-large" @click="addPresentation" />
          </div>

          

          <v-card variant="outlined" color="primary" v-for="i in presentations">
            <v-card-text style="display: flex; flex-direction: row; gap: 1rem; text-wrap: nowrap;">
              <div class="truncate">
                <!-- @vue-ignore -->
                <p class="p-reg truncate">{{ researchList.find(item => item.key === i.research)?.name }}</p>
              </div>
              <span>|</span>
              <p class="p-reg b" style="text-wrap: nowrap;">{{ i.time }}</p>
            </v-card-text>
          </v-card>
          
        
      </v-card-text>
    </v-form>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/stores/users";
import { useResearchesStore } from "@/stores/researches";
import { onMounted, ref } from "vue";
import axios from "axios";
import { useField, useForm } from "vee-validate";

const presentations = ref<{ research: any; time: any }[]>([]);
const research: any = ref('');
const time: any = ref('');
const users = ref<{ key: any; name: string; role: string }[]>([]);
const schedules: any = ref([]);
const researchList = ref<
  {
    key: any;
    name: string;
    status: string;
    researchLeaders: any;
    conceptNote: any;
  }[]
>([]);

const mounted = ref(false);

onMounted(async () => {
  await axios.get("/api/schedules").then((response) => {
    schedules.value = response.data;
  });
  const userStore = useUsersStore().userList;
  const researchStore = useResearchesStore().researchList;
  users.value = userStore.map((user: any) => ({
    key: user._id,
    name: user.firstName + " " + user.lastName,
    role: user.role,
  }));

  researchList.value = researchStore
    .filter((research: any) => research.conceptNote)
    .map((research: any) => ({
      key: research._id,
      name: research.researchTitle,
      status: research.researchStatus,
      researchLeaders: research.researchLeaders,
      conceptNote: research.conceptNote.status,
    }));

  users.value = computePanelists();
  researchList.value = computeResearches();
  mounted.value = true;
});

const tab = ref("null");

const computeResearches = () => {
  return researchList.value.filter(
    (research) =>
      research.status === "Research Paper" ||
      research.conceptNote === "Verified",
  );
};

const computePanelists = () => {
  return users.value.filter((user) => user.role === "Panelist");
};

const addPresentation = () => {
  presentations.value.push({
    research: research.value,
    time: time.value,
  });
  research.value = '';
  time.value = '';
};


const { handleSubmit } = useForm({
  validationSchema: {
    date(v: string) {
      if (v) return true;

      return "Please enter a string.";
    },
    location(v: string) {
      if (v) return true;

      return "Please enter a string.";
    },
    presentationType(v: string) {
      if (v) return true;

      return "Select an item.";
    },
    panelists(v: string) {
      if (v) return true;

      return "Select an item.";
    },
  },
});


const date = useField("date");
const location = useField("location");
const panelists = useField("panelists");

const presentationType = useField("presentationType");

const presentation_type = ["Title Presentation", "Final Presentation"];

const create = handleSubmit(async (values) => {
  const data = JSON.stringify({
    presentations: presentations.value,
    ...values,
  });
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
