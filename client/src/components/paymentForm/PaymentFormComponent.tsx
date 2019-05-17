// - Import react components
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CardIcon from '@material-ui/icons/CreditCard'
import DateRangeIcon from '@material-ui/icons/DateRange'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/Lock'
import PaypalExpressBtn from 'react-paypal-express-checkout'
import PersonIcon from '@material-ui/icons/PersonOutlined'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import config from 'src/config'

import { IPaymentFormComponentProps } from './IPaymentFormComponentProps'
import { IPaymentFormComponentState } from './IPaymentFormComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  formroot: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  paymentFieldsRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  paymentFieldsInput: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #e1e1e1',
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '77db77'
    },
  },
  paymentFieldsLabel: {
    fontSize: 16,
    color: '#b4b4b4',
    fontWeight: 'bold',
    fontFamily: '"Montserrat", sans-serif',
  },
  cardtext: {
    fontSize: 10,
    color: '#6c6c6c',
    lineHeight: '200%',
    fontFamily: 'sans-serif',
    marginTop: '1.7rem'
  },
  griditem: {
    padding: '0px 12px!import'
  },
  iconButton: {
    padding: 10,
    position: 'absolute',
    right: 0,
    top: '1.5rem',
    color: '#000'
  },
})

/**
 * Create component class
 */
export class PaymentFormComponent extends Component<IPaymentFormComponentProps,IPaymentFormComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IPaymentFormComponentProps) {
    super(props)

        // Defaul state
    this.state = {

    }
      // Binding functions to `this`

  }
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {classes, translate} = this.props
    const client = {
			sandbox:    config.paypal.sandbox,
			production: config.paypal.production,
		}

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <PaypalExpressBtn client={client} currency={'USD'} total={1.00} />
          </Grid>
          <Grid item xs={12} md={6}>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className={classes.griditem}>
          <FormControl className={classes.formroot}>
            <InputLabel shrink htmlFor='card-holder-name' className={classes.paymentFieldsLabel}>
              {translate!('paymentForm.cardHolderName')}
            </InputLabel>
            <InputBase
            id='card-holder-name'
            required
            fullWidth
            classes={{
              root: classes.paymentFieldsRoot,
              input: classes.paymentFieldsInput,
            }}
            />
            <IconButton className={classes.iconButton} aria-label='person'>
              <PersonIcon fontSize='small' />
            </IconButton>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className={classes.griditem}>
          <FormControl className={classes.formroot}>
            <InputLabel shrink htmlFor='card-number' className={classes.paymentFieldsLabel}>
              {translate!('paymentForm.cardNumber')}
            </InputLabel>
            <InputBase
            id='card-number'
            required
            type='password'
            fullWidth
            classes={{
              root: classes.paymentFieldsRoot,
              input: classes.paymentFieldsInput,
            }}
            />
            <IconButton className={classes.iconButton} aria-label='Search'>
              <CardIcon fontSize='small' />
            </IconButton>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} className={classes.griditem}>
            <FormControl className={classes.formroot}>
              <InputLabel shrink htmlFor='valid-thru' className={classes.paymentFieldsLabel}>
                {translate!('paymentForm.validThru')}
              </InputLabel>
              <InputBase
              id='valid-thru'
              required
              placeholder='MM/YY'
              fullWidth
              classes={{
                root: classes.paymentFieldsRoot,
                input: classes.paymentFieldsInput,
              }}
              />
              <IconButton className={classes.iconButton} aria-label='Search'>
                <DateRangeIcon fontSize='small' />
              </IconButton>
              </FormControl>
          </Grid>
          <Grid item xs={12} md={3} className={classes.griditem}>
            <FormControl className={classes.formroot}>
              <InputLabel shrink htmlFor='cvv-cvc' className={classes.paymentFieldsLabel}>
                {translate!('paymentForm.CVV/CVC')}
              </InputLabel>
              <InputBase
              id='cvv-cvc'
              required
              fullWidth
              classes={{
                root: classes.paymentFieldsRoot,
                input: classes.paymentFieldsInput,
              }}
              />
              <IconButton className={classes.iconButton} aria-label='Search'>
                <LockIcon fontSize='small' />
              </IconButton>
              </FormControl>
          </Grid>
          <Grid item xs={12} md={6} className={classes.griditem}>
            <Typography className={classes.cardtext}>
              {translate!('paymentForm.cvvText')}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          </Grid>
        </Grid>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IPaymentFormComponentProps) => {
  return {

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IPaymentFormComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid,
    translate: getTranslate(state.get('locale')),
  }
}

// - Connect component to redux store

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(PaymentFormComponent as any) as any)) as typeof PaymentFormComponent
