import axios from 'axios'
import Information from "@/domains/Information";
import IInformationAdapter from "@/adapters/InformationAdapter";


export default class InformationAdapter implements IInformationAdapter {

  /**
   * Endpoint URL prefix part (e.g. http://example.com)
   */
  private _endpointUrlPrefix: string

  /**
   * Endpoint URL path part (e.g. /information.json)
   */
  private _apiPath: string

  constructor(endpointUrlPrefix: string, apiPath: string) {
    this._endpointUrlPrefix = endpointUrlPrefix
    this._apiPath = apiPath
  }

  async fetch(): Promise<Array<Information>> {
    const response = await axios.get(this._endpointUrlPrefix + this._apiPath)

    const result: Array<Information> = []

    if(!(response.data instanceof Array)) {
      return result
    }

    let record: any
    for(let i in response.data) {

      record = response.data[i]

      result.push(new Information(
        record.id || '',
        new Date( record.date),
        record.title || '',
        record.message || ''
      ))
    }

    return result
  }
}
