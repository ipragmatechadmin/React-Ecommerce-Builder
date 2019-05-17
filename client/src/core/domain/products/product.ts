import { BaseDomain } from 'core/domain/common'
export class Product extends BaseDomain {

    /**
     * Product identifier
     *
     * @type {number}
     * @memberof Product
     */
  public productId?: number | null

    /**
     * The identifier of product type
     *
     * @type {number}
     * @memberof Product
     */
  public productTypeId?: number

    /**
     * The product creation date
     *
     * @type {number}
     * @memberof Product
     */
  public creationDate?: number

    /**
     * The product delete date
     *
     * @type {number}
     * @memberof Product
     */
  public deleteDate?: number

    /**
     * The score of product
     *
     * @type {number}
     * @memberof Product
     */
  public score?: number

  /**
   * List of voter identifier
   *
   * @type {{[voterId: string]: boolean}}
   * @memberof Product
   */
  votes?: {[voterId: string]: boolean}

    /**
     * Product view count
     *
     * @type {number}
     * @memberof Product
     */
  public viewCount?: number

    /**
     * The text of product
     *
     * @type {string}
     * @memberof Product
     */
  public body?: string

    /**
     * The identifier of product owner
     *
     * @type {string}
     * @memberof Product
     */
  public ownerUserId?: string

    /**
     * Full name of product owner
     *
     * @type {string}
     * @memberof Product
     */
  public ownerDisplayName?: string

    /**
     * Avatar address of product owner
     *
     * @type {string}
     * @memberof Product
     */
  public ownerAvatar?: string

    /**
     * Last product edit date
     *
     * @type {number}
     * @memberof Product
     */
  public lastEditDate?: number

    /**
     * Product tags
     *
     * @type {string[]}
     * @memberof Product
     */
  public tags?: string[]

    /**
     * Numeber of comment on the product
     *
     * @type {number}
     * @memberof Product
     */
  public commentCounter?: number

    /**
     * The address of image on the product
     *
     * @type {string}
     * @memberof Product
     */
  public image?: string

    /**
     * Product image full path
     *
     * @type {string}
     * @memberof Product
     */
  public imageFullPath?: string

    /**
     * The adress of video on the product
     *
     * @type {string}
     * @memberof Product
     */
  public video?: string

    /**
     * If writing comment is disabled {true} or not {false}
     *
     * @type {Boolean}
     * @memberof Product
     */
  public disableComments?: boolean

    /**
     * If sharing product is disabled {true} or not {false}
     *
     * @type {Boolean}
     * @memberof Product
     */
  public disableSharing?: boolean

    /**
     * If the product is deleted {true} or not false
     *
     * @type {Boolean}
     * @memberof Product
     */
  public deleted?: boolean

}
