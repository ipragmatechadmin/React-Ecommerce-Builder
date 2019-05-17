import { Product } from 'src/core/domain/products'
import {Map} from 'immutable'
export interface IProductsComponentProps {

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
   * Merged all users tnas to show in stream
   *
   * @type {{[tnasId: string]: TnAs}}
   * @memberof IStreamComponentProps
   */
  mergedProducts: Map<string, Map<string, any>>

  mergedProductsBySearchText: Map<string, Map<string, any>>

  /**
   * Router match property
   */
  match?: any

  /**
   * Load the data for stream Products
   */
  loadProductsStream?: (page: number, limit: number) => any,

  /**
   * Load the Products from search text
   */
  loadProductsSearch?: (page: number, limit: number, searchText: string) => any,

  productsPageCount: number,

  clearSearchList: () => any

  openEditor: () => any

  editProfileOpen?: boolean

  /**
   * Rediret to another route
   *
   * @memberof IProductsComponentProps
   */
  goTo?: (url: string) => any
}
