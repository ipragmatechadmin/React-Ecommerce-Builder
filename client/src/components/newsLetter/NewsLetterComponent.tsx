// - Import react components
import 'react-toastify/dist/ReactToastify.css'

import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { css } from 'glamor'
import { getTranslate } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputBase from '@material-ui/core/InputBase'
import InputLabel from '@material-ui/core/InputLabel'
import React, { Component } from 'react'

import LayoutBody from 'src/components/layoutBody'
import Typography from 'src/components/typography'
import * as globalActions from 'src/store/actions/globalActions'

import { INewsLetterComponentProps } from './INewsLetterComponentProps'
import { INewsLetterComponentState } from './INewsLetterComponentState'

// - Import API

// - Import actions

const styles = (theme: any) => ({
  root: {
    display: 'flex',
    backgroundColor: '#efefef',
  },
  formroot: {
    width: '64%',
  [theme.breakpoints.down('xs')]: {
    width: '90%',
  }

  },
  layoutBody: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
  },
  title: {
    fontSize: '2.5vw',
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#f62f5e',
    fontWeight: 'bold',
    textTransform: 'inherit',
    [theme.breakpoints.down('md')]: {
      fontSize: '4vw'
    }
  },
  content: {
    fontSize: '2vw',
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#2e2e2e',
    textTransform: 'inherit',
    fontWeight: 'bold',
    maxWidth: '77%',
    [theme.breakpoints.down('md')]: {
      fontSize: '3.5vw',
      maxWidth: '100%'
    }
  },
  container:  {
    flexDirection: 'row',
    alignItems: 'center',

  },
  button: {
    textTransform: 'capitalize',
    borderRadius: 30,
    padding: `${15}px ${45}px`,
    boxShadow: 'none',
    marginLeft: 10
  },
  paymentFieldsInput: {
    borderRadius: 25,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid #e1e1e1',
    fontSize: 16,
    padding: '16px 12px',
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
      borderRadius: 25,
      borderColor: '#f62f5e'
    },
  },
  iconButton: {
    padding: 10,
    position: 'absolute',
    left: 0,
    color: '#000'
  },
  placeholder: {
    marginLeft: 10
  },
  emailmargin: {
    marginTop: '3rem',
    [theme.breakpoints.down('sm')]: {
        justifyContent: 'center'
    },
    [theme.breakpoints.down('xs')]: {
        marginTop: '1.5rem',
    },

  }
})
/**
 * Create component class
 */
export class NewsLetterComponent extends Component<INewsLetterComponentProps,INewsLetterComponentState> {

  static propTypes = {
  }

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: INewsLetterComponentProps) {
    super(props)
  }

  /**
   * Handle close popover
   *
   */
  handleSubscribeButton = (event: any) => {
    event.preventDefault()
    this.props.showError!('This feature shall be implement in next version!!')
  }

  notify = () => {
    toast.success(this.props.translate!('common.featureImplementLater'), {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        background: '#ff3366'
      }),
    })
  }
    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const { classes } = this.props

    return (
      <Typography component='section' className={classes.root}>
        <LayoutBody className={classes.layoutBody} width='large'>
          <Grid container spacing={0} direction='row'>
            <Grid item xs={12} container justify='center'>
              <Typography variant='h6' className={classes.title}>
                10% Discount for your subscription
              </Typography>
            </Grid>
            <Grid item xs={12} container justify='center' >
                <Typography variant='body1' className={classes.content}>
                  Carry the day in style with this extra-large tote crafted in our
                  chic B.B. Colloction textured PVC. Featuring colorful faux
                  leather trim, this tote offers a roomy interior.
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={8} container alignItems='center' justify='flex-end' className={classes.emailmargin}>
            <FormControl className={classes.formroot}>
                <InputLabel shrink htmlFor='card-holder-name' className={classes.paymentFieldsLabel}>
                </InputLabel>
                <InputBase
                id='card-holder-name'
                placeholder='Your e-mail here'
                required
                fullWidth
                classes={{
                  root: classes.paymentFieldsRoot,
                  input: classes.paymentFieldsInput
                }}
                />
                {/* <IconButton className={classes.iconButton} aria-label='person'>
                  <EmailIcon fontSize='large' />
                </IconButton> */}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} container justify='flex-start' className={classes.emailmargin}>
              <Button
                variant='contained'
                color='secondary'
                className={classes.button}
                onClick={this.notify}
              >
                 Subscribe
              </Button>
              <ToastContainer autoClose={2000}/>
            </Grid>
          </Grid>
        </LayoutBody>
      </Typography>
    )
  }
}

/**
 * Map dispatch to props
 * @param  {func} dispatch is the function to dispatch action to reducers
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapDispatchToProps = (dispatch: Function, ownProps: INewsLetterComponentProps) => {
  return {
    showError: (message: string) => {
      dispatch(globalActions.showMessage(message))
    },
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: INewsLetterComponentProps) => {
  const uid = state.getIn(['authorize', 'uid'], 0)
  return {
    uid,
    translate: getTranslate(state.get('locale')),
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any, { withTheme: true })(NewsLetterComponent as any) as any)) as typeof NewsLetterComponent
