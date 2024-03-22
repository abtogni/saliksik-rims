<template>
  <v-card
    flat
    style="padding-top: 0.833rem"
    v-for="(presentation_group, date) in grouped_presentations"
    :key="date"
    class="body"
  >
    <v-card flat class="header">
      <div class="header-left truncate">
        <div class="header-caption">
          <h5 style="padding-bottom: 0.3rem">
            {{ format_date(grouped_presentations[date][0].datetime) }}
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
          <v-expansion-panel
            v-for="(presentation, index) in presentation_group"
            :key="presentation._id"
          >
            <v-expansion-panel-title
              class="title expansion-title-body"
              v-if="
                should_display_time(presentation, index, presentation_group)
              "
            >
              <v-btn variant="text" icon="mdi-account-multiple-outline">
                <v-badge color="info" content="6" floating>
                  <v-icon></v-icon>
                </v-badge>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Panelist</div>
                  <div v-for="id in presentation.panelist_id" :key="id">
                    {{ id }}
                  </div>
                </v-tooltip>
              </v-btn>

              <v-btn variant="text" icon="mdi-note-outline">
                <v-badge color="info" content="6" floating>
                  <v-icon></v-icon>
                </v-badge>

                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >
                  <div class="bold-upper">Researh Projects</div>
                  <div v-for="id in presentation.research_id" :key="id">
                    {{ id }}
                  </div>
                </v-tooltip>
              </v-btn>
              <span class="expansion-title-left truncate">
                <span class="truncate">
                  Insert Name of the day
                  {{ format_date(grouped_presentations[date][0].datetime) }}
                  {{ format_time(presentation.datetime) }}
                </span>
                <span class="truncate"> | </span>
                <span class="truncate">
                  {{ presentation.location }}
                </span>
              </span>
              <span class="expansion-title-right">
                <v-chip
                  >January 21, 2023
                  <v-tooltip activator="parent" location="bottom"
                    >Created In
                  </v-tooltip>
                </v-chip>
              </span>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <presentation_schedule_preview />

              <presentation_researcher_preview />
              <br />
              <presentation_panelist_preview />
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import moment from "moment";

const props = defineProps(["presentation"]);

const grouped_presentations = props.presentation.reduce(
  (acc: any, curr: any) => {
    const date = moment(curr.datetime).format("YYYY-MM-DD");
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
  presentation: any,
  index: number,
  presentation_group: any[],
) => {
  return (
    index === 0 ||
    presentation.datetime !== presentation_group[index - 1].datetime
  );
};

const format_date = (date: string) => {
  return moment(date).format("MMMM DD, YYYY");
};

const format_time = (datetime: string) => {
  return moment(datetime).utc().format("LT");
};
</script>

<style lang="scss">
h2 {
  text-align: center;
}

.presentation_card {
  text-align: start;
  width: 60rem;
  min-height: 10rem;
  display: inline-block;
  margin: 1rem auto;
  text-align: left;
  p {
    font-size: 1rem;
    span {
      font-weight: 600;
    }
  }
}
</style>
