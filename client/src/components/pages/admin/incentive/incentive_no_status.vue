<template>
  <div style="padding-bottom: 0.833rem">
    <v-row no-gutters class="table-toolbar">
      <v-text-field
        label="Search"
        prepend-inner-icon="mdi-magnify"
        single-line
        variant="outlined"
        hide-details
        density="compact"
        class="search_bar"
      />
    </v-row>
    <v-data-table >
      <template>
        <tr
          style="
            text-transform: capitalize;
            font-weight: 400;
            color: #6b7280;
            font-size: 1rem;
          "
        >
          <td>
            <span>
              <template>, </template>
            </span>
          </td>
          <td>
            <a href="%"></a>
          </td>

          <td>
            <v-chip variant="tonal" color="primary"></v-chip>
          </td>
          <td></td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script setup lang="ts"></script>
