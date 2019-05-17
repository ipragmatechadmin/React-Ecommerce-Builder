export interface IFinishComponentProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * Redirect to {url} route
   *
   * @memberof IProductComponentProps
   */
  goTo?: (url: string) => any

  /**
   * On edit profile dialog close event
   *
   * @memberof IReviewComponentProps
   */
  update?: (value: number) => void

}
