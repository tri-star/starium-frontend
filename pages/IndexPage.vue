<template>
  <v-container column justify-center align-center>
    <v-row>
      <v-col cols="10" offset="1" xl="8" offset-xl="2">
        <StatusHeader :status="globalStatus"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" offset="1" xl="8" offset-xl="2">
        <v-card>
          <v-card-title>Service Status</v-card-title>
          <div class="last-updated">Last Updated: {{ formattedLastUpdated }}</div>
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
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options'
import ServiceStatusItem from '@/components/ServiceStatusItem.vue'
import ServiceStatus from '@/domains/ServiceStatus'
import StatusHeader from '@/components/StatusHeader.vue'
import dayjs from 'dayjs'

type Data = {
}

type Method = {
}

type Computed = {
  formattedLastUpdated: string,
  globalStatus: string
}

type Props = {
  lastUpdated: Date,
  services: Array<ServiceStatus>
}

const options: ThisTypedComponentOptionsWithRecordProps<Vue, Data, Method, Computed, Props> = {
  components: {
    ServiceStatusItem,
    StatusHeader
  },

  props: {
    lastUpdated: {
      type: Date,
      required: true
    },
    services: {
      type: Array as Vue.PropType<Array<ServiceStatus>>,
      required: true
    }
  },

  computed: {
    formattedLastUpdated(): string{
      if(!this.lastUpdated) {
        return ''
      }
      return dayjs(this.lastUpdated).format('YYYY-MM-DD HH:mm:ss Z')
    },
    globalStatus() {
      if(!this.services) {
        return ServiceStatus.STATUS_UNKNOWN
      }
      const globalStatus = this.services.map(item => item.getStatus()).reduce((carry, current) => {
        if(carry !== ServiceStatus.STATUS_OK) {
          return ServiceStatus.STATUS_ERROR
        }
        if(current !== ServiceStatus.STATUS_OK) {
          return ServiceStatus.STATUS_ERROR
        }
        return ServiceStatus.STATUS_OK
      }, ServiceStatus.STATUS_OK);

      return globalStatus
    }
  }

}

export default Vue.extend(options)

</script>

<style lang="scss" scoped>
.last-updated {
  padding: 0 16px;
  font-size: 12px;
}

.service-status {
  padding: 16px;
}

</style>
