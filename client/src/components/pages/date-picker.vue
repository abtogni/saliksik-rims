<template>
  <v-menu v-model="isMenuOpen" :close-on-content-click="false">
    <template v-slot:activator="{ props }">
      <v-text-field :label="label" :model-value="formattedDate" :error-messages="error" v-bind="props" variant="outlined"
        hide-details />
    </template>
    <VueDatePicker label="Date and Time" v-model="selectedDate" :min-date="new Date()" :is-24="false"
      aria-errormessage="dateAndTime.errorMessage.value" inline />
  </v-menu>
</template>

<script setup lang="ts">
import moment from "moment";
import { ref, computed, watch, defineProps, defineEmits } from "vue";

const { label, error, modelValue } = defineProps([
  "label",
  "error",
  "modelValue",
]);
const emit = defineEmits(["update:modelValue"]);

const isMenuOpen = ref(false);
const selectedDate = ref(modelValue);

const formattedDate = computed(() => {
  return selectedDate.value ? moment(selectedDate.value).format('MMMM DD, YYYY h:mm a') : "";
});

watch(modelValue, (newDate) => {
  selectedDate.value = newDate;
});

watch(selectedDate, (newDate) => {
  emit("update:modelValue", newDate);
});
</script>
<style>
.v-overlay__content:has(> .v-date-picker) {
  min-width: auto !important;
}

.v-text-field {
  margin-bottom: 2rem;
}
</style>`
