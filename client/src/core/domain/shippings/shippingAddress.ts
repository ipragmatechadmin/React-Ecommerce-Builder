import { BaseDomain } from 'core/domain/common'
export class ShippingAddress extends BaseDomain {
  /**
   * ShippingRegion identifier
   *
   * @type {number}
   * @memberof ShippingRegion
   */
  public region?: number | null

  /**
   * First name of shipping address
   * @type {string}
   * @memberof ShippingAddress
   */
  public firstName?: string | null

  /**
   * Last name of shipping address
   * @type {string}
   * @memberof ShippingAddress
   */
  public lastName?: string | null

  /**
   * Shipping address
   * @type {string}
   * @memberof ShippingAddress
   */
  public address?: string | null

  /**
   * City of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public city?: string | null

  /**
   * State of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public state?: string | null

  /**
   * Zip of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public postalCode?: string | null

  /**
   * region value of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public regionValue?: string | null

  /**
   * type value of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public shippingType?: string | null

  /**
   * cost of shipping
   * @type {string}
   * @memberof ShippingAddress
   */
  public shippingCost?: string | null

  /**
   * Shipping identifier
   * @type {string}
   * @memberof ShippingAddress
   */
  public shippingId?: string | null

  /**
   * Shipping identifier
   * @type {string}
   * @memberof ShippingAddress
   */
  public customerId?: number | null
}
