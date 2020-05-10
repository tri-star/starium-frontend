<template>
  <IndexPage :lastUpdated="lastUpdated" :services="services" :informations="informations" />
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
      services: [] as Array<ServiceStatus>,
      informations: [] as Array<any>
    }
  },

  async asyncData(context) {
    const result = await context.app.$serviceStatusAdapter.fetch()

    const informations: Array<any> = [
      {date: new Date('2020-05-01'), title: 'test', message: 'message body.'},
    ]

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
