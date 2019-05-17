import { BaseDomain } from 'core/domain/common'

export class RegisterUserResult extends BaseDomain {

  private _uid: string
  private _name: string
  private _email: string
  constructor (uid: string, name: string, email: string) {
    super()

    this._uid = uid
    this._name = name
    this._email = email
  }
    /**
     * User identifier
     *
     * @type {string}
     * @memberof LoginUser
     */

  public get uid (): string {
    return this._uid
  }

  public get name (): string {
    return this._name
  }

  public get email (): string {
    return this._email
  }
}
