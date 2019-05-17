export interface IFormButtonComponentProps {

  /**
   * Disable
   *
   * @type {string}
   * @memberof IFormButtonComponentProps
   */
  disabled?: boolean

  /**
   * mounted
   *
   * @type {{}}
   * @memberof IFormButtonComponentProps
   */
  mounted?: boolean

  /**
   * Styles
   */
  classes?: any

  /**
   * ClassName
   */
  className?: string

  /**
   * onClick function
   */
  onClick?: () => void

  /**
   * align
   */
  align?: string

  color?: 'default' | 'inherit' | 'primary' | 'secondary' | undefined

  size?: 'small' | 'medium' | 'large' | undefined

  children?: any

}
