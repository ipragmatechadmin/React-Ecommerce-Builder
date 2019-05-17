// - Import react components
import { Map } from 'immutable'

import { AuthorizeActionType } from 'constants/authorizeActionType'

import { AuthorizeState } from './AuthorizeState'
import { IAuthorizeAction } from './IAuthorizeAction'

/**
 *  Authorize reducer
 * @param {object} state
 * @param {object} action
 */
export let authorizeReducer = (state = Map(new AuthorizeState() as any), action: IAuthorizeAction) => {
  const { payload } = action
  switch (action.type) {
    case AuthorizeActionType.LOGIN:
    return state
        .set('uid', payload.uid)
        .set('authed', payload.authed)
        .set('guest', false)
        .set('isVerifide', true)
        .set('displayName', payload.displayName)
        .set('email', payload.email)

    case AuthorizeActionType.LOGOUT:
      return state
        .set('uid', 0)
        .set('authed', false)
        .set('guest', true)
        .set('isVerifide', false)
        .set('logoutMessage', payload.msg)
        .set('logoutStatus', payload.status)
        .set('displayName', '')
        .set('email', '')

    case AuthorizeActionType.SIGNUP:
      return state
      .set('uid', payload.userId)
      .set('displayName', payload.fullName)
      .set('email', payload.email)
    case AuthorizeActionType.UPDATE_PASSWORD:
      return state
      .set('updatePassword', payload.updatePassword)
    default:
      return state

  }

}
