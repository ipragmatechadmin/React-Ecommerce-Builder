// - Import action types
import { AddToCartActionType } from 'constants/addToCartActionType'
import { Cart, Order } from 'src/core/domain/cart'
import { ICartService } from 'src/core/services/cart'
import { SocialError } from 'src/core/domain/common'
import { SocialProviderTypes } from 'src/core/socialProviderTypes'
import { provider } from 'src/ecommerceEngine'
import * as globalActions from 'store/actions/globalActions'

/**
 * Get service providers
 */
const cartService: ICartService = provider.get<ICartService>(SocialProviderTypes.CartService)

export const dbAddProductToCart = (cartId: string, cart: Cart) => {
  return (dispatch: Function, getState: Function) => {

    return cartService.addCartItem(cartId, cart).then((result) => {
      cart.itemId = result.itemId
      dispatch(addProductToCart(cartId,cart))
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

export const dbUpdateCartItem = (itemId: string, cartId: string, cart: Cart) => {
  return (dispatch: Function, getState: Function) => {

    return cartService.updateCartItem(itemId,cartId, cart).then((result) => {
      if ( result.quantity === 0 ) {
          dispatch(removeProductFromCart(cartId,cart))
      } else {
          dispatch(updateProductToCart(cartId,cart))
      }

    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

export const dbAddOrder = (order: Order) => {
  return (dispatch: Function, getState: Function) => {
    return cartService.addOrder(order).then((result: Order ) => {
      dispatch(addOrderToCart(result))
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}

export const dbUpdateOrder = (orderId: string, order: Order) => {
  return (dispatch: Function, getState: Function) => {
    return cartService.updateOrder(orderId, order).then((result: Order ) => {
        dispatch(clearCart())
    })
      .catch((error: SocialError) => dispatch(globalActions.showMessage(error.code)))
  }

}
  /* _____________ CRUD State _____________ */

  /**
   * Add a list of rigions
   */
  export const addProductToCart = (cartId: string, cart: Cart) => {

    return {
      type: AddToCartActionType.PRODUCT_TO_CART,
      payload: {cartId, cart}
    }
  }

  /**
   * Add a list of rigions
   */
  export const updateProductToCart = (cartId: string, cart: Cart) => {

    return {
      type: AddToCartActionType.UPDATE_PRODUCT_TO_CART,
      payload: {cartId, cart}
    }
  }

  /**
   * Add a list of rigions
   */
  export const removeProductFromCart = (cartId: string, cart: Cart) => {

    return {
      type: AddToCartActionType.REMOVE_PRODUCT_FROM_CART,
      payload: {cartId, cart}
    }
  }

  /**
   * Add a list of rigions
   */
  export const addOrderToCart = (order: Order) => {

    return {
      type: AddToCartActionType.ORDER_TO_CART,
      payload: {order}
    }
  }

  /**
   * Clea search list in product store
   */
  export const clearCart = () => {
    return {
      type: AddToCartActionType.CLEAR_ALL_DATA_CART
    }
  }
