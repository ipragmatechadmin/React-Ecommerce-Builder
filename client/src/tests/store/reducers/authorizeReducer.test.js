import { authorizeReducer } from '../../../store/reducers/authorize'
import { AuthorizeState } from '../../../store/reducers/authorize/AuthorizeState'
import { AuthorizeActionType } from '../../../constants/authorizeActionType'
import { Map } from 'immutable'

describe('authorize reducer', () => {
  it('should return the initial state', () => {
    expect(authorizeReducer(undefined, {})).toMatchSnapshot()
  })

  it('should handle LOGIN', () => {
    let state = Map(new AuthorizeState())
    expect(
      authorizeReducer(state, {
        type: AuthorizeActionType.LOGIN,
        payload: { authed: true, isVerifide: true, uid: '1' }
      })
    ).toMatchSnapshot()
  })

  it('should handle SIGNUP', () => {
    let state = Map(new AuthorizeState())
    expect(
      authorizeReducer(state, {
        type: AuthorizeActionType.SIGNUP,
        payload: { userId: '1' }
      })
    ).toMatchSnapshot()
  })

  it('should handle Logout', () => {
    let state = Map(new AuthorizeState())
    expect(
      authorizeReducer(state, {
        type: AuthorizeActionType.LOGOUT,
        payload: { msg: 'User logout successfully1', status: true }
      })
    ).toMatchSnapshot()
  })
})
