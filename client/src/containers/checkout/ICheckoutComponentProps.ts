export interface ICheckoutComponentProps {

  /**
   * Styles
   */
  classes?: any

  /**
   * Steps
   */
  steps?: any
  /**
   * label
   */
  label?: any

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {boolean}
   * @memberof IHomeComponentProps
   */
  authed?: boolean

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {number}
   * @memberof ICkeckoutComponentProps
   */
  activeStep?: number

  /**
   * Redirect to [url]
   *
   * @memberof IHomeComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Product object
   */
  mergedShippingAddress: Map<string, any>

  /**
   * Merged all shipping rates to show
   *
   * @type {{[tnasId: string]: TnAs}}
   * @memberof IStreamComponentProps
   */
  mergedShippingRates: Map<string, any>

}
