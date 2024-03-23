<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false" >
    <template v-slot:activator="{ props }">
      <v-text-field :label="label" :rules="fieldNeed" :model-value="formattedDate" v-bind="props" variant="outlined"
        hide-details />
    </template>
    <v-date-picker  v-model="selectedDate" :min="new Date()" @change="closeDatePicker" />
  </v-menu>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, watch, defineProps } from "vue";

const fieldNeed = ref([
  (value: any) => {
    if (value) return true;

    return 'Field is required';
  },
]);

const { label, modelValue } = defineProps([
  "label",
  "modelValue",
]);
const emit = defineEmits(["update:modelValue"]);

const isMenuOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
  return selectedDate.value ? moment(selectedDate.value).format('MMMM DD, YYYY') : "";
});

watch(modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  emit("update:modelValue", newDate);
});

const closeDatePicker = () => {
  isMenuOpen.value = false;
};
</script>

<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-text-field {
  margin-bottom: 2rem;
}
</style>
