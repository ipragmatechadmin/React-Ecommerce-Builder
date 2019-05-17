export interface IProductHeroComponentProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * background image properties
   */
  backgroundImage?: string

  /**
   * Redirect to {url} route
   *
   * @memberof IProductHeroComponentProps
   */
  goTo?: (url: string) => any

}
