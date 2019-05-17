// - Import react components
import { injectable } from 'inversify'
import axios from 'axios'

import { Cart, Order } from 'core/domain/cart'
import { ICartService } from 'core/services/cart'
import { SocialError } from 'core/domain/common'
import { addCartItemURL, addOrderURL} from 'data/ecommerceClient'

/**
 * Cart service
 *
 * @export
 * @class CartService
 * @implements {ICartService}
 */
@injectable()
export class CartService implements ICartService {
  /**
   * Register a user
   */
  public addCartItem = (cartId: string, cart: Cart) => {
    return new Promise<Cart>((resolve, reject) => {
      const attributes = JSON.stringify({
        productColor: cart.productColor as string,
        productSize: cart.productSize as string,
        productThumbnail: cart.productThumbnail as string
      })
      const data = {cartId: cartId, productId: cart.productId as number, quantity: cart.productQuantity as number, attributes: attributes}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.post(addCartItemURL, data, config)
      .then((result) => {
        console.log(result)
         resolve(result.data)
      }).catch(error => {
        console.log(error)
        reject(new SocialError(error.code, error.message))
      })

    })
  }

  /**
   * Register a user
   */
  public updateCartItem = (itemId: string, cartId: string, cart: Cart) => {
    return new Promise<Cart>((resolve, reject) => {
      const url = addCartItemURL + '/' + itemId
      const data = {quantity: cart.productQuantity as number}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.put(url, data, config)
      .then((result) => {
         resolve(result.data)
      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })

    })
  }

  public addOrder = (order: Order) => {
    return new Promise<Order>((resolve, reject) => {
      const data = {cartId: order.cartId, customerId: order.customerId, shippingId: order.shippingId, taxId: order.taxId}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.post(addOrderURL, data, config)
      .then((result) => {
         resolve(result.data)

      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })

    })
  }

  public updateOrder = (orderId: string, order: Order) => {
    return new Promise<Order>((resolve, reject) => {
      const url = addOrderURL + '/' + orderId
      const data = {status: order.status, comments: order.comments, authCode: order.authcode, reference: 'reference'}
      const config = { headers: {'Content-Type': 'application/json'}, withCredentials: true }
      axios.put(url, data, config)
      .then((result) => {
         resolve(result.data)

      }).catch(error => {
        reject(new SocialError(error.code, error.message))
      })

    })
  }
}
