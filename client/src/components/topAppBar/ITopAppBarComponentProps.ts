export interface ITopAppBarComponentProps {
  /**
   * Styles
   */
  classes?: any
  /**
   * position of app bar
   */
  position?: string
  /**
   * Number of cart items
   *
   * @memberof IAppBarComponentProps
   */
  cartItemsCount?: number

  /**
   * Number of cart items
   *
   * @memberof IAppBarComponentProps
   */
  notifyCount?: number

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  /**
   * Theme
   */
  theme?: any

  /**
   * Redirect to {url} route
   *
   * @memberof IAppBarComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Logout user
   *
   * @memberof IAppBarComponentProps
   */
  logout?: () => void

  openEditor?: () => any

  editProfileOpen?: boolean

  authed?: boolean

  clearData?: Function

  clearActiveState?: Function

  clearCart?: Function
}
