<template>
  <v-navigation-drawer v-if="showDrawer" expand-on-hover rail>
    <!-- Drawer content -->
    <v-list>
      <v-list-item :title="user.name" :subtitle="user.user_id"></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <!-- Sample -->
      <v-list-item prepend-icon="mdi-folder-plus-outline" class="button-regular">
        <v-btn
            type="submit"
            flat
            class="button-regular"
            >Create Reseach Project
          </v-btn>
         </v-list-item>
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="All Research Projects" value="myfiles" href="/researcher/all_research_projects"
        link  />
      <v-list-item prepend-icon="mdi-bell-outline" title="Notifications" value="myfiles" href="/researcher/researcher_notification" 
        link> 
        <template v-slot:append>
        <v-badge
          color="info"
          content="6"
          inline
        ></v-badge>
      </template>
    </v-list-item> 
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" link />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" link />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">

const user = { name: 'Test Account', user_id: '07-11312' }
import { ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const showDrawer = ref(route.path !== '/');

watchEffect(() => {
  showDrawer.value = route.path !== '/';
});
</script>
