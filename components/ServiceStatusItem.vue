<template>
  <v-sheet
    :color="sheetBackgroundColor"
    :class="['service-status-item', sheetClassName, 'd-flex', 'md4']"
  >
    <div>{{ serviceStatus.name }}</div>
    <v-spacer />
    <v-icon>{{ statusIcon }}</v-icon>
    <div>{{ statusText }}</div>
  </v-sheet>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { IServiceStatus } from '../types/ApplicationTypes'
import ServiceStatus from '@/domains/ServiceStatus'

export default Vue.extend({
  props: {
    serviceStatus: {
      type: Object as Vue.PropType<IServiceStatus>,
      required: true
    }
  },

  computed: {
    sheetClassName() {
      if (this.serviceStatus.status === ServiceStatus.STATUS_OK) {
        return 'service-status-item-ok'
      }
      if (this.serviceStatus.status === ServiceStatus.STATUS_ERROR) {
        return 'service-status-item-error'
      }
      return 'service-status-unknown'
    },
    sheetBackgroundColor() {
      if (this.serviceStatus.status === ServiceStatus.STATUS_OK) {
        return 'light-green lighten-4'
      }
      if (this.serviceStatus.status === ServiceStatus.STATUS_ERROR) {
        return 'light-red lighten-4'
      }
      return 'grey lighten-4'
    },

    statusIcon() {
      if (this.serviceStatus.status === ServiceStatus.STATUS_OK) {
        return 'mdi-check'
      }
      if (this.serviceStatus.status === ServiceStatus.STATUS_ERROR) {
        return 'mdi-alert-octagon-outline'
      }
      return 'mdi-sync'
    },

    statusText() {
      if (this.serviceStatus.status === ServiceStatus.STATUS_OK) {
        return 'Operational'
      }
      if (this.serviceStatus.status === ServiceStatus.STATUS_ERROR) {
        return 'Error detected'
      }
      return 'Unknown'
    }
  }
})
</script>

<style lang="scss" scoped>
.service-status-item {
  padding: 10px;
  margin-bottom: 10px;

  div {
    padding: 5px;
  }

  &-ok {
    background-color: #eceff1;
    color: #1b5e20;

    i {
      color: #1b5e20;
    }
  }
  &-error {
    background-color: #ffcdd2;
    color: #b71c1c;

    i {
      color: #b71c1c;
    }
  }

  &-unknown {
    background-color: #f5f5f5;
    color: #212121;

    i {
      color: #212121;
    }
  }
}
</style>
