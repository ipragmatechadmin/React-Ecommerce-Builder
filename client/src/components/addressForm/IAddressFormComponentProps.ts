import { ShippingAddress } from 'core/domain/shippings'
import { Order } from 'core/domain/cart'
export interface IAddressFormComponentProps {
  /**
   * Styles
   */
  classes?: any

  allShippingRegions?: any
  /**
   * Users of current circle
   */
  shippingRegions?: Map<string, any>

  /**
   * Users of current circle
   */
  shippingRegion?: Map<string, any>

  /**
   * Update active step
   *
   * @memberof IAddressComponentProps
   */
  update?: (shippingAddress: ShippingAddress) => any

  /**
   * get Shipping Rates
   *
   * @memberof IAddressComponentProps
   */
  getShippingRates?: (regionIs: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  /**
   * Merged all shipping rates to show
   *
   * @type {{[tnasId: string]: TnAs}}
   * @memberof IStreamComponentProps
   */
  shippingRates: Map<string, any>
  /**
   * logged in user
   */
  uid?: any

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
   * products in the cart
   */
  getCart?: Map<string, any>

  /**
   * Shipping Address object
   */
  shippingAddress?: any

  shopping?: any

}
