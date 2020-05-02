<template>
  <v-app>
    <v-app-bar dense max-height="50">
      <v-toolbar-title>Status: {{ systemName }}</v-toolbar-title>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; {{ new Date().getFullYear() }} {{ corporationName }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      systemName: process.env.SYSTEM_NAME,
      corporationName: process.env.CORPORATION_NAME
    }
  }
}
</script>
