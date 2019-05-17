import { BaseDomain } from 'core/domain/common'
export class ShippingRegion extends BaseDomain {

    /**
     * ShippingRegion identifier
     *
     * @type {number}
     * @memberof ShippingRegion
     */
  public shippingRegionId?: number | null

    /**
     * The text of shippingRegion
     *
     * @type {string}
     * @memberof ShippingRegion
     */
  public shippingRegion?: string

}
