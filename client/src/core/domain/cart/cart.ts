import { BaseDomain } from 'core/domain/common'
export class Cart extends BaseDomain {

  /**
   * Cart identifier
   */
  public cartId?: string | null

   /**
    * Cart product id
    */
  public productId?: number | null

    /**
     * Cart product color
     */
  public productColor?: string | null

     /**
      * Cart product Quentity
      */
  public productQuantity?: number | null

  /**
   * Cart product Quentity
   */
  public quantity?: number | null

  /**
   * Cart product Size
   */
  public productSize?: string | null

  /**
   * Cart product
   */
  public cartProduct?: any
  /**
   * Product image
   */
  public productThumbnail?: any

  /**
   * Product name
   */
  public productName?: string | null
  /**
   * Product price
   */
  public productPrice?: number | null

  /**
   * Cart Product attributes
   */
  public attributes?: string | null

  /**
   * Cart Product attributes
   */
  public itemId?: number | null

  /**
   * Cart push attributes
   */
  public push?: any | null

}
