export interface ITopAppBarComponentState {
  /**
   * Cart is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof ITopAppBarComponentState
   */
  openCart?: boolean

  /**
   * This is the DOM element that will be used to set the position of the popover.
   *
   * @type {*}
   * @memberof ITopAppBarComponentState
   */
  anchorEl?: HTMLElement | null

  /**
   * Popover menu on avatar is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof IAppBarComponentState
   */
  openAvatarMenu: boolean

  /**
   * Side menu on Drawer is open {true} or not {false}
   *
   * @type {boolean}
   * @memberof ITopAppBarComponentState
   */
  mobileOpen: boolean
}
