// - Import react components
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import React, { Component } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

import { Order } from 'core/domain/cart'
import * as addToCartActions from 'store/actions/addToCartActions'
import * as checkoutActions from 'store/actions/checkoutActions'

import { IReviewComponentProps } from './IReviewComponentProps'
import { IReviewComponentState } from './IReviewComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing(2),
  },
  subtitle: {
    fontSize: 12,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#b4b4b4',
    textTransform: 'capitalize',
    fontWeight: 700
  },
  subheading: {
    fontSize: 12,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'capitalize',
    fontWeight: 700
  },
  subcontent: {
    fontSize: 12,
    fontFamily: 'sans-serif',
    lineHeight: '200%',
    color: '#6c6c6c'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f7f7'
    },
  },
  itemcell: {
    minWidth: 158,
    fontSize: 12
  },
  borderbottom: {
    borderBottom: 'none'
  },
  itemred: {
    color: '#f62f5e'
  },
  chip: {
    margin: theme.spacing.unit,
  },
  head: {
    fontSize: 12,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#b4b4b4',
    textTransform: 'capitalize'
  },
  table: {
    fontSize: 12,
  },
  iconButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: '1.5rem',
    color: '#000'
  },
  subtotaltitlemargin: {
    marginRight: '1.5rem'
  },
  subtotalcontentmargin: {
    marginRight: '2.9rem'
  },
  shippingtitlemargin: {
    marginRight: '0.5rem'
  },
  shippingcontentmargin: {
    marginRight: '2.8rem'
  },
  grandtotalcontentmargin: {
    marginRight: '2.4rem',
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e'
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${60}px`,
    boxShadow: 'none'
  },
  backbutton: {
    backgroundColor: '#ffffff',
    color: '#f62f5e'
  },
  paperbuttons: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${24}px ${48}px`,
    },
    position: 'relative',
    width: '116%',
    bottom: -72,
    left: -48
  },
})

/**
 * Create component class
 */
export class ReviewComponent extends Component<IReviewComponentProps,IReviewComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IReviewComponentProps) {
    super(props)

        // Defaul state
    this.state = {
      subtotalofcart: 0,
      grandtotalofcart: 0
    }

