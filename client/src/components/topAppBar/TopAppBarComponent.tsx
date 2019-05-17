// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import Menu from '@material-ui/core/Menu'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import React, { Component } from 'react'
import SvgAccountCircle from '@material-ui/icons/AccountCircle'
import SvgShoppingBasket from '@material-ui/icons/ShoppingBasketOutlined'
import Tooltip from '@material-ui/core/Tooltip'

import { authorizeActions } from 'store/actions'
import { globalActions } from 'src/store/actions'
import AddToCart from 'containers/addToCart'
import AppBar from 'src/components/appBar'
import EditProfile from 'src/components/editProfile'
import Toolbar from 'src/components/toolbar'
import * as addToCartActions from 'store/actions/addToCartActions'
import * as checkoutActions from 'store/actions/checkoutActions'
import clsx from 'clsx'
import * as userActions from 'store/actions/userActions'

import { ITopAppBarComponentProps } from './ITopAppBarComponentProps'
import { ITopAppBarComponentState } from './ITopAppBarComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  title: {
    fontSize: 26,
    color: '#F62F5E'
  },
  placeholder: {
    height: 70,
    backgroundColor: '#ffffff',
    [theme.breakpoints.up('sm')]: {
      height: 80
    }
  },
  toolbar: {
    justifyContent: 'flex-start'
  },
  left: {
    flex: 1
  },
  leftLinkActive: {
    color: theme.palette.common.white
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  rightLink: {
    fontSize: 17,
    color: theme.palette.common.black,
    marginLeft: theme.spacing(10),
    textTransform: 'capitalize',
    '&:hover': {
      cursor: 'pointer',
      color: '#F62F5E',
      textDecoration: 'none'
    }
  },
  linkSecondary: {
    color: theme.palette.secondary.main
  },
  cartIcon: {
    position: 'relative',
    left: 32,
    top: -5
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: 260,
    boxShadow:
    '0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
   transition: 'all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
 },
 appResponsive: {
    margin: '20px 10px'
  },
  drawerLink: {
    width: '100%',
    float: 'left',
    position: 'relative',
    display: 'block',
    fontSize: 17,
    color: theme.palette.common.black,
    padding: 15,
    textTransform: 'capitalize',
    '&:hover': {
      cursor: 'pointer',
      color: '#F62F5E',
      textDecoration: 'none'
    },
    '&:after': {
    width: '100%',
    content: '""',
    display: 'block',
    height: '1px',
    backgroundColor: '#e5e5e5',
    }
  }
})

/**
 * Create component class
 */
export class TopAppBarComponent extends Component<
  ITopAppBarComponentProps,
  ITopAppBarComponentState
