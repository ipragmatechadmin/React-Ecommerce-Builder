// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import classNames from 'classnames'

import { Order } from 'core/domain/cart'
import { ShippingAddress } from 'core/domain/shippings'
import * as addToCartActions from 'store/actions/addToCartActions'
import * as shippingsActions from 'store/actions/shippingsActions'

import { IAddressFormComponentProps } from './IAddressFormComponentProps'
import { IAddressFormComponentState } from './IAddressFormComponentState'
import FormButton from '../formButton'

const styles = (theme: any) => ({
  root: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(7)
    }
  },
  formroot: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  paperbuttons: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow:
      '0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      padding: `${24}px ${48}px`
    },
    position: 'relative',
    width: '116%',
    bottom: -72,
    left: -48
  },
  inputSizeSmall: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
    borderColor: '#e1e1e1'
  },
  formLabel: {
    fontSize: 12,
    fontFamily: '"Montserrat", sans-serif',
    color: '#b4b4b4',
    left: -12,
    fontWeight: 'bold'
  },
  group: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'capitalize'
  },
  griditem: {
    padding: '0px 12px 0px 0px!important'
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
      borderColor: '#77db77'
    },
  },
  paymentFieldsLabel: {
    fontSize: 16,
    color: '#b4b4b4',
    fontWeight: 'bold',
    fontFamily: '"Montserrat", sans-serif',
  },
  countrytitle : {
    color: '#b4b4b4',
    fontSize: 12
  },
  countryname : {
    color: '#2e2e2e',
    marginLeft: '0.5rem',
    fontSize: 12
  },
  billinginfo: {
    color: '#2e2e2e',
    fontSize: 12
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
  radiowrapper: {
    flexDirection: 'row',
    width: '100%'
  },
  formHelperText: {
    color: '#f62f5e'
  }
})

/**
 * Create component class
 */