    // Binding functions to `this`
    this.handleBack = this.handleBack.bind(this)
    this.handleNext = this.handleNext.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onError = this.onError.bind(this)
    this.settotals = this.settotals.bind(this)
    this.setgrandtotal = this.setgrandtotal.bind(this)
    this.reviewproductsList = this.reviewproductsList.bind(this)
  }
  /**
   * Handle backbutton step on change
   */
  handleBack = () => {
    this.props.update!(0)
  }
  /**
   * Handle backbutton step on change
   */
  handleNext = () => {
    this.props.update!(2)
  }

  reviewproductsList = () => {
      const {classes,shippingAddress } = this.props
      const getCartProducts = this.props.getCart
      var subtotal = 0
      var grandtotal = 0
      const cartProductsList: any[] = []
      if (getCartProducts) {
        getCartProducts.forEach((cartItem: any, cartId: string) => {
          cartItem.forEach((row: any, key: any) => {
            {subtotal = subtotal + (row.get('productQuantity') * row.get('productPrice') )}
            cartProductsList.push(
              <TableRow className={classes.row} key={row.get('productId')}>
                <TableCell scope='row' className={classNames(classes.itemcell, classes.borderbottom)}>
                  {row.get('productName')}
                </TableCell>
                <TableCell align='right' className={classes.borderbottom}>{row.get('productQuantity')}</TableCell>
                <TableCell align='right' className={classNames(classes.itemred, classes.borderbottom)}>{row.get('productPrice')}</TableCell>
              </TableRow>
            )
          })
        })
      }

      if (shippingAddress.get('shippingCost')) {
        grandtotal = grandtotal + (shippingAddress.get('shippingCost') + subtotal)
        this.setgrandtotal( grandtotal )
      }
      // this.settotals( subtotal )
      return cartProductsList
  }

  settotals = (subtotal: any) => {
    this.setState(prevState => {
        if (prevState.subtotalofcart === 0) {
          return {
            subtotalofcart: subtotal
          }
        } else {
          return null
        }
    })
  }

  setgrandtotal = (grandtotal: any) => {
    this.setState(prevState => {
        if (prevState.grandtotalofcart === 0 ) {
          return {
            grandtotalofcart: grandtotal
          }
        } else {
          return null
        }
    })
  }

  onSuccess = (payment: any) => {
      // Congratulation, it came here means everything's fine!

      console.log('The payment was succeeded!', payment)
      const getorderId = this.props.orderId
      this.props.updateOrder!(getorderId,{
        status: 1,
        comments: 'payment is succeeded',
        authcode: payment.paymentID,
        reference: payment
      })
      this.props.update!(3)
      // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
  }
  onCancel = (data: any) => {
      // User pressed "cancel" or close Paypal's popup!
      console.log('The payment was cancelled!', data)
      // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
  }
  onError = (err: any) => {
      // The main Paypal's script cannot be loaded or somethings block the loading of that script!
      console.log('Error!', err)
      // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
      // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
  }
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    let env = 'sandbox' // you can set here to 'production' for production
    let currency = 'GBP' // or you can set this value from your props or state
    let total = this.state.grandtotalofcart // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
    // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/
    const client = {
      sandbox:    'AW7kNlHYjoTuR3VHL5lWv6FYk-eFouc8wdJ8WrcM9SCbizMlzH6V9hmTzC0Y1Kygj2sEBPG0x38jGgYw',
			production: 'AYSwvTQ2zG3GOIyqrJyILdhiNm0yaRAyJbc5D78yQ4hzb2UVosjFvM-x9qMlVJPv-UhGTeiMjDrd3zUL',
    }
    const { classes,shippingAddress } = this.props

    let id = 0
    function createData(
      item: any,
      qty: any,
      price: any
      ) {
      id += 1
      return {id, item, qty, price}
    }

    return (
      <React.Fragment>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={8}>
            <Typography variant='body2' gutterBottom className={classes.subheading}>
              Order summary
            </Typography>
            <Table className={classes.table}>
              <TableHead className={classes.head}>
                <TableRow>
                  <TableCell className={classNames(classes.borderbottom, classes.head)}>Item</TableCell>
                  <TableCell align='right' className={classNames(classes.borderbottom, classes.head)}>Qty</TableCell>
                  <TableCell align='right' className={classNames(classes.borderbottom, classes.head)}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {this.reviewproductsList()}
              </TableBody>
              </Table>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant='body2' gutterBottom className={classes.subheading}>
              Delivery
            </Typography>
            <br />
            <Typography variant='body2' gutterBottom className={classes.subtitle}>
              Address
            </Typography>
            <br />
            <Typography className={classes.subcontent} gutterBottom>{shippingAddress.get('address1')}, {shippingAddress.get('city')}, {shippingAddress.get('country')}, {shippingAddress.get('postalCode')}</Typography>
            <br />
            <Typography variant='body2' gutterBottom className={classes.subtitle}>
              Delivery options
            </Typography>
            <br />
            <Typography className={classes.subcontent} variant='body2' gutterBottom>
              {shippingAddress.get('shippingType')}
            </Typography>

          </Grid>
          <Grid item xs={12}>
            <Divider variant='middle' />
          </Grid>
          <Grid container spacing={0} direction='row'>
              <Grid item container xs={6} sm={3} direction='column' alignItems='center'>
                <Chip label='NEWYEAR8%' className={classes.chip} variant='outlined'/>
              </Grid>
              <Grid item container xs={6} sm={3} direction='column' alignItems='flex-end'>
                <Typography variant='body2' gutterBottom className={classNames(classes.subtitle, classes.subtotaltitlemargin)}>
                  Subtotal
                </Typography>
                <Typography gutterBottom className={classNames(classes.subcontent, classes.subtotalcontentmargin)}>
                  £{this.state.subtotalofcart}
                </Typography>
              </Grid>
              <Grid item container xs={6} sm={2} direction='column' alignItems='flex-end'>
                <Typography variant='body2' gutterBottom className={classNames(classes.subtitle, classes.shippingtitlemargin)}>
                  Shipping
                </Typography>
                <Typography gutterBottom className={classNames(classes.subcontent, classes.shippingcontentmargin)}>
                  £{shippingAddress.get('shippingCost')}
                </Typography>
              </Grid>
              <Grid item xs={6} sm={2} container direction='column' alignItems='center'>
                <Typography variant='body2' gutterBottom className={classes.subtitle}>
                  Grandtotal
                </Typography>
                <Typography gutterBottom className={classNames(classes.subcontent, classes.grandtotalcontentmargin)}>
                  £{this.state.grandtotalofcart}
                </Typography>
              </Grid>
          </Grid>
        </Grid>
        <Paper className={classes.paperbuttons}>
          <React.Fragment>
            <Grid container spacing={8}>
                <Grid item container xs={12} sm={6} direction='row' justify='flex-start' alignItems='center'>
                  <Button
                  onClick={this.handleBack}
                  className={classNames(classes.backbutton, classes.button)}
                  variant='contained'
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} container direction='row' justify='flex-end' alignItems='center' >
                  <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={this.onError}
                    onSuccess={this.onSuccess}
                    onCancel={this.onCancel}
                  />
                </Grid>
            </Grid>
          </React.Fragment>
        </Paper>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IReviewComponentProps) => {
  return {
    update: (value: number) => dispatch(checkoutActions.setActiveStep(value)),
    updateOrder: (orderId: string, order: Order) => dispatch(addToCartActions.dbUpdateOrder(orderId, order))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IReviewComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  const getCart = state.getIn(['addToCart', 'cartProducts'])
  const orderId = state.getIn(['addToCart', 'order', 'orderId'])
  return {
    uid,
    getCart,
    orderId
  }

}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(ReviewComponent as any) as any)) as typeof ReviewComponent
