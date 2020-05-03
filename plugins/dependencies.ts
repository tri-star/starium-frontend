import { Plugin } from '@nuxt/types'
import IServiceStatusAdapter from '@/adapters/ServiceStatusAdapter'
import ServiceStatusAdapter from '@/infrastructure/ServiceStatusAdapter'

declare module 'vue/types/vue' {
  interface Vue {
    $serviceStatusAdapter: IServiceStatusAdapter
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $serviceStatusAdapter: IServiceStatusAdapter
  }
}

const serviceStatusAdapter: Plugin = (_, inject) => {
  inject(
    'serviceStatusAdapter',
    new ServiceStatusAdapter(process.env.API_HOST_PREFIX as string, process.env.API_SERVICE_STATUS_PATH as string)
  )
}

export default serviceStatusAdapter
