<template>
  <v-hover
    v-slot:default="{ isHovering, props }"
    v-for="user in users"
    :key="user.userID"
  >
    <v-card
      flat
      rounded="0"
      v-bind="props"
      :color="isHovering ? '#eef2ff' : undefined"
    >
      <v-card-text class="pres-res-body">
        <div class="pres-res-left ">
          <v-btn variant="text" icon="mdi-account-outline"> </v-btn>
          <div class="text">
                <p class="truncate-table">
                  {{ `${user.firstName} ${user.lastName}` }}
                </p>
                <v-chip color="default" variant="text" class="p-reg b">Last Active
                
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >Last Active
                </v-tooltip>
                </v-chip>
              </div>
              
        </div>

        <div class="pres-res-right">
          <v-chip color="primary">Affiliation</v-chip>
          <v-btn variant="text" icon="mdi-account-edit-outline">
                <v-icon></v-icon>
                <v-tooltip
                  activator="parent"
                  location="bottom"
                  class="tooltip-list"
                >Edit
                </v-tooltip>
              </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script setup lang="ts">
const { users } = defineProps(["users"]);
</script>
