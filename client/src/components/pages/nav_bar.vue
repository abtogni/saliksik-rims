<template>
  <v-navigation-drawer v-if="showDrawer" expand-on-hover rail>
    <!-- Drawer content -->
    <v-list>
      <v-list-item :title="user?.firstName + ' ' + user?.lastName" :subtitle="user?.userID" />
    </v-list>

    <v-divider />

    <v-list density="compact" nav>
      <!-- Sample -->
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="Researcher" value="myfiles" href="/researcher"
        link />
      <v-list-item prepend-icon="mdi-folder-multiple-outline" title="All Research Projects" value="myfiles" href=""
        link />
      <v-list-item prepend-icon="mdi-account-multiple" title="Shared with me" value="shared" link />
      <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" link />
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn block @click="logoutDialog = true" class="button-regular">
          LOGOUT
        </v-btn>

        <v-dialog v-model="logoutDialog" width="auto">
          <v-card>
            <v-card-text>
              Do you really want to log out?
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn color="primary" block @click="logout">Logout</v-btn>
                </v-col>
                <v-col>
                  <v-btn color="primary" block @click="logoutDialog = false">Cancel</v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { User, useUsersStore } from '@/stores/users';
import router from '@/router';

const route = useRoute();
const usersStore = useUsersStore();
const logoutDialog = ref(false);
const showDrawer = ref(false);
const user = ref<User | null>(null);

const logout = () => {
  usersStore.logoutUser;
  router.push({ path: '/' });
}

onMounted(async () => {
  await usersStore.getCurrentUser();
  await usersStore.getUsers();
  user.value = usersStore.currentUser;
  showDrawer.value = route.path !== '/';
});

router.afterEach(() => {
  showDrawer.value = route.path !== '/';
});
</script>
