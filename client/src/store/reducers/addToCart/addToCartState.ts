import { Cart } from 'src/core/domain/cart'
import {Map} from 'immutable'
/**
 * add to cart state
 *
 * @export
 * @class addtocartState
 */
export class AddToCartState {
  [key: string]: any
  /**
   * The list of products on the cart
   */
    cartProducts = Map({})
}
