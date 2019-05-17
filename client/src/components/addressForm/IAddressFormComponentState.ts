
export interface IAddressFormComponentState {
  /**
   * region id
   */
  region?: number

  /**
   * open or close selectbox
   */
  open?: boolean

  /**
   * First name of shipping address
   */
  firstName?: string

  /**
   * First name input error of shipping address
   */
  firstNameInputError?: string

  /**
   * Last name of shipping address
   */
  lastName?: string

  /**
   * Last name of shipping address
   */
  lastNameInputError?: string

  /**
   * Shipping address
   */
  address?: string

  /**
   * Shipping address
   */
  addressInputError?: string

  /**
   * City of shipping
   */
  city?: string

  /**
   * City of shipping
   */
  cityInputError?: string

  /**
   * State of shipping
   */
  state?: string

  /**
   * State of shipping
   */
  stateInputError?: string

  /**
   * Zip of shipping
   */
  zip?: string

  /**
   * Zip of shipping
   */
  zipInputError?: string

  /**
   * Region select of shipping
   */
  regionSelectError?: string

  /**
   * Shipping Type of shipping
   */
  shippingTypeError?: string

  /**
   * billing address is same as shipping address
   */
  saveAddress?: boolean

  /**
   * Active step of checkout process
   */
  activeStep?: number

  /**
   * shipping region id
   */
  shippingRegionId?: number

  /**
   * value of shipping type
   */
  value?: string

  /**
   * type of shipping
   */
  shippingType?: string

  /**
   * cost of shipping
   */
  shippingCost?: number

  /**
   * shipping identifier
   */
  shippingId?: number

}
