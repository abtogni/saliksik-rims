<template>
  <div>
    <div v-for="(presentation_group, date) in grouped_presentations" :key="date">
      <h2 class="date-header">{{ format_date(grouped_presentations[date][0].datetime) }}</h2>
      <v-card v-for="(presentation, index) in presentation_group" :key="presentation._id" class="presentation_card">
        <template v-if="should_display_time(presentation, index, presentation_group)">
          <v-card-title><h5>{{ format_time(presentation.datetime) }}</h5></v-card-title>
          <v-card-subtitle><p>{{ presentation.location }}</p></v-card-subtitle>
        </template>
        <v-card-text>
          <p><span>Panelists:</span> {{ presentation.panelist_id.join(', ') }}</p>
          <p><span>Researches:</span> {{ presentation.research_id.join(', ') }}</p>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment';

const props = defineProps(['presentation']);

const grouped_presentations = props.presentation.reduce((acc: any, curr: any) => {
  const date = moment(curr.datetime).format('YYYY-MM-DD');
  if (!acc[date]) {
    acc[date] = [curr];
  } else {
    acc[date].push(curr);
  }
  return acc;
}, {});

const should_display_time = (presentation: any, index: number, presentation_group: any[]) => {
  return index === 0 || presentation.datetime !== presentation_group[index - 1].datetime;
};

const format_date = (date: string) => {
  return moment(date).format('MMMM DD, YYYY');
};

const format_time = (datetime: string) => {
  return moment(datetime).utc().format('LT');
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
