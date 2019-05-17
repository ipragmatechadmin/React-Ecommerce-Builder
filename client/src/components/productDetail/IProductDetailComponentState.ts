
export interface IProductDetailComponentState {
    [key: string]: any

    /**
     * Email input value
     */
    emailInput: string

    /**
     * Email input error text
     */
    emailInputError: string

    /**
     * Password input value
     */
    passwordInput: string

    /**
     * Password input error text
     */
    passwordInputError: string

    /**
     * Confirm input error text
     */
    confirmInputError: string

    /**
     * cart id of the product
     */
    cartId?: string

    /**
     * product id of the product
     */
    productId?: any

    /**
     * Confirm input error text
     */
    productColor?: string

    /**
     * Product Quentity
     */
    productQuentity?: number

    /**
     * Product Size
     */
    productSize?: string

    /**
     * Product Size
     */
    productThumbnail?: any

    /**
     * Close notification
     */
    onRequestClose?: () => void

    /**
     * User cart popover is opem {true} or not {false}
     */
    open?: boolean

    /**
     * Keep element
     */
    anchorEl?: any

}
