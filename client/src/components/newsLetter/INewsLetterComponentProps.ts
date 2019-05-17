export interface INewsLetterComponentProps {
  /**
   * Styles
   */
  classes?: any

  /**
   * Children of the class
   */
  children?: any

  /**
   * Display error
   *
   * @memberof INewsLetterComponentState
   */
  showError?: (message: string) => any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any
}
