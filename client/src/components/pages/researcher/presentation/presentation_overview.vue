<template>
  <div v-if="schedule">
    <v-card flat style="padding-top: 0.833rem" class="body">
      <v-card-title flat class="header">
        <div class="header-left">
          <div class="header-caption">
            <h5 style="margin-right: 0rem">
              {{ p.presentationType }} Presentation Schedule
            </h5>
            <p class="help" style="padding-top: 0.2rem">
              help
              <v-tooltip activator="parent" location="bottom"
                >Check and view title presentation schedule.
              </v-tooltip>
            </p>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="overview-ctr">
          <v-card variant="outlined" class="card-style">
            <v-card-text style="display: flex; flex-direction: row; gap: 1rem">
              <p style="text-transform: uppercase" class="p-reg b">
                <v-icon start icon="mdi-calendar-month-outline" />
                {{
                  moment(schedule.dateAndTime).format("MMMM DD, YYYY, h:mm a")
                }}
              </p>
              <span class="p-reg">|</span>
              <p style="text-transform: uppercase" class="p-reg b">
                <v-icon start icon="mdi-map-marker-outline" />
                {{ schedule.location }}
              </p>
            </v-card-text>
          </v-card>
        </div>
      </v-card-text>
    </v-card>

    <v-card flat style="padding-top: 0rem" class="body">
      <v-card-title flat class="header">
        <div class="header-left">
          <div class="header-caption">
            <h5 style="margin-right: 0rem">
              Panelist Comments And Suggestions
            </h5>
            <p class="help" style="padding-top: 0.2rem">
              help
              <v-tooltip activator="parent" location="bottom"
                >View and read panelist comments and suggestions.
              </v-tooltip>
            </p>
          </div>
        </div>
      </v-card-title>
      <v-card-text>
        <v-card flat class="overview-ctr">
          <v-card variant="outlined" class="card-style">
            <v-expansion-panels  multiple >
              <!-- @vue-ignore -->
              <!-- <v-expansion-panel
                :title="
                  userList.find((user: any) => user?._id === c?.panelistID)
                    ?.firstName +
                  ' ' +
                  userList.find((user: any) => user?._id === c?.panelistID)
                    ?.lastName
                "
                :text=""
              /> -->
              <v-expansion-panel>
              <v-expansion-panel-title>Title And Authors</v-expansion-panel-title>
              <v-expansion-panel-text v-for="c in comments" :key="c._id">
                {{ userList.find((user: any) => user?._id === c?.panelistID
                    ?.firstName) +
                  ' ' +
                  userList.find((user: any) => user?._id === c?.panelistID
                    ?.lastName) }}
                
                
                
                {{c?.comments}}
              
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Objectives</v-expansion-panel-title>
              <v-expansion-panel-text> aa</v-expansion-panel-text>
            </v-expansion-panel>
              <v-expansion-panel>
              <v-expansion-panel-title>Methodology</v-expansion-panel-title>
              <v-expansion-panel-text>aa </v-expansion-panel-text>
            </v-expansion-panel>
              <v-expansion-panel>
              <v-expansion-panel-title>Other Comments</v-expansion-panel-title>
              <v-expansion-panel-text>aa </v-expansion-panel-text>
            </v-expansion-panel>
            </v-expansion-panels>
          </v-card>
        </v-card>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import axios from "axios";
import { useUsersStore } from "@/stores/users";
import moment from "moment";
import { onMounted, ref } from "vue";
const { p } = defineProps(["p"]);
const comments: any = ref([]);
const schedule: any = ref(null);
const userList = useUsersStore().userList;

onMounted(async () => {
  schedule.value = (await axios.get(`/api/schedule/${p.scheduleID}`)).data;
  comments.value = await Promise.all(
    p.panelistNotes.map(async (note: any) => {
      const response = await axios.get(`/api/comment/${note}`);
      return response.data;
    }),
  );
});
</script>
