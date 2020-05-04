import ServiceStatus from '@/domains/ServiceStatus'

export type ServiceStatusResult = {
  lastUpdated: Date | null,
  services: Array<ServiceStatus>
}

export default interface IServiceStatusAdapter {
  fetch(): Promise<ServiceStatusResult>
}
