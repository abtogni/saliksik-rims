<template>
  <v-card flat class="body">
    <v-card-title flat class="header">
      <div class="header-left truncate">
        <div class="header-caption-ctr">
          <h6>Researches</h6>
        </div>
      </div>
    </v-card-title>

    <v-divider />

    <v-hover v-slot:default="{ isHovering, props }">
      <v-card
        flat
        rounded="0"
        v-bind="props"
        :color="isHovering ? '#eef2ff' : undefined"
        style="height: fit-content"
      >
        <v-card-text class="pres-res-body">
          <div class="pres-res-left">
            <v-btn variant="text" icon="mdi-account-multiple-outline">
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
              >
                <div class="bold-upper">Researchers</div>
                <div></div>
              </v-tooltip>
            </v-btn>
            <div class="text">
              Insert title and overview
            </div>
          </div>
          <div class="pres-res-right text">
              <v-btn
                variant="text"
                icon="mdi-comment-plus-outline"
                type="submit"
                @click="$router.push(`/panelist/panelist_comments_field`)"
              >
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
              >Add Comments
              </v-tooltip>
              </v-btn>

              <v-btn
                variant="text"
                icon="mdi-comment-edit-outline"
                type="submit"
                @click="$router.push(`/panelist/panelist_comments_field`)"
              >
              <v-icon></v-icon>
              <v-tooltip
                activator="parent"
                location="bottom"
                class="tooltip-list"
              >Edit Comments
              </v-tooltip>
              </v-btn>
            </div>
        </v-card-text>
      </v-card>
    </v-hover>
  </v-card>
</template>
