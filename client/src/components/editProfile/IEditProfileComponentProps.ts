import { Profile } from 'core/domain/users'
import { ShippingAddress } from 'core/domain/shippings'

export interface IEditProfileComponentProps {

  /**
   * User profile
   *
   * @type {Profile}
   * @memberof IEditProfileComponentProps
   */
  info?: Profile

  /**
   * User profile banner addresss
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  banner: string

  /**
   * User avatar address
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  avatar: string

  /**
   * User full name
   *
   * @type {string}
   * @memberof IEditProfileComponentProps
   */
  fullName: string

  address?: string

  city?: string
  
  state?: string
  
  zip?: string
  
  region?: string

  addressInputError?: string

  cityInputError?: string

  stateInputError?: string

  zipInputError?: string

  regionSelectError?: string

  /**
   * Edit profile dialog is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IEditProfileComponentProps
   */
  open?: boolean

  /**
   * Update user profile
   *
   * @memberof IEditProfileComponentProps
   */
  update?: (shippingAddress: ShippingAddress) => any

  /**
   * On edit profile dialog close event
   *
   * @memberof IEditProfileComponentProps
   */
  onRequestClose?: () => void

  /**
   * Styles
   */
  classes?: any

  /**
   * Translate to locale string
   */
  translate?: (state: any) => any

  /**
   * Current locale language
   */
  currentLanguage?: string

  allShippingRegions?: any
  /**
   * Users of current circle
   */
  shippingRegions?: Map<string, any>

  /**
   * Current user is authenticated {true} or not {false}
   *
   * @type {number}
   * @memberof IEditProfileComponentProps
   */
  activeStep?: number

  /**
   * logged in user
   */
  uid?: any

  /**
   * Shipping Address object
   */
  shippingAddress?: any
}
