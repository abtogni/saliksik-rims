<template>
    <div v-for="(presentationGroup, date) in groupedPresentations" :key="date">
      <h2 class="date-header">{{ moment(date).format('MMMM DD, YYYY') }}</h2>
      <v-card v-for="(presentation, index) in presentationGroup" class="presentation_card"
      :key="presentation._id">
        <div v-if="index === 0 || hasDifferentTime(presentation, presentationGroup[index - 1])">
          <v-card-title>{{ moment(presentation.time).utc().format('LT') }}</v-card-title>
        </div>
        <v-card-text>
          <p><span>Panelists:</span> {{ presentation.panelist_id.join(', ') }}</p>
          <p><span>Researches:</span> {{ presentation.research_id.join(', ') }}</p>
        </v-card-text>
      </v-card>
    </div>
</template>

<script setup lang="ts">
  import moment from 'moment';
  const props = defineProps(['presentation']);

  console.log(props)

  const groupedPresentations = props.presentation.reduce((acc: any, curr: any) => {
    if (!acc[curr.date]) {
      acc[curr.date] = [curr];
    } else {
      acc[curr.date].push(curr);
    }
    return acc;
  }, {});

  const hasDifferentTime = (presentation1: any, presentation2: any) => {
    return moment(presentation1.time).format('LT') !== moment(presentation2.time).format('LT');
  };
</script>

<style lang="scss">
  h2{
    text-align: center;
  }

  .presentation_card {
    text-align: start;
    width: 60rem;
    min-height: 10rem;
    display: inline-block;
    margin: 1rem auto;
    text-align: left;
    p{
      font-size: 1rem;
        span{
        font-weight: 600;
      }
    }
  }

</style>
