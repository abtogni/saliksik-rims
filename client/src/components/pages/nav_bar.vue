<template>
  <v-navigation-drawer v-if="showDrawer" expand-on-hover rail>
    <!-- Drawer content -->
    <v-list >
      <v-list-item v-if="user"
        :title="user.firstName + ' ' + user.lastName"
        :subtitle="user.userID"
      />
      <v-list-item v-else>
        Loading...
      </v-list-item>
    </v-list>


    <v-divider />

    <v-list density="compact" nav>
      <!-- Sample -->

      <v-list-item
        prepend-icon="mdi-folder-multiple-outline"
        title="Research Projects"
        value="research_projects"
        href="/researcher/research_projects"
        link
      />
      <v-list-item
        prepend-icon="mdi-bell-outline"
        title="Notifications"
        value="notifications"
        href="/researcher/researcher_notification"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar-month-outline"
        title="Presentations"
        value="presentations"
        link
      />
      <v-list-item
        prepend-icon="mdi-account-outline"
        title="Profile"
        value="profile"
        link
      />
    </v-list>
    <v-list density="compact" nav>
      <!-- Sample -->

      <v-list-item
        prepend-icon="mdi-file-document-outline"
        title="Concept Notes"
        value="concept_notes"
        href="/administrator/concept_note"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-calendar-month-outline"
        title="Presentation"
        value="schedules"
        href="/administrator/schedules"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-note-multiple-outline"
        title="Research Papers"
        value="research_progress"
        href="/administrator/research_papers"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-currency-php"
        title="Incentive"
        value="incentive"
        href="/administrator/incentive"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-bell-outline"
        title="Notifications"
        value="notifications"
        href="/administrator/administrator_notification"
        link
      >
        <template v-slot:append>
          <v-badge color="info" content="6" inline></v-badge>
        </template>
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-account-multiple-outline"
        title="Accounts"
        value="accounts"
        href="/administrator/accounts"
        link
      >
      </v-list-item>
      <v-list-item
        prepend-icon="mdi-comment-account-outline"
        title="Panelist Comment "
        value="panelist_comments"
        href="/panelist"
        link
      >
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <v-list-item
        @click="logoutDialog = true"
        prepend-icon="mdi-logout"
        title="Logout"
        value="logout"
      />
      <v-dialog v-model="logoutDialog">
        <v-card class="form_modal_small">
          <v-card-text class="form_content">
            <div class="h-40">
              <p class="p-reg">Do you really want to log out?</p>
            </div>

            <div class="form_btn">
              <v-btn
                variant="flat"
                @click="logout()"
                class="button-regular"
                style="width: 100%"
                >Logout</v-btn
              >
              <v-btn
                variant="flat"
                @click="logoutDialog = false"
                class="button-outlined"
                style="width: 100%"
                >Cancel</v-btn
              >
            </div>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { User, useUsersStore } from "@/stores/users";
import router from "@/router";

const route = useRoute();
const usersStore = useUsersStore();
const logoutDialog = ref(false);
const showDrawer = ref(false);
const user = ref<User | null>(null);

const logout = () => {
  usersStore.logoutUser();
};

onMounted(async () => {
  await usersStore.getCurrentUser();
  await usersStore.getUsers();
  user.value = usersStore.currentUser;
  if (route.path !== "/") {
    showDrawer.value = true;
  }
});

router.afterEach(() => {
  showDrawer.value = route.path !== "/";
});
</script>
