<template>
  <div v-if="schedule">
    <v-card flat style="padding-top: 0.833rem" class="body" >
        <v-card-title flat class="header">
          <div class="header-left">
            <div class="header-caption">
              <h5 style="margin-right: 0rem">
                {{ p.presentationType }} Presentation Schedule
              </h5>
              <p class="help" style="padding-top: 0.2rem">
                help
                <v-tooltip activator="parent" location="bottom">Check and view title presentation schedule.
                </v-tooltip>
              </p>
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <div class="overview-ctr">
            <v-card variant="flat" color="#fff7ed">
              <v-card-title>
                <h5 style="text-transform: uppercase">
                  <v-icon start icon="mdi-calendar-month-outline" />
                  {{ moment(schedule.dateAndTime).format('MMMM DD, YYYY, h:mm a') }}
                </h5>
              </v-card-title>
              <v-card-text>
                <p style="font-weight: 600">
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
          <h5 style="margin-right: 0rem">Panelist Comments And Suggestions</h5>
          <p class="help" style="padding-top: 0.2rem">
            help
            <v-tooltip activator="parent" location="bottom">View and read panelist comments and suggestions.
            </v-tooltip>
          </p>
        </div>
      </div>
    </v-card-title>
    <v-card-text>
      <v-card flat class="overview-ctr">
        <v-card variant="outlined" class="card-style">
          <v-expansion-panels v-for="c in comments" :key="c._id">
            <!-- @vue-ignore -->
              <v-expansion-panel :title="userList.find((user: any) => user?._id === c?.panelistID)?.firstName + ' ' + userList.find((user: any) => user?._id === c?.panelistID)?.lastName" :text="c?.comments" />
            
          </v-expansion-panels>
        </v-card>
      </v-card>
    </v-card-text>
   </v-card>
  </div>
 
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { useUsersStore } from '@/stores/users';
  import moment from 'moment';
  import { onMounted, ref } from 'vue';
  const {p} = defineProps(['p']);
  const comments: any = ref([]);
  const schedule: any = ref(null);
  const userList = useUsersStore().userList;

  onMounted(async() => {
    schedule.value = (await axios.get(`/api/schedule/${p.scheduleID}`)).data;
    comments.value = await Promise.all(p.panelistNotes.map(async (note: any) => {
      const response = await axios.get(`/api/comment/${note}`);
      return response.data;
    }));
  })
</script>