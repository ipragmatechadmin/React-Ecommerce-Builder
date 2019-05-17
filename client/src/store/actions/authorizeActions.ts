// - Import react components
import { push } from 'connected-react-router'

import { AuthorizeActionType } from 'constants/authorizeActionType'
import { IAuthorizeService } from 'src/core/services/authorize'
import { OAuthType, LoginUser } from 'src/core/domain/authorize'
import { SocialError } from 'src/core/domain/common'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { User } from 'src/core/domain/users'
import { UserRegisterModel } from 'src/models/users/userRegisterModel'
import { provider } from 'src/ecommerceEngine'
import * as globalActions from 'store/actions/globalActions'

/* _____________ CRUD State _____________ */

/**
 * Loing user
 * @param {string} uids
 */
export const login = (uid: string, email: string, displayName: string, authed: boolean) => {
  return {
    type: AuthorizeActionType.LOGIN,
    payload: { authed, email, uid, displayName }
  }
}

/**
 * Logout user
 */
export const logout = (msg: string, status: boolean) => {
  return {
    type: AuthorizeActionType.LOGOUT,
    payload: { msg, status }
  }
}

/**
 * User registeration call
 * @param user  for registering
 */
export const signup = (user: UserRegisterModel) => {
  return {
    type: AuthorizeActionType.SIGNUP,
    payload: { ...user }
  }

}

/**
 * Update user's password
 */
export const updatePassword = () => {
  return { type: AuthorizeActionType.UPDATE_PASSWORD }
}

/**
 * Get service providers
 */
const authorizeService: IAuthorizeService = provider.get<IAuthorizeService>(SocialProviderTypes.AuthorizeService)

/* _____________ CRUD DB _____________ */

/**
 * Log in user in server
 */
export const dbLogin = (email: string, password: string) => {
  return (dispatch: any, getState: any) => {
    return authorizeService.login(email, password).then((result) => {
      dispatch(login(result.uid, result.email,result.displayName, result.uid ? true : false))
      dispatch(push('/'))
    }, (error: SocialError) => {
        dispatch(globalActions.showMessage(error.message))
      }
    )
  }
}

/**
 * Log out user in server
 */
export const dbLogout = () => {
  return (dispatch: any, getState: any) => {
    return authorizeService.logout().then((result) => {
      dispatch(logout(result.msg, result.status))
      dispatch(push('/'))
    }, (error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

/**
 * Send email verification
 */
export const dbSendEmailVerfication = () => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.sendEmailVerification().then(() => {
      // Send email verification successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}

/**
 *
 * @param user for registering
 */
export const dbSignup = (user: UserRegisterModel) => {
  return (dispatch: Function, getState: Function) => {
    let newUser = new User()
    newUser.email = user.email
    newUser.password = user.password
    newUser.fullName = user.fullName

    return authorizeService.registerUser(newUser).then((result) => {
      dispatch(signup({
        userId: result.uid,
        fullName: result.name,
        email: result.email,
        ...user
      }))
      dispatch(dbSendEmailVerfication())
      dispatch(push('/emailVerification'))
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

/**
 * Change user's password
 * @param {string} newPassword
 */
export const dbUpdatePassword = (newPassword: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.updatePassword(newPassword).then(() => {

      // Update successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(updatePassword())
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        switch (error.code) {
          case 'auth/requires-recent-login':
            dispatch(globalActions.showMessage(error.code))
            dispatch(dbLogout())
            break
          default:

        }
      })
  }
}

/**
 * Reset user's password
 * @param {string} newPassword
 */
export const dbResetPassword = (email: string) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.resetPassword(email).then(() => {

      // Reset password successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(push('/login'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}

/**
 * Login user with OAuth
 */
export const dbLoginWithOAuth = (type: OAuthType) => {
  return (dispatch: any, getState: any) => {
    dispatch(globalActions.showNotificationRequest())

    return authorizeService.loginWithOAuth(type).then((result: LoginUser) => {
      // Send email verification successful.
      dispatch(globalActions.showNotificationSuccess())
      dispatch(login(result.uid, result.email, result.displayName, result.uid ? true : false))
      dispatch(push('/'))
    })
      .catch((error: SocialError) => {
        // An error happened.
        dispatch(globalActions.showMessage(error.code))

      })
  }
}
