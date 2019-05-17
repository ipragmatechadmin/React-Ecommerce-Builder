// - Import react components
import { Map, fromJS } from 'immutable'

import { AddToCartActionType } from 'constants/addToCartActionType'

import { AddToCartState } from './addToCartState'
import { IAddToCartAction } from './IAddToCartAction'

const updateCartProduct = (state: any, payload: any) => {
  console.log(payload.cart)
  const product = payload.cart
  console.log('value of cart in produc', product.productId)
  const cartId: string =  payload.cartId
  const updateProductId = product.productId
  return state.setIn(
    ['cartProducts', cartId, updateProductId, 'productQuantity'],
    product.productQuantity
  )
}

/**
 * shipping reducer
 * @param {object} state
 * @param {object} action
 */
export let addToCartReducer = (state = Map(new AddToCartState()), action: IAddToCartAction) => {

  const { payload } = action
  switch (action.type) {
    case AddToCartActionType.CLEAR_ALL_DATA_CART:
      return Map(new AddToCartState())

    case AddToCartActionType.PRODUCT_TO_CART:
      return state.setIn(
        ['cartProducts', payload.cartId, payload.cart.productId],
        Map(payload.cart)
      )

    case AddToCartActionType.ORDER_TO_CART:
      return state
        .setIn(['order'], fromJS({...payload.order}))

    case AddToCartActionType.UPDATE_PRODUCT_TO_CART:
      return updateCartProduct(state, payload)

    case AddToCartActionType.REMOVE_PRODUCT_FROM_CART:
      return state.deleteIn(['cartProducts', payload.cartId, payload.cart.productId])
    default:
      return state

  }
}
