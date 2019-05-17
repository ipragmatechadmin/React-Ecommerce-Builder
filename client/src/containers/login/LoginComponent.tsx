// - Import external components
import { connect } from 'react-redux'
import { localize } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { OAuthType } from 'src/core/domain/authorize'
import AppFooter from 'src/components/appFooter'
import AppForm from 'containers/appForm'
import CommonAPI from 'api/CommonAPI'
import FormButton from 'src/components/formButton'
import TopAppBar from 'src/components/topAppBar'
import * as authorizeActions from 'src/store/actions/authorizeActions'

import { ILoginComponentProps } from './ILoginComponentProps'
import { ILoginComponentState } from './ILoginComponentState'

const styles = (theme: any) => ({
  root: {
    padding: 0,
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  margin: {
    margin: theme.spacing.unit,
  },
  cssLabel: {
    '&$cssFocused': {
      color: '#f62f5e',
    },
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: '#f62f5e',
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: '#f62f5e',
    },
  },
  notchedOutline: {},
  input: {
    minWidth: theme.spacing(6),
    backgroundColor: theme.palette.common.white,
    '&$disabled': {
      backgroundColor: theme.palette.divider,
    },
  },
  inputBorder: {
    border: '1px solid #e9ddd0',
    '&:focus': {
      borderColor: theme.palette.secondary.main,
    },
  },
  disabled: {},
  inputSizeSmall: {
    fontSize: 14,
    padding: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(2)}px)`,
  },
  inputSizeMedium: {
    fontSize: 16,
    padding: theme.spacing(2),
    width: `calc(100% - ${theme.spacing(4)}px)`,
  },
  inputSizeLarge: {
    fontSize: 18,
    padding: 22,
    width: `calc(100% - ${22 * 2}px)`,
  },
  inputSizeXlarge: {
    fontSize: 20,
    padding: 25,
    width: `calc(100% - ${25 * 2}px)`,
  },
  formLabel: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    top: 20,
    '&$cssFocused $notchedOutline:': {
      position: 'absolute',
      top: 0,
      textAlign: 'left',
    },
  },
  select: {
    height: 'auto',
    borderRadius: 0,
  },
  selectIcon: {
    top: '50%',
    marginTop: -12,
  },
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: 35,
    padding: `${theme.spacing(3) - 3}px ${theme.spacing(20)}px`,
  },
  formlinksright: {
    width: '50%',
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#f62f5e'
  },
  formlinksleft: {
    width: '50%',
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: '#f62f5e'
  },
  formTitle: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 24,
    color: '#2e2e2e',
    lineHeight: '150%',
    textTransform: 'capitalize'
  },
  remember: {
    fontSize: 16,
    fontFamily: '"Montserrat", sans-serif',
    lineHeight: '150%',
    color: '#6c6c6c',
    fontWeight: '400',
    textTransform: 'capitalize'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: '#6c6c6c'
  },
})

// - Create Login component class
export class LoginComponent extends Component<ILoginComponentProps, ILoginComponentState> {

  styles = {
    singinOptions: {
      paddingBottom: 10,
      justifyContent: 'space-around',
      display: 'flex'
    },
    divider: {
      marginBottom: 10,
      marginTop: 15
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ILoginComponentProps) {
    super(props)

    this.state = {
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInputError: '',
      remember: true
    }

    // Binding function to `this`
    this.handleForm = this.handleForm.bind(this)
  }

  /**
   * Handle data on input change
   * @param  {event} evt is an event of inputs of element on change
   */
  handleInputChange = (event: any) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })

    switch (name) {
      case 'emailInput':
        this.setState({
          emailInputError: ''
        })
        break
      case 'passwordInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })

        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {
    const { translate } = this.props
    let error = false
    if (this.state.emailInput === '') {
      this.setState({
        emailInputError: translate!('login.emailRequiredError')
      })
      error = true

    }
    if (this.state.passwordInput === '') {
      this.setState({
        passwordInputError: translate!('login.passwordRequiredError')
      })
      error = true

    }

    if (!error) {
      this.props.login!(
        this.state.emailInput,
        this.state.passwordInput
      )
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, loginWithOAuth, translate, goTo } = this.props

    const OAuthLogin = (
      <div style={this.styles.singinOptions as any}>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.FACEBOOK)}
        ><div className='icon-fb icon'></div></IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GOOGLE)}
        > <div className='icon-google icon'></div> </IconButton>
        <IconButton
          onClick={() => loginWithOAuth!(OAuthType.GITHUB)}
        > <div className='icon-github icon'></div> </IconButton>

      </div>
    )

    return (
      <React.Fragment>
        <TopAppBar />
        <AppForm>
          <React.Fragment>
            <IconButton aria-label='Close' className={classes.closeButton} onClick={evt => {goTo!(`/`)}} >
              <CloseIcon />
            </IconButton>
            <Typography variant='h3' gutterBottom align='center' className={classes.formTitle}>
              Sign In
            </Typography>
          </React.Fragment>
          <Typography variant='h3' gutterBottom align='center'>
          <form className={classes.form}>
              <TextField fullWidth
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                  className: classes.formLabel,
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputSizeLarge,
                  },
                }}
                variant='outlined'
                id='email-input'
                onChange={this.handleInputChange}
                helperText={this.state.emailInputError}
                error={this.state.emailInputError.trim() !== ''}
                name='emailInput'
                label={translate!('login.emailLabel')}
                type='email'
                tabIndex={1}
                margin='normal'
                required
              />
              <TextField fullWidth
                className={classes.margin}
                InputLabelProps={{
                  classes: {
                    root: classes.cssLabel,
                    focused: classes.cssFocused,
                  },
                  className: classes.formLabel,
                }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                    input: classes.inputSizeLarge,
                  },
                }}
                variant='outlined'
                id='password-input'
                onChange={this.handleInputChange}
                helperText={this.state.passwordInputError}
                error={this.state.passwordInputError.trim() !== ''}
                name='passwordInput'
                label={translate!('login.passwordLabel')}
                type='password'
                tabIndex={2}
                margin='normal'
              />
              <Typography variant='h6' gutterBottom align='center'className={classes.remember} >
                <Checkbox
                checked={this.state.remember}
                onChange={this.handleInputChange}
                name='remember'
                value='remember'
                color='secondary'
                />
                Remember
              </Typography>
              <FormButton
                  className={classes.button}
                  size='large'
                  color='secondary'
                  onClick={this.handleForm}
                >
                  {translate!('login.title')}
                </FormButton>
          </form>
          </Typography>

          <div>
            <Link href='/resetPassword' className={classes.formlinksright}>
              Forgot password?
            </Link>
            <Link href='/signup' className={classes.formlinksleft}>
              Have an account
            </Link>
          </div>
        </AppForm>
        <AppFooter />
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
const mapDispatchToProps = (dispatch: any, ownProps: ILoginComponentProps) => {
  return {
    login: (email: string, password: string) => {
      dispatch(authorizeActions.dbLogin(email, password))
    },
    goTo: (url: string) => dispatch(push(url)),
    loginWithOAuth: (type: OAuthType) => dispatch(authorizeActions.dbLoginWithOAuth(type)),
    signupPage: () => {
      dispatch(push('/signup'))
    }
  }
}

/**
 * Map state to props
 */
const mapStateToProps = (state: any, ownProps: ILoginComponentProps) => {
  return {
  }
}

// - Connect component to redux store
export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(localize(LoginComponent as any, 'locale', CommonAPI.getStateSlice) as any) as any)) as typeof LoginComponent
