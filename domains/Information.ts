

/**
 * お知らせ情報
 */
export default class Information {

  /**
   * お知らせのID
   */
  private _id: string;

  /**
   * お知らせの日時
   */
  private _date: Date

  /**
   * お知らせのタイトル
   */
  private _title: string

  /**
   * お知らせ本文
   */
  private _message: string


  constructor(id: string, date: Date, title: string, message: string) {
    this._id = id
    this._date = date
    this._title = title
    this._message = message
  }

  get id(): string {
    return this._id
  }

  get date(): Date {
    return this._date
  }

  get title(): string {
    return this._title
  }

  get message(): string {
    return this._message
  }

}
