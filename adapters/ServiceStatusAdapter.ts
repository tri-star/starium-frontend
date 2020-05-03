import ServiceStatus from '@/domains/ServiceStatus'

export default interface IServiceStatusAdapter {
  fetch(): Promise<Array<ServiceStatus>>
}
