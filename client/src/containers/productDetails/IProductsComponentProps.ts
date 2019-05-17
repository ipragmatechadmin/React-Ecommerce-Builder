import { Product } from 'src/core/domain/products'
import { Cart } from 'src/core/domain/cart'
import {Map} from 'immutable'
export interface ILoginComponentProps {

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
  mergedProducts: Map<string, Map<string, any>>

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
   * Product object
   */
  mergedProductDetail: Map<string, any>

  /**
   * Post object
   */
  addToCart?: (cart: Cart) => any

}
