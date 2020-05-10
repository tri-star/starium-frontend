import { mount, createLocalVue } from '@vue/test-utils'
import IndexPage from '@/pages/IndexPage.vue'
import ServiceStatus from '@/domains/ServiceStatus'
import Information from '@/domains/Information'

const localVue = createLocalVue()


describe('IndexPage', () => {

  const createWrapper = (lastUpdated: Date, services: Array<ServiceStatus>, informations: Array<Information>) => {
    return mount(IndexPage, {
      localVue,
      propsData: {
        lastUpdated,
        services,
        informations
      }
    })
  }

  describe('Last updated', () => {

    const datePatterns = [
      {
        name: 'General date',
        date: new Date('2020-05-01 00:00:00 +09:00'),
        expected: 'Last Updated: 2020-05-01 00:00:00 +09:00'
      }
    ]

    datePatterns.forEach((pattern: any) => {
      test(`${pattern.name}`, () => {
        const wrapper = createWrapper(pattern.date, [], [])
        expect(wrapper.find('.last-updated').text()).toBe(pattern.expected)
      })

    })

  })

  describe('Service list', () => {

      test('No data', () => {
        const wrapper = createWrapper(new Date(), [], [])
        expect(wrapper.findAll('.service-status-item').exists()).toBeFalsy()
      })

      test('Operational', () => {
        const status = new ServiceStatus('Some', ServiceStatus.STATUS_OK)
        const wrapper = createWrapper(new Date(), [
          status
        ], [])
        expect(wrapper.find('.service-status-item [data-test="service-name"]').text()).toBe(status.getName())
        expect(wrapper.find('.service-status-item').element.classList.contains('service-status-item-ok')).toBeTruthy()
        expect(wrapper.find('.service-status-item [data-test="service-status"]').text()).toBe('Operational')
      })

      test('Error', () => {
        const status = new ServiceStatus('Some2', ServiceStatus.STATUS_ERROR)
        const wrapper = createWrapper(new Date(), [
          status
        ], [])
        expect(wrapper.find('.service-status-item [data-test="service-name"]').text()).toBe(status.getName())
        expect(wrapper.find('.service-status-item').element.classList.contains('service-status-item-error')).toBeTruthy()
        expect(wrapper.find('.service-status-item [data-test="service-status"]').text()).toBe('Error detected')
      })

  })

  describe('Information list', () => {
    test('No data', () => {
      const wrapper = createWrapper(new Date(), [], [])

      expect(wrapper.find('[data-test="information-item"]').exists()).toBeFalsy()
    })

    test('Single data', () => {
      const wrapper = createWrapper(new Date(), [], [
        new Information(new Date('2020-05-01 00:00:00 +09:00'), 'Test title', 'message body.')
      ])

      expect(wrapper.findAll('[data-test="information-item"]').length).toBe(1)
      expect(wrapper.find('[data-test="information-item"] [data-test="information-title"]').text()).toBe('Test title')
      expect(wrapper.find('[data-test="information-item"] [data-test="information-message"]').text()).toBe('message body.')
      expect(wrapper.find('[data-test="information-item"] [data-test="information-date"]').text()).toBe('2020-05-01 00:00:00 +09:00')
    })

  })

})
