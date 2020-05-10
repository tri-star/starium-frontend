<template>
  <IndexPage :lastUpdated="lastUpdated" :services="services" />
</template>

<script lang="ts">
import Vue from 'vue'
import IndexPage from './IndexPage.vue'
import ServiceStatus from '@/domains/ServiceStatus'

export default Vue.extend({
  components: {
    IndexPage
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
  },

})
</script>

<style lang="scss" scoped>
</style>
