export interface IAppFooterComponentProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * Redirect to {url} route
   *
   * @memberof IAppFooterComponentProps
   */
  goTo?: (url: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

}
