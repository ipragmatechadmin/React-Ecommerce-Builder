import { Cart } from 'src/core/domain/cart'
export interface IProductComponentProps {

  /**
   * Product with it's attributes
   *
   * @type {map}
   * @memberof IProductComponentProps
   */

  product: Map<string, any>

  /**
   * Redirect to {url} route
   *
   * @memberof IProductComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  /**
   * Post object
   */
  addToCart?: (cardId: string, cart: Cart) => any

  /**
   * Product object
   */
  cart?: Map<string, any>

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {boolean}
   * @memberof IProductComponentProps
   */
  authed?: boolean
}
