import { Cart } from 'src/core/domain/cart'
export interface IAddToCartComponentProps {
  /**
   * Styles
   */
  classes?: any
  /**
   * position of app bar
   */
  position?: string

  /**
   * Users of current circle
   */
  cartProducts?: Map<string, any>

  /**
   * Redirect to {url} route
   *
   * @memberof IProductDetailComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Close notification
   * Redirect to {url} route
   *
   * @memberof IProductDetailComponentProps
   */
  onRequestClose: () => void

  /**
   * User cart popover is opem {true} or not {false}
   */
  open: boolean

  /**
   * Keep element
   */
  anchorEl?: any

  /**
   * Post object
   */
  updateToCart?: (itemId: string, cardId: string, cart: Cart) => any

}
