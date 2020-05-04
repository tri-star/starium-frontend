import axios from 'axios'
import IServiceStatusAdapter, {ServiceStatusResult} from '~/adapters/ServiceStatusAdapter'
import ServiceStatus from '~/domains/ServiceStatus'

export default class ServiceStatusAdapter implements IServiceStatusAdapter {
  /**
   * Endpoint URL prefix part (e.g. http://example.com)
   */
  endpointUrlPrefix: string

  /**
   * Endpoint URL path part (e.g. /starium.json)
   */
  statusPath: string

  /**
   *
   * @param endpointHost Endpoint host URL
   * @param statusPath
   */
  constructor(endpointUrlPrefix: string, statusPath: string) {
    this.endpointUrlPrefix = endpointUrlPrefix
    this.statusPath = statusPath
  }

  async fetch(): Promise<ServiceStatusResult> {
    const response = await axios.get(this.endpointUrlPrefix + this.statusPath)

    const result: ServiceStatusResult = {
      lastUpdated: null,
      services: []
    }
    if(!response.data.last_updated || !response.data.services) {
      return result
    }

    result.lastUpdated = new Date(response.data.last_updated)

    let serviceEntry: [string, any]
    for(serviceEntry of Object.entries(response.data.services)) {
      let serviceName: string = serviceEntry[0]
      let detail: any = serviceEntry[1]
      result.services.push(ServiceStatus.fromJSON({
        name: serviceName,
        status: detail?.status,
        error_detail: detail?.error_detail ?? ''
      }))
    }

    return result
  }
}
