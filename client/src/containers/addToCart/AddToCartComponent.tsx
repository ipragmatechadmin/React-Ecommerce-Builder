// - Import react components
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Popover from '@material-ui/core/Popover'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import RemoveIcon from '@material-ui/icons/Remove'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

import { Cart } from 'core/domain/cart'
import * as addToCartActions from 'store/actions/addToCartActions'

import { IAddToCartComponentProps } from './IAddToCartComponentProps'
import { IAddToCartComponentState } from './IAddToCartComponentState'

const styles = (theme: any) => ({
  paper: {
    top: '50px !important',
    left: '650px !important'
  },
  itemcell: {
    minWidth: 158,
    fontSize: 12
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${60}px`,
    boxShadow: 'none'
  },
  dialogShoppingButton : {
    backgroundColor: '#ffffff',
    color: '#f62f5e'
  },
  bootstrapInput: {
    borderRadius: 10,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 12,
    width: '20px',
    padding: '5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
  },
  noNotify: {
    color: '#2e2e2e',
    fontFamily: '"Montserrat", sans-serif',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
    top: 60,
    left: 130,
    width: '100%'
  },
  borderbottom: {
    borderBottom: 'none'
  },
  fab: {
    background: 'transparent',
    boxShadow: 'none',
    color: '#f62f5e',
    textTransform: 'capitalize',
    '&:active, &:hover': {
      color: '#ffffff'
    },
  },
  quentityButton: {
    margin: '5px',
    width: '30px',
    height: '30px',
    minHeight: '30px',
    boxShadow: 'none',
    backgroundColor: '#efefef',
    color: '#2e2e2e'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  table: {
    minWidth: '700px',
    minHeight: 400,
  },
  buttonWrapper : {
    padding: 0
  },
  overflowHidden: {
    overflow: 'hidden'
  },
  popperClose: {
    pointerEvents: 'none'
  },
  popperOpen: {
    zIndex: 1,
    maxWidth: 500,
    overflowY: 'auto'
  },
  popper: {
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  },
  paperbuttons: {
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${24}px ${48}px`,
    },
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: 0,
    color: '#6c6c6c',
    fontSize: 26
  },
  formTitle: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 16,
    color: '#2e2e2e',
    lineHeight: '150%',
    textTransform: 'capitalize',
    margin: 10
  },
  tablerow: {
    verticalAlign: 'text-top'
  }
})

/**
 * Create component class
 */
export class AddToCartComponent extends Component<IAddToCartComponentProps,IAddToCartComponentState> {

