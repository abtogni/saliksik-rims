<template>
  <v-card flat style="padding-top: 0.833rem" v-for="(schedule_group, date) in grouped_schedules" :key="date" class="body">
    <v-card flat class="header">
      <div class="header-left truncate">
        <div class="header-caption">
          <h5>
            {{ format_date(grouped_schedules[date][0].dateAndTime) }}
          </h5>

          <!-- <p class="caption">
            Track and monitor your research paper. Upload a copy of the research
            paper regularly.
          </p> -->
        </div>
      </div>

    </v-card>
    <div class="content">
      <v-card variant="outlined" class="card-style">
        <v-expansion-panels>
          <v-expansion-panel v-for="(schedule, index) in schedule_group" :key="schedule._id">
            <v-expansion-panel-title class="title expansion-title-body" v-if="should_display_time(schedule, index, schedule_group)
              ">
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-badge color="info" :content="schedule.panelists.length" floating>
                  <v-icon></v-icon>
                </v-badge>
                <v-tooltip activator="parent" location="bottom" class="tooltip-list">
                  <div class="bold-upper">Panelist</div>
                  <div v-for="id in schedule.panelists" :key="id">
                    {{ users.find((user: any) => user.key === id)?.name }}
                  </div>
                </v-tooltip>
              </v-btn>

              <v-btn variant="text" icon="mdi-note-outline">
                <v-badge color="info" :content="schedule.presentations.length" floating>
                  <v-icon></v-icon>
                </v-badge>

                <v-tooltip activator="parent" location="bottom" class="tooltip-list">
                  <div class="bold-upper">Research Projects</div>
                  <div v-for="id in schedule.presentations" :key="id">
                    {{ id }}
                  </div>
                </v-tooltip>
              </v-btn>
              <span class="expansion-title-left truncate">
                <span class="truncate">
                  {{ moment(schedule.dateAndTime).format('dddd') }}
                  {{ format_time(schedule.dateAndTime) }}
                </span>
                <span class="truncate"> | </span>
                <span class="truncate">
                  {{ schedule.location }}
                </span>
              </span>
              <span class="expansion-title-right"><v-chip>{{ format_date(grouped_schedules[date][0].dateAndTime) }}
                  <v-tooltip activator="parent" location="bottom">Created In
                  </v-tooltip>
                </v-chip></span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card flat class="body">
                <v-card-title flat class="header">
                  <div class="header-left truncate">
                    <div class="header-caption-ctr">
                      <h5>{{ `${schedule.location} ${format_time(schedule.dateAndTime)}` }}</h5>
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

              <schedule_researches_preview :researches="schedule.presentations" :researchIDs="researchList" />
              <br>
              <schedule_panelist_preview :panelists="schedule.panelists" :users="users" />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";

const { schedule, users, researchList } = defineProps(['schedule', 'users', 'researchList']);


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

const format_date = (date: string) => {
  return moment(date).format("MMMM DD, YYYY");
};

const format_time = (date: string) => {
  return moment(date).utc().format("LT");
};

</script>
