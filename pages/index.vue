<template>
  <v-container column justify-center align-center>
    <v-row>
      <v-col cols="10" offset="1" xl="8" offset-xl="2">
        <v-sheet height="60" elevation="2" color="green" class="text-center">
          <div class="status">
            <v-icon color="white mr-5">mdi-check</v-icon>
            <div class="status-text">Healthy</div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" xl="8" offset-xl="2">
        <v-card>
          <v-card-title>Service Status</v-card-title>
          <div class="last-updated">Last Updated: {{ lastUpdated }}</div>
          <div class="service-status">
            <ServiceStatusItem
              v-for="service of services"
              :key="service.getName()"
              :service-status="service"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import ServiceStatusItem from '@/components/ServiceStatusItem.vue'
import ServiceStatus from '@/domains/ServiceStatus'

export default Vue.extend({
  components: {
    ServiceStatusItem
  },
  data() {
    return {
      lastUpdated: new Date(),
      services: [] as Array<ServiceStatus>
    }
  },

  async asyncData(context) {
    const result = await context.app.$serviceStatusAdapter.fetch()
    return {
      lastUpdated: result.lastUpdated,
      services: result.services
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

.last-updated {
  padding: 0 16px;
  font-size: 12px;
}

.service-status {
  padding: 16px;
}
</style>