  static propTypes = {
    /**
     * It will be true if the notification is open
     */
    open: PropTypes.bool,
    /**
     * Pass anchor element
     */
    anchorEl: PropTypes.any,
    /**
     * Fire to close notificaion
     */
    onRequestClose: PropTypes.func,
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IAddToCartComponentProps) {
    super(props)

        // Defaul state
    this.state = {
      quantity: 1,
      show: true,
      max: 5,
      min: 0
    }

    // Binding functions to `this`
    this.cartList = this.cartList.bind(this)
    this.incrementItem = this.incrementItem.bind(this)
    this.decreaseItem = this.decreaseItem.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.toggleClick = this.toggleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  incrementItem = (value: any , key: any) => {
      this.setState(prevState => {
        if (prevState.quantity < 9 ) {
          return {
            quantity: prevState.quantity + 1
          }
        } else {
          return null
        }
      })

      this.props.updateToCart!(value.get('itemId'), key,{
        productThumbnail: value.get('productThumbnail'),
        productName: value.get('productName'),
        productPrice: value.get('productPrice'),
        productId: value.get('productId'),
        productColor: value.get('productColor'),
        productQuantity: value.get('productQuantity') + 1,
        productSize: value.get('productSize')
      })
  }

  decreaseItem = (value: any , key: any) => {
    this.setState(prevState => {
      if (prevState.quantity > 0) {
        return {
          quantity: prevState.quantity - 1
        }
      } else {
        return null
      }
    })

    this.props.updateToCart!(value.get('itemId'), key, {
      productThumbnail: value.get('productThumbnail'),
      productName: value.get('productName'),
      productPrice: value.get('productPrice'),
      productId: value.get('productId'),
      productColor: value.get('productColor'),
      productQuantity: value.get('productQuantity') - 1 ,
      productSize: value.get('productSize')
    })
  }
  /**
   * Handle Remove cart
   */
  handleRemove = (value: any , key: any) => {
    this.props.updateToCart!(value.get('itemId'), key, {
      productThumbnail: value.get('productThumbnail'),
      productName: value.get('productName'),
      productPrice: value.get('productPrice'),
      productId: value.get('productId'),
      productColor: value.get('productColor'),
      productQuantity: 0 ,
      productSize: value.get('productSize')
    })
  }

  /**
   * Handle Dialog close
   */
  handleShopping = () => {
    this.setState({
    })
  }

  /**
   * Handle Dialog close
   */
  handleClose = () => {
    this.setState({
        closecart: false
    })
    console.log('value of close', this.state.closecart)
  }

  /**
   * Handle Dialog close
   */
  handleCheckout = () => {

  }
  handleChange = (event: any) => {
    this.setState({quantity: event.target.value})
  }
  toggleClick = () => {
    this.setState({
      show: !this.state.show
    })
  }

  cartList = () => {
    const {classes} = this.props
    const allCartProducts = this.props.cartProducts
    const cartProductsList: any[] = []
    if (allCartProducts) {
      allCartProducts.forEach((cartProduct: any, cartkey: string) => {
        cartProduct.forEach((value: any, key: string) => {
          cartProductsList.push(
              <TableRow key={key} className={classes.tablerow}>
                <TableCell scope='row' className={classNames(classes.itemcell, classes.borderbottom)}>
                  <Grid container direction='row' spacing={2}>
                    <Grid item xs>
                      <img
                        alt='productname'
                        src={`/images/${value.get('productThumbnail')}`}
                      />
                    </Grid>
                    <Grid item xs>
                      <Typography  gutterBottom>
                        {value.get('productName')}
                      </Typography>
                      <Typography  gutterBottom>
                        Men BK3569
                      </Typography>
                        <Fab variant='extended' size='small' disableFocusRipple disableRipple aria-label='Remove' color='secondary' className={classes.fab} onClick={() => this.handleRemove(value, cartkey)}>
                          <CloseIcon className={classes.extendedIcon} />
                            Remove
                        </Fab>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell align='center' className={classes.borderbottom}>{value.get('productSize')}</TableCell>
                <TableCell align='right' className={classNames(classes.borderbottom, classes.buttonWrapper)}>
                  <Fab color='secondary' className={classes.quentityButton} size='small' aria-label='Add' onClick={() => this.incrementItem(value, cartkey)}>
                    <AddIcon />
                  </Fab>
                  <InputBase
                  id='bootstrap-input'
                  value={value.get('productQuantity')}
                  onChange={this.handleChange}
                  classes={{
                    input: classes.bootstrapInput,
                  }}
                  />
                  <Fab color='secondary' aria-label='Add' className={classes.quentityButton} size='small' onClick={() => this.decreaseItem(value, cartkey)}>
                    <RemoveIcon />
                  </Fab>
                </TableCell>
                <TableCell align='left' className={classes.borderbottom}>£{value.get('productPrice')}</TableCell>
              </TableRow>
            )
          })
      })
    }
    return cartProductsList
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const { classes, open, anchorEl, onRequestClose, goTo} = this.props
    const noCartItem = (
    <div className={classes.noNotify}>
     No items in the cart, Go and have some Products! </div>
     )
     const items = this.cartList()

    return (
      <React.Fragment>
      <Popover
        open={this.state.closecart ? this.state.closecart : open}
        anchorEl={anchorEl}
        onClose={onRequestClose}
        classes={{
          paper: classes.root
        }}
        PaperProps={{ className: classNames(classes.paper) }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >

      <Paper className={classNames(classes.root, { [classes.overflowHidden]: !open })} elevation={4} >
        <IconButton aria-label='Close' className={classes.closeButton} onClick={this.handleClose} >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs>
            <Table className={classes.table}>
              <TableHead className={classes.head}>
              <TableRow><Typography gutterBottom  align='left' className={classes.formTitle}>{items.length} Items In Your Cart</Typography></TableRow>
                <TableRow>
                  <TableCell className={classes.head}>Item</TableCell>
                  <TableCell className={classes.head}>Size</TableCell>
                  <TableCell align='right' className={classes.head}>Quanity</TableCell>
                  <TableCell align='right' className={classes.head}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                 {items.length > 0 ? this.cartList() : noCartItem}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paperbuttons}>
        <React.Fragment>
          <Grid container spacing={8}>
              <Grid item container xs={12} sm={6} direction='row' justify='flex-start' alignItems='center'>
                <Button
                onClick={evt => {
                  evt.preventDefault()
                  this.setState({
                      closecart: true
                  })
                    goTo!(`/products`)
                }}
                className={classNames(classes.dialogShoppingButton, classes.button)}
                variant='contained'
                >
                  Back to shop
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} container direction='row' justify='flex-end' alignItems='center' >
               {items.length > 0 ? (
                <Button
                  variant='contained'
                  color='secondary'
                  onClick={evt => {
                    evt.preventDefault()
                      goTo!(`/checkout`)
                  }}
                  className={classes.button}
                  >
                   Checkout
                </Button>) : ''}
              </Grid>
          </Grid>
        </React.Fragment>
      </Paper>
      </Popover>
  </React.Fragment>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: IAddToCartComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    updateToCart: (itemId: string, cartId: string, cart: Cart) => {
      dispatch(addToCartActions.dbUpdateCartItem(itemId,cartId,cart))
    }
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IAddToCartComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  const cartProducts = state.getIn(['addToCart', 'cartProducts'])
  return {
    uid,
    cartProducts

  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(AddToCartComponent as any) as any)) as typeof AddToCartComponent
