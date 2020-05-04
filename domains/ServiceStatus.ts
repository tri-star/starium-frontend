/**
 * サービス状態を表すオブジェクト
 */
export default class ServiceStatus {
  static readonly STATUS_OK = 'OK'
  static readonly STATUS_ERROR = 'ERROR'
  static readonly STATUS_UNKNOWN = 'UNKNOWN'

  /**
   * サービス名
   */
  protected name!: string

  /**
   * サービス状態コード(STATUS_XXX)
   */
  protected status!: string

  /**
   * エラーの詳細情報
   * @var [string]
   */
  protected errorDetail!: string

  constructor(
    name: string,
    status: string = ServiceStatus.STATUS_UNKNOWN,
    errorDetail: string = ''
  ) {
    this.name = name
    this.status = status
    this.errorDetail = errorDetail
  }

  public static fromJSON(json: any): ServiceStatus {
    return new ServiceStatus(
      json.name ?? '',
      json.status ?? ServiceStatus.STATUS_UNKNOWN,
      json.error_detail ?? ''
    )
  }

  public getName(): string {
    return this.name
  }

  public getStatus(): string {
    return this.status
  }
}
