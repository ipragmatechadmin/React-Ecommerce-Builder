import { Cart } from 'core/domain/cart'
import { Order } from 'core/domain/cart'

/**
 * Cart service interface
 *
 * @export
 * @interface ICartService
 */
export interface ICartService {
/**
 * @returns {Promise<void>}
 */
addCartItem: (cartId: string, cart: Cart) => Promise<Cart>

addOrder: (order: Order) => Promise<Order>

updateOrder: (orderId: string, order: Order) => Promise<Order>

updateCartItem: (itemId: string, cartId: string, cart: Cart) => Promise<Cart>

}