export class AddressFormComponent extends Component<
  IAddressFormComponentProps,
  IAddressFormComponentState
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
  constructor(props: IAddressFormComponentProps) {
    super(props)
    console.log('shipping', this.props.shippingAddress)
    // Defaul state
    this.state = {
      region: 1,
      open: false,
      activeStep: 0,
      address: this.props.shippingAddress ? this.props.shippingAddress.address1 : '',
      city: this.props.shippingAddress ? this.props.shippingAddress.city : '',
      state: this.props.shippingAddress ? this.props.shippingAddress.country : '',
      zip: this.props.shippingAddress ? this.props.shippingAddress.postalCode : '',
      firstNameInputError: '',
      lastNameInputError: '',
      addressInputError: '',
      cityInputError: '',
      stateInputError: '',
      zipInputError: '',
      regionSelectError: '',
      shippingTypeError: '',
      shippingType: ''
    }
    // Binding functions to `this`
    this.handleNext = this.handleNext.bind(this)
  }
  shippingList = () => {
    const allShippingRegions = this.props.shippingRegions
    const shippingRegionsList: any[] = []
    if (allShippingRegions) {
      allShippingRegions.forEach(
        (shippingRegion: Map<string, any>, key: string) => {
          const shippingRegionId = shippingRegion.get('shippingRegionId')
          let shippingRegionValue = shippingRegion.get('shippingRegion')
          shippingRegionsList.push(
            <MenuItem key={key} value={shippingRegionId}>
              {shippingRegionValue}
            </MenuItem>
          )
        }
      )
    }
    return shippingRegionsList
  }

  handleChangeradio = (event: any, shippingType: any) => {
      this.setState({ shippingType })
  }

  /**
   * Create a list of shipping rates
   * @return {DOM} shipping rates
   */
  shippingRatesLoad = () => {
    const { shippingRates } = this.props
    let ratesList: any = []
    if (shippingRates) {
      shippingRates.forEach((shippingRates: Map<string, any>, key: string) => {
        let shippingType = shippingRates.get('shippingType')
        let shippingCost = shippingRates.get('shippingCost')
        ratesList.push(
            <FormControlLabel name={shippingCost} value={shippingType} control={<Radio />} label={shippingType} />
        )
      })
    }
    return ratesList
  }

  handleChange(event: any) {
    //  this.setState(event.target.value)
  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    if (name === 'region') {
      this.setState({
        shippingRegionId: target.key
      })
      this.props.getShippingRates!(value)
    }
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'firstName':
        this.setState({
          firstNameInputError: ''
        })
        break
      case 'lastName':
        this.setState({
          lastNameInputError: ''
        })
        break
      case 'address':
        this.setState({
          addressInputError: ''
        })
        break
      case 'city':
        this.setState({
          cityInputError: ''
        })
        break
      case 'state':
        this.setState({
          stateInputError: ''
        })
        break
      case 'zip':
        this.setState({
          zipInputError: ''
        })
        break
      default:
    }
  }

  /**
   * Handle close request of select
   */
  handleClose = () => {
    this.setState({ open: false })
  }

  /**
   * Handle open request of select
   */
  handleOpen = () => {
    this.setState({ open: true })
  }

  /**
   * Handle backbutton step on change
   */
  handleBack = () => {
    this.setState({
      activeStep: 0
    })
  }

  /**
   * Handle backbutton step on change
   */
  handleNext = () => {
    const { translate, uid, shippingAddress} = this.props
    const getCartProducts = this.props.getCart
    const {
      firstName,
      lastName,
      city,
      state,
      zip,
      region,
      shippingType
    } = this.state
    var regionValue
    {
      region === 2
        ? (regionValue = 'US / Canada')
        : region === 3
        ? (regionValue = 'Europe')
        : region === 4 ? (regionValue = 'Rest of World') : (regionValue = 'Please Select')
    }
    var shippingCost, shippingId, cartId
    if (getCartProducts) {
      getCartProducts.forEach((row: any, key: string) => {
        cartId = key
      })
    } else {
      cartId = ''
    }

    this.props.shippingRates.forEach((shippingRates: Map<string, any>, key: string) => {

      if (shippingRates.get('shippingType') === shippingType) {

        shippingCost = shippingRates.get('shippingCost')
        shippingId = shippingRates.get('shippingId')
      }
    })

    let error = false
    if (this.state.firstName === undefined || (this.state.firstName.trim() === '' || this.state.firstName.trim().length === 0)) {
      this.setState({
        firstNameInputError: translate!('login.emailRequiredError')
      })
      error = true
    }
    if (this.state.lastName === undefined || (this.state.lastName.trim() === '' || this.state.lastName.trim().length === 0)) {
      this.setState({
        lastNameInputError: translate!('login.emailRequiredError')
      })
      error = true
    }
    if (this.state.region === 1 || this.state.region === undefined) {
      this.setState({
        regionSelectError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (this.state.shippingType === undefined || (this.state.shippingType.trim() === '' || this.state.shippingType.trim().length === 0)) {
      this.setState({
        shippingTypeError: translate!('login.emailRequiredError')
      })
      error = true
    }
  if (!shippingAddress) {
    if (this.state.address === undefined || (this.state.address.trim() === '' || this.state.address.trim().length === 0)) {
      this.setState({
        addressInputError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (this.state.city === undefined || ((this.state.city.trim() === '' ) || this.state.city.trim().length === 0)) {
      this.setState({
        cityInputError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (this.state.state === undefined || (this.state.state.trim() === '' || this.state.state.trim().length === 0)) {
      this.setState({
        stateInputError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (this.state.zip === undefined || (this.state.zip.trim() === '' || this.state.zip.trim().length === 0)) {
      this.setState({
        zipInputError: translate!('login.emailRequiredError')
      })
      error = true
    }
  }

    if (!error) {
      this.props.update!({
        firstName: firstName,
        lastName: lastName,
        address: this.state.address,
        city: city,
        state: state,
        postalCode: zip,
        region: region,
        regionValue: regionValue,
        shippingType: shippingType,
        shippingCost: shippingCost,
        shippingId: shippingId,
        customerId: uid
      })
      this.props.addOrder!({
          cartId: cartId,
          shippingId: shippingId,
          customerId: uid,
          taxId: 1
      })
    }
  }

  /**
   * Handle Reset step on change
   */
  handleReset = () => {
    this.setState({
      activeStep: 0
    })
  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, shippingAddress } = this.props
    return (
      <React.Fragment>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='first name'
                  className={classes.paymentFieldsLabel}
                >
                  First Name
                </InputLabel>
                <InputBase
                  id='firstName'
                  required
                  name='firstName'
                  value={this.state.firstName}
                  onChange={this.handleInputChange}
                  fullWidth
                  error
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.firstNameInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='last-name'
                  className={classes.paymentFieldsLabel}
                >
                  Last name
                </InputLabel>
                <InputBase
                  id='last-name'
                  required
                  name='lastName'
                  value={this.state.lastName}
                  onChange={this.handleInputChange}
                  fullWidth
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.lastNameInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='address'
                  className={classes.paymentFieldsLabel}
                >
                  Address
                </InputLabel>
                <InputBase
                  id='address'
                  required
                  name='address'
                  value={this.state.address ? this.state.address : shippingAddress ? shippingAddress.address1 : ''}
                  onChange={this.handleInputChange}
                  fullWidth
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.addressInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='city'
                  className={classes.paymentFieldsLabel}
                >
                  City
                </InputLabel>
                <InputBase
                  id='city'
                  required
                  name='city'
                  value={this.state.city ? this.state.city : shippingAddress ? shippingAddress.city : ''}
                  onChange={this.handleInputChange}
                  fullWidth
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.cityInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='state'
                  className={classes.paymentFieldsLabel}
                >
                  State
                </InputLabel>
                <InputBase
                  id='state'
                  required
                  name='state'
                  value={this.state.state ? this.state.state : shippingAddress ? shippingAddress.country : ''}
                  onChange={this.handleInputChange}
                  fullWidth
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.stateInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  shrink
                  htmlFor='zip'
                  className={classes.paymentFieldsLabel}
                >
                  Zip code
                </InputLabel>
                <InputBase
                  id='zip'
                  required
                  name='zip'
                  value={this.state.zip ? this.state.zip : shippingAddress ? shippingAddress.postalCode : ''}
                  onChange={this.handleInputChange}
                  fullWidth
                  classes={{
                    root: classes.paymentFieldsRoot,
                    input: classes.paymentFieldsInput
                  }}
                />
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.zipInputError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.griditem}>
              <FormControl className={classes.formroot}>
                <InputLabel
                  htmlFor='region'
                  className={classes.paymentFieldsLabel}
                >
                  Region
                </InputLabel>
                <Select
                  id='region'
                  required
                  name='region'
                  value={this.state.region}
                  input={<Input name='region' id='rigion' />}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  onChange={this.handleInputChange}
                  classes={{
                    root: classes.paymentFieldsRoot,
                    select: classes.paymentFieldsInput
                  }}
                >
                  {this.shippingList()}
                </Select>
                <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.regionSelectError}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} container direction='row'>
              <Typography
                className={classNames(
                  classes.countrytitle,
                  classes.paymentFieldsLabel
                )}
              >
                Country:
              </Typography>
              <Typography
                className={classNames(
                  classes.countryname,
                  classes.paymentFieldsLabel
                )}
              >
                Great Britain *
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={this.state.saveAddress}
                    color='secondary'
                    name='saveAddress'
                    onChange={this.handleInputChange}
                    value={'saveAddress'}
                  />
                }
                label='My billing information is the same as my delivery information'
                classes={{
                  label: classNames(
                    classes.billinginfo,
                    classes.paymentFieldsLabel
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider variant='middle' />
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6' gutterBottom className={classes.title}>
                Delivery options
            </Typography>
            </Grid>
            <Grid item xs={12} container direction='row'>
            <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.shippingTypeError}
            </FormHelperText>
            <RadioGroup value={this.state.value} onChange={this.handleChangeradio} classes={{
              root: classes.radiowrapper
            }}>
              {this.shippingRatesLoad()}
            </RadioGroup>
            </Grid>

            {/* {shippingRates ? <div>

            <FormControl component={'fieldset' as 'div'} className={classes.formControl}>
              <RadioGroup
                className={classes.group}
                aria-label='delivery-options'
                name='delivery-options'
                value={'standard-shipping'}
              >

                  <FormControlLabel value='standard-shipping' control={<Radio />} label='Standard shipping: (free, 2-3 business days)' />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel value='express-shipping' control={<Radio />} label='Express shipping: ($28, 1-2 business days)' />
                </Grid>
              </RadioGroup>
            </FormControl></div> : ''} */}

          </Grid>
          <Paper className={classes.paperbuttons}>
            <React.Fragment>
              <Grid container spacing={8}>
                <Grid
                  item
                  container
                  xs={12}
                  sm={6}
                  direction='row'
                  justify='flex-start'
                  alignItems='center'
                >
                  <Button
                    onClick={this.handleBack}
                    className={classNames(classes.backbutton, classes.button)}
                    variant='contained'
                  >
                    Back
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  container
                  direction='row'
                  justify='flex-end'
                  alignItems='center'
                >
                  <FormButton
                    size='small'
                    className={classes.button}
                    color='secondary'
                    onClick={this.handleNext}
                  >
                    Next Step
                  </FormButton>
                </Grid>
              </Grid>
            </React.Fragment>
          </Paper>
        </form>
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
const mapDispatchToProps = (
  dispatch: Function,
  ownProps: IAddressFormComponentProps
) => {
  return {
    update: (shippingAddress: ShippingAddress) => {
      dispatch(shippingsActions.dbAddShippingAddressfromcheckout(shippingAddress))
    },
    getShippingRates: (regionId: string) => {
      dispatch(shippingsActions.dbGetShippingRates(regionId))
    },
    addOrder: (order: Order) => dispatch(addToCartActions.dbAddOrder(order))
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
  ownProps: IAddressFormComponentProps
) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  const shippingRegions = state.getIn(['shippings', 'shippingRegions'])
  const getshippingId = state.getIn(['shippings', 'shippingAddress','shippingId'])
  const shippingAddress = state.getIn(['shippings', 'shippingAddress'])
  const getCart = state.getIn(['addToCart', 'cartProducts'])
  return {
    uid,
    shippingRegions,
    getshippingId,
    getCart,
    shippingAddress,
    translate: getTranslate(state.get('locale')),
  }
}

export default withRouter<any>(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles as any, { withTheme: true })(
    AddressFormComponent as any
  ) as any)
) as typeof AddressFormComponent
