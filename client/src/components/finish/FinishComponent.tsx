// - Import react components
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import * as checkoutActions from 'store/actions/checkoutActions'

import { IFinishComponentProps } from './IFinishComponentProps'
import { IFinishComponentState } from './IFinishComponentState'

const styles = (theme: any) => ({
  successTitle: {
    fontFamily: '"Playfair Display", serif',
    fontSize: '48px',
    color: '#2e2e2e',
    lineHeight: '150%',
    margin: '10px'
  },
  successContent: {
    fontFamily: '"Open Sans", sans-serif',
    fontSize: '16px',
    color: '#6c6c6c',
    lineHeight: '150%',
    margin: '10px'
  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${60}px`,
    boxShadow: 'none',
    margin: '10px'
  },
})

/**
 * Create component class
 */
export class FinishComponent extends Component<IFinishComponentProps,IFinishComponentState> {

  static propTypes = {
        /**
         * List of users
         */

  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IFinishComponentProps) {
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
    const {classes, goTo} = this.props

    return (
      <React.Fragment>
      <Grid container direction='column' justify='space-between' alignItems='center'>
        <Grid item xs={12}>
          <img src='/public/success-300.png'/>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.successTitle}>
            Success!
          </Typography>
        </Grid>
        <Grid item xs={12}>
        <Typography className={classes.successContent}>
          Your item will be shipped shortly,<br />you will get email with details.
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
          variant='contained'
          color='secondary'
          onClick={evt => {
              this.props.update!(0)
              goTo!(`/products`)
          }}
          className={classes.button}
          >
            Back to shop
        </Button>
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
const mapDispatchToProps = (dispatch: Function, ownProps: IFinishComponentProps) => {
  return {
    goTo: (url: string) => dispatch(push(url)),
    update: (value: number) => dispatch(checkoutActions.setActiveStep(value))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: IFinishComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(FinishComponent as any) as any)) as typeof FinishComponent