> {
  static propTypes = {
    /**
     * List of users
     */
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ITopAppBarComponentProps) {
    super(props)

    // Defaul state
    this.state = {
      /**
       * If true Cart will be open
       */
      openCart: false,
      /**
       * User avatar popover is open if true
       */
      openAvatarMenu: false,

      /**
       * drawer menu is open if true
       */
      mobileOpen: false
    }

    // Binding functions to `this`
    this.handleCloseCart = this.handleCloseCart.bind(this)
    this.handleCartTouchTap = this.handleCartTouchTap.bind(this)
    this.handleSearchTouchTap = this.handleSearchTouchTap.bind(this)
    this.handleAvatarTouchTap = this.handleAvatarTouchTap.bind(this)
    this.handleMyAccountTouchTap = this.handleMyAccountTouchTap.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }

  /**
   * Handle touch on user avatar for popover
   *
   */
  handleAvatarTouchTap = (event: any) => {
    event.preventDefault()
    if (this.props.authed) {
      this.setState({
        openAvatarMenu: true,
        anchorEl: event.currentTarget
      })
    } else {
      this.props.goTo!(`/login`)
    }

  }

  /**
   * Handle logout user
   *
   */
  handleLogout = () => {
    this.props.logout!()
    this.setState({
      openAvatarMenu: false,
      anchorEl: null
    })
    this.props.clearData!()
    this.props.clearActiveState!()
    this.props.clearCart!()
  }

  /**
   * Handle close popover
   *
   */
  handleRequestClose = () => {
    this.setState({
      openAvatarMenu: false,
      anchorEl: null
    })
  }

  /**
   * Handle Drawer popover
   *
   */
  handleDrawerToggle = () => {
      this.setState({ mobileOpen: !this.state.mobileOpen })
  }
  /**
   * Handle cart touch
   *
   */
  handleCartTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      openCart: true,
      anchorEl: event.currentTarget
    })
  }

  /**
   * Handle my account touch
   *
   */
  handleMyAccountTouchTap = (event: any) => {
    // This prevents ghost click.
    event.preventDefault()
    this.setState({
      openAvatarMenu: false,
      anchorEl: null
    })
    this.props.openEditor!()
  }

  /**
   * Handle search touch
   *
   */
  handleSearchTouchTap = (event: any) => {}
  /**
   * Handle close notification menu
   *
   */
  handleCloseCart = () => {
    this.setState({
      openCart: false
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const {
      classes,
      translate,
      goTo,
      editProfileOpen,
    } = this.props

    return (
      <div>
        <AppBar>
          <Toolbar className={classes.toolbar}>
            <div className={classes.left}>
              <Link
                variant='h6'
                underline='none'
                className={classes.title}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/`)
                }}
              >
                {'shopmate'}
              </Link>
            </div>
          <Hidden mdDown implementation='css'>
            <div className={classes.center}>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                className={classes.rightLink}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/productsbycat1/1`)
                }}
              >
                {'French'}
              </Link>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                className={classes.rightLink}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/productsbycat2/2`)
                }}
              >
                {'Italian'}
              </Link>
              <Link
                color='inherit'
                variant='h6'
                underline='none'
                className={classes.rightLink}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/productsbycat3/4`)
                }}
              >
                {'Animal'}
              </Link>
              <Link
                variant='h6'
                underline='none'
                className={clsx(classes.rightLink)}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/productsbycat4/5`)
                }}
              >
                {'Flower'}
              </Link>
              <Link
                variant='h6'
                underline='none'
                className={clsx(classes.rightLink)}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/productsbycat5/6`)
                }}
              >
                {'Christmas'}
              </Link>
              <Link
                variant='h6'
                underline='none'
                className={clsx(classes.rightLink)}
                onClick={(evt: any) => {
                  evt.preventDefault()
                  goTo!(`/products`)
                }}
              >
                {'Products'}
              </Link>
            </div>
          </Hidden>
          <div className={classes.right}>
                  {this.props.cartItemsCount! > 0 ? (
                    <Tooltip title={translate!('header.cartTooltip')}>
                      <IconButton
                        disableRipple
                        onClick={this.handleCartTouchTap}
                      >
                        <Badge
                          color='secondary'
                          badgeContent={this.props.cartItemsCount}
                          invisible={true}
                          className={classes.margin}
                        >
                          <SvgShoppingBasket color='primary' />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title={translate!('header.cartTooltip')}>
                      <IconButton
                        disableRipple
                        onClick={this.handleCartTouchTap}
                      >
                        <SvgShoppingBasket />
                      </IconButton>
                    </Tooltip>
                  )}
                  <IconButton disableRipple onClick={this.handleAvatarTouchTap}>
                    <SvgAccountCircle />
                  </IconButton>

                    <Menu
                      open={this.state.openAvatarMenu}
                      anchorEl={this.state.anchorEl!}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      onClose={this.handleRequestClose}
                    >
                      <MenuItem
                        id={'MyAccount'}
                        style={{ backgroundColor: 'white', fontSize: '14px' }}
                        onClick={this.handleMyAccountTouchTap}
                      >
                        {' '}
                        {translate!('header.myAccount')}{' '}
                      </MenuItem>
                      <MenuItem
                        id={'logout'}
                        style={{ fontSize: '14px' }}
                        onClick={this.handleLogout.bind(this)}
                      >
                        {' '}
                        {translate!('header.logout')}{' '}
                      </MenuItem>
                    </Menu>

                  {editProfileOpen ? (
                    <EditProfile
                      avatar={
                        'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57'
                      }
                      banner={
                        'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57'
                      }
                      fullName={'this.props.fullName'}
                    />
                  ) : (
                    ''
                  )}
                  <AddToCart
                    open={this.state.openCart ? true : false}
                    anchorEl={this.state.anchorEl}
                    onRequestClose={this.handleCloseCart}
                  />
                <Hidden lgUp>
                  <IconButton
                    color='secondary'
                    aria-label='open drawer'
                    onClick={this.handleDrawerToggle}
                  >
                    <MenuIcon />
                  </IconButton>
                </Hidden>
            </div>
          </Toolbar>
          <Hidden lgUp implementation='css'>
            <Drawer
              variant='temporary'
              anchor={'right'}
              open={this.state.mobileOpen}
              classes={{
                paper: classes.drawerPaper
              }}
              onClose={this.handleDrawerToggle}
            >
              <div className={classes.appResponsive}>
                  <Link
                    color='inherit'
                    variant='h6'
                    underline='none'
                    className={classes.drawerLink}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/productsbycat1/1`)
                    }}
                  >
                    {'French'}
                  </Link>
                  <Link
                    color='inherit'
                    variant='h6'
                    underline='none'
                    className={classes.drawerLink}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/productsbycat2/2`)
                    }}
                  >
                    {'Italian'}
                  </Link>
                  <Link
                    color='inherit'
                    variant='h6'
                    underline='none'
                    className={classes.drawerLink}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/productsbycat3/4`)
                    }}
                  >
                    {'Animal'}
                  </Link>
                  <Link
                    variant='h6'
                    underline='none'
                    className={clsx(classes.drawerLink)}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/productsbycat4/5`)
                    }}
                  >
                    {'Flower'}
                  </Link>
                  <Link
                    variant='h6'
                    underline='none'
                    className={clsx(classes.drawerLink)}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/productsbycat5/6`)
                    }}
                  >
                    {'Christmas'}
                  </Link>
                  <Link
                    variant='h6'
                    underline='none'
                    className={clsx(classes.drawerLink)}
                    onClick={(evt: any) => {
                      evt.preventDefault()
                      goTo!(`/products`)
                    }}
                  >
                    {'Products'}
                  </Link>
              </div>
            </Drawer>
          </Hidden>
        </AppBar>
      </div>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (
  dispatch: Function,
  ownProps: ITopAppBarComponentProps
) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    logout: () => dispatch(authorizeActions.dbLogout()),
    openEditor: () => dispatch(userActions.openEditProfile()),
    clearData: () => {
      dispatch(globalActions.clearTemp())
    },
    clearActiveState: () => dispatch(checkoutActions.setActiveStep(0)),
    clearCart: () => dispatch(addToCartActions.clearCart())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (
  state: Map<string, any>,
  ownProps: ITopAppBarComponentProps
) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  // const userCartItems: Map<string, any> = state.getIn([
  //   'addToCart',
  //   'cartProducts'
  // ])
  var cartItemsCount
  let userCartItems: Map<string, Map<string, any>> = state.getIn([
    'addToCart',
    'cartProducts'
  ])
  userCartItems.forEach((userCartItem: Map<string, any>) => {
    cartItemsCount = userCartItem.count()
  })
  const editProfileOpen = state.getIn(['user', 'openEditProfile'])
  const authed = state.getIn(['authorize', 'authed'])
  return {
    uid,
    cartItemsCount,
    translate: getTranslate(state.get('locale')),
    editProfileOpen,
    authed
  }
}

export default withRouter<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles as any, { withTheme: true })(
    TopAppBarComponent as any
  ) as any)
) as typeof TopAppBarComponent
