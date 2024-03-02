<template>
  <v-card flat style="padding-top: 0.833rem" v-for="(schedule_group, date) in grouped_schedules" :key="date"
    class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption">
          <h6>
            {{ moment(grouped_schedules[date][0].dateAndTime).format("MMMM DD, YYYY") }}
          </h6>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> -->
        </div>
      </div>
    </v-card-title>
    <v-card-text class="content">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel v-for="(schedule, index) in schedule_group" :key="schedule._id">
            <v-expansion-panel-title class="title expansion-title-body b" v-if="should_display_time(schedule, index, schedule_group)
    ">
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-badge color="info" :content="schedule.panelists.length" floating>
                  <v-icon></v-icon>
                </v-badge>
                <v-tooltip activator="parent" location="bottom" class="tooltip-list">
                  <div class="bold-upper">Panelist</div>
                  <div v-for="panelist in schedule.panelists" :key="panelist._id">
                    {{ panelist.name }}
                  </div>
                </v-tooltip>
              </v-btn>

              <v-btn variant="text" icon="mdi-note-outline">
                <v-badge color="info" :content="schedule.presentations.length" floating>
                  <v-icon></v-icon>
                </v-badge>

                <v-tooltip activator="parent" location="bottom" class="tooltip-list">
                  <div class="bold-upper">Research Projects</div>
                  <div v-for="p in schedule.presentations" :key="p._id">
                    {{ researchList.find((research: any) => research.key === p.researchID)?.name }}
                  </div>
                </v-tooltip>
              </v-btn>
              <span class="expansion-title-left truncate">
                <span class="truncate">
                  {{ moment(schedule.dateAndTime).format('MMMM D YYYY, h:mm A') }}
                </span>
                <span class="truncate"> | </span>
                <span class="truncate">
                  {{ schedule.location }}
                </span>
              </span>
              <span class="expansion-title-right"><v-chip color="primary" class="b">{{
    moment(schedule.createdAt).format('MMMM D YYYY, h:mm A') }}
                  <v-tooltip activator="parent" location="bottom">Created In
                  </v-tooltip>
                </v-chip></span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card flat class="body">
                <v-card-title flat class="header">
                  <div class="header-left truncate">
                    <div class="header-caption-ctr">
                      <h5>{{ ` ${moment(schedule.dateAndTime).format('MMMM D YYYY, h:mm A')} · ${schedule.location}` }}
                      </h5>
                    </div>
                  </div>

                  <div class="header-right">
                    <v-btn type="submit" flat icon="mdi-calendar-edit-outline">
                      <v-icon></v-icon>
                      <v-tooltip activator="parent" location="bottom">Change Schedule
                      </v-tooltip>
                    </v-btn>
                  </div>
                </v-card-title>
              </v-card>

              <schedule_researches_preview :presentations="schedule.presentations" :users="users" />
              <br>
              <schedule_panelist_preview :panelists="schedule.panelists" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";

const { schedule, researchList, users } = defineProps(['schedule', 'researchList', 'users']);


const sortedSchedules = [...schedule].sort((a: any, b: any) => moment(a.dateAndTime).diff(moment(b.dateAndTime)));

const grouped_schedules = sortedSchedules.reduce(
  (acc: any, curr: any) => {
    const date = moment(curr.dateAndTime).format("YYYY-MM-DD");
    if (!acc[date]) {
      acc[date] = [curr];
    } else {
      acc[date].push(curr);
    }
    return acc;
  },
  {},
);

const should_display_time = (
  schedule: any,
  index: number,
  schedule_group: any[],
) => {
  return (
    index === 0 ||
    schedule.dateAndTime !== schedule_group[index - 1].dateAndTime
  );
};

</script>
