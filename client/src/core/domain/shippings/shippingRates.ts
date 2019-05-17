import { BaseDomain } from 'core/domain/common'
export class ShippingRates extends BaseDomain {

 /**
  * ShippingRegion identifier
  *
  * @type {number}
  * @memberof ShippingRates
  */
 public shippingId?: number | null

  /**
   * The text of shippingRegion
   *
   * @type {string}
   * @memberof ShippingRates
   */
  public shippingType?: string

  /**
   * ShippingRegion identifier
   *
   * @type {number}
   * @memberof ShippingRates
   */
  public shippingRegionId?: number | null

    /**
     * ShippingRegion identifier
     *
     * @type {number}
     * @memberof ShippingRates
     */
  public shippingCost?: number | null
    
}
