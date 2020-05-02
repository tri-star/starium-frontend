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
  protected name: string

  /**
   * サービス状態コード(STATUS_XXX)
   */
  protected status: string

  /**
   * エラーの詳細情報
   * @var [string]
   */
  protected errorDetail: string

  constructor() {
    this.name = ''
    this.status = ServiceStatus.STATUS_UNKNOWN
    this.errorDetail = ''
  }
}
