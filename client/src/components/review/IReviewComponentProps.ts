import { Order } from 'core/domain/cart'
export interface IReviewComponentProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * Shipping Address object
   */
  shippingAddress: Map<string, any>

  /**
   * On edit profile dialog close event
   *
   * @memberof IReviewComponentProps
   */
  update?: (value: number) => void

  /**
   * products in the cart
   */
  getCart?: Map<string, any>

  /**
   * products in the cart
   */
  getshipping?: Map<string, any>

  /**
   * add order
   *
   * @memberof IReviewComponentProps
   */
  addOrder?: (order: Order) => void

  /**
   * products in the cart
   */
  getshippingId?: number

  /**
   * logged in user
   */
  uid?: any

  /**
   * id of order
   */
  orderId?: any

  /**
   * Post object
   */
  updateOrder?: (orderId: string, order: Order) => any
}
