import { Plugin } from '@nuxt/types'
import IServiceStatusAdapter from '@/adapters/ServiceStatusAdapter'
import ServiceStatusAdapter from '@/infrastructure/ServiceStatusAdapter'
import IInformationAdapter from '@/adapters/InformationAdapter'
import InformationAdapter from '~/infrastructure/InformationAdapter'

declare module 'vue/types/vue' {
  interface Vue {
    $serviceStatusAdapter: IServiceStatusAdapter
    $informationAdapter: IInformationAdapter
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $serviceStatusAdapter: IServiceStatusAdapter
    $informationAdapter: IInformationAdapter
  }
}

const adapters: Plugin = (_, inject) => {
  inject(
    'serviceStatusAdapter',
    new ServiceStatusAdapter(process.env.API_HOST_PREFIX as string, process.env.API_SERVICE_STATUS_PATH as string)
  )

  inject(
    'informationAdapter',
    new InformationAdapter(process.env.API_HOST_PREFIX as string, process.env.API_INFORMATION_PATH as string)
  )
}

export default adapters
