<template>
  <IndexPage :lastUpdated="lastUpdated" :services="services" :informations="informations" />
</template>

<script lang="ts">
import Vue from 'vue'
import IndexPage from './IndexPage.vue'
import ServiceStatus from '@/domains/ServiceStatus'
import Information from '@/domains/Information'

export default Vue.extend({
  components: {
    IndexPage
  },

  data() {
    return {
      lastUpdated: new Date(),
      services: [] as Array<ServiceStatus>,
      informations: [] as Array<Information>
    }
  },

  async asyncData(context) {
    const result = await context.app.$serviceStatusAdapter.fetch()

    const informations = await context.app.$informationAdapter.fetch()

    return {
      lastUpdated: result.lastUpdated,
      services: result.services,
      informations
    }
  },

})
</script>

<style lang="scss" scoped>
</style>
