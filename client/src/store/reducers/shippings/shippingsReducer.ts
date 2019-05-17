// - Import react components
import { Map, fromJS } from 'immutable'

import { ShippingsActionType } from 'constants/shippingsActionType'

import { IShippingsAction } from './IShippingsAction'
import { ShippingsState } from './ShippingsState'

const updateshipping = (state: any, payload: any) => {
  const shipping: Map<string, any> = payload.shipping
  const updateshippingOwnerId = shipping.get('ownerUserId')
  const updateshippingId = shipping.get('id')
  return state
      .setIn(['usershippings', updateshippingOwnerId, updateshippingId], Map(shipping))
}

const updateshippingComments = (state: any, payload: any) => {
  const shipping: Map<string, any> = payload.shipping
  const updateshippingOwnerId = shipping.get('ownerUserId')
  const updateshippingId = shipping.get('id')
  return state
      .setIn(['usershippings', updateshippingOwnerId, updateshippingId, 'comments'], shipping.get('comments'))
}

const updateshippingVotes = (state: any, payload: any) => {
  const shipping: Map<string, any> = payload.shipping
  const updateshippingOwnerId = shipping.get('ownerUserId')
  const updateshippingId = shipping.get('id')
  return state
      .setIn(['usershippings', updateshippingOwnerId, updateshippingId, 'votes'],  shipping.get('votes'))
}

/**
 * shipping reducer
 * @param {object} state
 * @param {object} action
 */
export let shippingsReducer = (state = Map(new ShippingsState()), action: IShippingsAction) => {
  const { payload } = action
  switch (action.type) {
    case ShippingsActionType.CLEAR_ALL_DATA_PRODUCT:
      return Map(new ShippingsState())

    case ShippingsActionType.ADD_IMAGE_PRODUCT:
      return state
        .setIn(['usershippings', payload.uid, payload.shipping.id], Map(payload.shipping))

    case ShippingsActionType.ADD_PRODUCT:
      return state
        .setIn(['usershippings', payload.uid, payload.shipping.id], fromJS({...payload.shipping}))

    case ShippingsActionType.UPDATE_PRODUCT: return updateshipping(state, payload)
    case ShippingsActionType.UPDATE_PRODUCT_COMMENTS: return updateshippingComments(state, payload)
    case ShippingsActionType.UPDATE_PRODUCT_VOTES: return updateshippingVotes(state, payload)

    case ShippingsActionType.DELETE_PRODUCT:
      return state
        .deleteIn(['usershippings', payload.uid, payload.id])

    case ShippingsActionType.ADD_LIST_SHIPPING_RIGIONS:
      return state
        .setIn(['shippingRegions'], payload.shippingRegions)

    case ShippingsActionType.ADD_LIST_SHIPPING_RATES:
      return state
        .setIn(['shippingRates'], payload.shippingRates)

    case ShippingsActionType.HAS_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], true)

    case ShippingsActionType.NOT_MORE_DATA_STREAM:
      return state
        .setIn(['stream', 'hasMoreData'], false)

    case ShippingsActionType.REQUEST_PAGE_STREAM:
      return state
        .setIn(['stream', 'lastPageRequest'], payload.page)

    case ShippingsActionType.LAST_PRODUCT_STREAM:
      return state
        .setIn(['stream', 'lastshippingId'], payload.lastshippingId)

    case ShippingsActionType.HAS_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', 'hasMoreData'], true)

    case ShippingsActionType.NOT_MORE_DATA_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'hasMoreData'], false)

    case ShippingsActionType.REQUEST_PAGE_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastPageRequest'], payload.page)

    case ShippingsActionType.LAST_PRODUCT_PROFILE:
      return state
        .setIn(['profile', payload.userId, 'lastshippingId'], payload.lastshippingId)

    case ShippingsActionType.ADD_SHIPPING_ADDRESS:
      return state.setIn(['shippingAddress'], payload.shippingAddress )

    default:
      return state

  }
}
