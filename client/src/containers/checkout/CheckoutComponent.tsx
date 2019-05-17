// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import FiberManualRecord from '@material-ui/icons/FiberManualRecord'
import Paper from '@material-ui/core/Paper'
import React, { Component } from 'react'
import Step from '@material-ui/core/Step'
import StepConnector from '@material-ui/core/StepConnector'
import StepIcon from '@material-ui/core/StepIcon'
import StepLabel from '@material-ui/core/StepLabel'
import Stepper from '@material-ui/core/Stepper'
import Typography from '@material-ui/core/Typography'

import AddressForm from 'src/components/addressForm'
import Finish from 'src/components/finish'
import PaymentForm from 'src/components/paymentForm'
import Review from 'src/components/review'

import { ICheckoutComponentProps } from './ICheckoutComponentProps'
import { ICheckoutComponentState } from './ICheckoutComponentState'

const styles = (theme: any) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    padding: theme.spacing(3),
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(6)
    },
    position: 'relative'
  },
  paperbuttons: {
    marginBottom: theme.spacing(3),
    backgroundColor: '#f7f7f7',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    boxShadow: '0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginBottom: theme.spacing(6),
      padding: `${24}px ${48}px`,
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 7),
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
  connectorActive: {
    '& $connectorLine': {
      borderColor: '#f62f5e',
      borderTopStyle: 'solid',
      borderTopWidth: 4,
      color: '#f62f5e'
    },
  },
  connectorCompleted: {
    '& $connectorLine': {
      borderColor: '#f62f5e',
      borderTopStyle: 'solid',
      borderTopWidth: 4,
      color: '#f62f5e'
    },
  },
  connectorDisabled: {
    '& $connectorLine': {
      borderColor: '#f7f7f7',
      borderTopStyle: 'solid',
      borderTopWidth: 4
    },
  },
  connectorLine: {
    transition: theme.transitions.create('border-color'),
  },
  connectoralternativeLabel: {
      top: 7,
      left: `calc(-50% + ${-50}px)`,
      right: `calc(50% + ${67}px)`
  },
  alernativelabel: {
      width: 170,
      textAlign: 'left !important',
      color: '#2e2e2e ',
      fontWeight: 'bold '
  },
  title: {
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'capitalize'
  },
  steplabel: {
    color: '#f62f5e !important',
    fontWeight: 'bold !important'
  },
  iconcompleted : {
    color: '#f62f5e'
  },
  stepperlabel: {
    alignItems: 'flex-start'
  },
  circlesmall : {
    color: '#f7f7f7',
    fontSize: 18,
    width: '3em'
  },
  steproot: {

  },
  stepdisabled: {
    color: '#2e2e2e !important',
    fontWeight: 'bold !important'
  }
})

// - Create Home component class
export class CheckoutComponent extends Component<ICheckoutComponentProps, ICheckoutComponentState> {

  // Constructor
  constructor(props: ICheckoutComponentProps) {
    super(props)
    // Default state
    this.state = {
      activeStep: 0,
    }
    // Binding function to `this`
  }

  getStepContent = (step: any) => {
    switch (step) {
      case 0:
        return <AddressForm shippingRates={this.props.mergedShippingRates}/>
      case 1:
        return <Review shippingAddress={this.props.mergedShippingAddress}/>
      case 2:
        return <PaymentForm />
      case 3:
        return <Finish />
      default:
        throw new Error('Unknown step')
    }
  }

  /**
   * Handle Next step on change
   */
  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }))

  }

  /**
   * Handle backbutton step on change
   */
  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }))
  }

  /**
   * Handle Reset step on change
   */
  handleReset = () => {
    this.setState({
      activeStep: 0,
    })
  }

  /**
   * Render DOM component
   *
   * @returns DOM
   *
   * @memberof Home
   */
  render() {
    const { classes } = this.props
    const steps = ['Delivery', 'Confirmation', 'Payment', 'Finish']
    const { activeStep } = this.props
    const connector = (
      <StepConnector className={classes.connectoralternativeLabel}
        classes={{
          active: classes.connectorActive,
          completed: classes.connectorCompleted,
          disabled: classes.connectorDisabled,
          line: classes.connectorLine,
        }}
      />
    )
    const icon = (
      <StepIcon
      classes={{
        active: classes.iconActive,
        completed: classes.iconCompleted,
        disabled: classes.iconDisabled,
      }}
      icon={<FiberManualRecord className={classes.circlesmall} />}
      />
    )
    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography component='h6' variant='h6' className={classes.title}>
              Checkout
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper} alternativeLabel connector={connector}>
              {steps.map((label: any) => (
                <Step className={classes.steproot} key={''}>
                  <StepLabel
                  classes={{
                    alternativeLabel: classes.alernativelabel,
                    active: classes.steplabel,
                    completed: classes.steplabel,
                    disabled: classes.stepdisabled
                  }}
                  className={classes.stepperlabel}
                  icon={icon}
                  >
                  {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {this.getStepContent(activeStep)}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    )
  }
}

// - Map dispatch to props
const mapDispatchToProps = (dispatch: any, ownProps: ICheckoutComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: ICheckoutComponentProps) => {
  let mergedShippingAddress = Map({})
  const shippingAddress = state.getIn(['shippings', 'shippingAddress'])
  mergedShippingAddress = mergedShippingAddress.merge(shippingAddress)
  let mergedShippingRates = Map({})
  const shippingRates = state.getIn(['shippings','shippingRates'])
  mergedShippingRates = mergedShippingRates.merge(shippingRates)
  return {
    authed: state.getIn(['authorize', 'authed'], false),
    activeStep: state.getIn(['checkout', 'activeState'], 0),
    mergedShippingAddress,
    mergedShippingRates
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(CheckoutComponent as any) as any)) as typeof CheckoutComponent
