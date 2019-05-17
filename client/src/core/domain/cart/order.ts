import { BaseDomain } from 'core/domain/common'
export class Order extends BaseDomain {
  /**
   * Cart identifier
   */
  public cartId?: string | null

  /**
   * shipping identifier
   */
  public shippingId?: number | null

  /**
   *
   */
  public customerId?: number | null

  /**
   * Cart identifier
   */
  public taxId?: number | null

  /**
   * status of order
   */
  public status?: number | null

  public comments?: string | null

  public authcode?: string | null

  public reference?: any | null
}
