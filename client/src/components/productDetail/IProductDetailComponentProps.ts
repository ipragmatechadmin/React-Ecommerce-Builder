import { Product } from 'src/core/domain/products'
import { Cart } from 'src/core/domain/cart'
import {Map} from 'immutable'
export interface IProductDetailComponentProps {

 /**
  * Login a user
  *
  * @memberof ILoginComponentProps
  */
  login?: (email: string , password: string) => any

  /**
   * Redirect to signup page
   *
   * @memberof ILoginComponentProps
   */
  signupPage?: () => any

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any, param?: {}) => any

  /**
   * Load user data into store
   *
   * @type {Function}
   * @memberof IMasterProps
   */
  loadData?: Function

  /**
   * Merged all users products to show in stream
   *
   * @type {{[tnasId: string]: TnAs}}
   * @memberof IProductComponentProps
   */
  mergedProducts?: Map<string, Map<string, any>>

  /**
   * Merged all users products arrtibutes to show
   *
   * @type {{[tnasId: string]: TnAs}}
   * @memberof IProductComponentProps
   */
  mergedProductsAttributes: Map<string, Map<string, any>>

  /**
   * Router match property
   */
  match?: any
  /**
   * Post object
   */
  post?: Map<string, any>

  /**
   * Product object
   */
  product: Map<string, any>

  /**
   * Post object
   */
  addToCart?: (cardId: string, cart: Cart) => any

  /**
   * Redirect to {url} route
   *
   * @memberof IProductDetailComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Product object
   */
  cart?: Map<string, any>

  /* Current user is authenticated {true} or not {false}
  *
  * @type {boolean}
  * @memberof IHomeComponentProps
  */
 authed?: boolean

}
