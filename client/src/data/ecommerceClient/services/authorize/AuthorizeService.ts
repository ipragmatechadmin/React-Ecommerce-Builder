import 'reflect-metadata'

import { injectable } from 'inversify'
import axios from 'axios'

import { IAuthorizeService } from 'core/services/authorize'
import { LoginUser, RegisterUserResult } from 'core/domain/authorize'
import { OAuthType } from 'core/domain/authorize/oauthType'
import { SocialError } from 'core/domain/common'
import { User } from 'core/domain/users'
import { getLoginURL, getSignupURL, getLogoutURL, getUserInfoURL } from 'data/ecommerceClient'

/**
 * Firbase authorize service
 *
 * @export
 * @class AuthorizeService
 * @implements {IAuthorizeService}
 */
@injectable()
export class AuthorizeService implements IAuthorizeService {

  /**
   * Login the user
   */
  public login = (email: string, password: string) => {
    return new Promise<LoginUser>((resolve, reject) => {
      const data = {email: email,password: password}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.post(getLoginURL, data, config)
      .then((result) => {
        // The signed-in user info.
        resolve(new LoginUser(result.data.customerId, true, '0' , result.data.name, result.data.email))
      }).catch(error => {
        if (error.message.includes('401')) {
          reject(new SocialError('401', 'Please check your email and password again'))
        } else {
          reject(new SocialError(error.code, error.message))
        }

      })

    })
  }

  /**
   * Logs out the user
   *
   * @returns {Promise<void>}
   * @memberof IAuthorizeService
   */
  public logout: () => Promise<{msg: string, status: boolean}> = () => {
    return new Promise<{msg: string, status: boolean}>((resolve, reject) => {
      const data = {}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.post(getLogoutURL, data, config)
      .then((result) => {
        resolve(result.data)

      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })
    })
  }

  /**
   * Register a user
   */
  public registerUser = (registerUser: User) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
      const data = {email: registerUser.email as string,password: registerUser.password as string, name: registerUser.fullName as string}
      const config = { headers: {'Content-Type': 'application/json'},  withCredentials: true }

      axios.post(getSignupURL, data, config)
      .then((result) => {
        // The signed-in user info.
         resolve(new RegisterUserResult(result.data.customerId, result.data.name, result.data.email))

      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })

    })
  }

  /**
   * Update user password
   *
   * @returns {Promise<void>}
   * @memberof IAuthorizeService
   */
  public updatePassword: (newPassword: string) => Promise<void> = (newPassword) => {

    return new Promise<void>((resolve, reject) => {
        // TODO
        resolve()
    })
  }

  /**
   * On user authorization changed event
   *
   * @memberof IAuthorizeService
   */
  public onAuthStateChanged: (callBack: (isVerifide: boolean, user: User) => void) => any = (callBack) => {
      // TODO - Need to get real user
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.get(getUserInfoURL, config)
      .then((result) => {
        // The signed-in user info.
        let user = new User()
        user.email = result.data.email
        user.userId = result.data.customerId
        user.fullName = result.data.name
        callBack(true, user)
      }).catch(error => {
        callBack(false, new User())
      })

  }

  /**
   * Reset user password
   *
   * @memberof AuthorizeService
   */
  public resetPassword: (email: string) => Promise<void> = (email) => {
    return new Promise<void>((resolve, reject) => {
        // TODO
        resolve()
    })
  }

  /**
   * Send verfication email to user email
   *
   * @memberof AuthorizeService
   */
  public sendEmailVerification: () => Promise<void> = () => {
    return new Promise<void>((resolve, reject) => {
          // TODO
          resolve()
    })
  }

  public loginWithOAuth: (type: OAuthType) => Promise<LoginUser> = (type) => {
    return new Promise<LoginUser>((resolve, reject) => {
        // TODO
      resolve()
    })
  }

  /**
   * Store user information
   *
   * @private
   * @memberof AuthorizeService
   */
  private storeUserInformation = (userId: string, email: string, fullName: string, avatar: string) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
          // TODO
          resolve(new RegisterUserResult(userId, fullName, email))
    })
  }

  /**
   * Store user provider information
   *
   * @private
   * @memberof AuthorizeService
   */
  private storeUserProviderData = (
    userId: string,
    email: string,
    fullName: string,
    avatar: string,
    providerId: string,
    accessToken: string
  ) => {
    return new Promise<RegisterUserResult>((resolve, reject) => {
        // TODO
        resolve(new RegisterUserResult(userId, fullName, email))
    })
  }
}
