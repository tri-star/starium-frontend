<template>
  <v-sheet height="60" elevation="2" :color="sheetBackgroundColor" class="text-center">
    <div class="status">
      <v-icon color="white mr-5">{{ statusIcon }}</v-icon>
      <div class="status-text">{{ statusText }}</div>
    </div>
  </v-sheet>

</template>

<script lang="ts">
import Vue from 'vue'
import ServiceStatus from '@/domains/ServiceStatus'

export default Vue.extend({
  props: {
    status: {
      type: String,
      default: ServiceStatus.STATUS_UNKNOWN
    }
  },

  computed: {
    sheetBackgroundColor() {
      if (this.status === ServiceStatus.STATUS_OK) {
        return 'green'
      }
      if (this.status === ServiceStatus.STATUS_ERROR) {
        return 'red'
      }
      return 'grey'
    },

    statusIcon() {
      if (this.status === ServiceStatus.STATUS_OK) {
        return 'mdi-check'
      }
      if (this.status === ServiceStatus.STATUS_ERROR) {
        return 'mdi-alert-octagon-outline'
      }
      return 'mdi-sync'
    },

    statusText() {
      if (this.status === ServiceStatus.STATUS_OK) {
        return 'Operational'
      }
      if (this.status === ServiceStatus.STATUS_ERROR) {
        return 'Error detected'
      }
      return 'Unknown'
    }

  }
})

</script>


<style lang="scss" scoped>
.status {
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  color: white;

  .status-text {
    display: inline-block;
  }
}

</style>
