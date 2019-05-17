// - Import react components
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { push } from 'connected-react-router'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import { UserRegisterModel } from 'src/models/users/userRegisterModel'
import AppFooter from 'src/components/appFooter'
import AppForm from 'containers/appForm'
import FormButton from 'src/components/formButton'
import StringAPI from 'src/api/StringAPI'
import TopAppBar from 'src/components/topAppBar'
import * as authorizeActions from 'src/store/actions/authorizeActions'
import * as globalActions from 'src/store/actions/globalActions'

import { ISignupComponentProps } from './ISignupComponentProps'
import { ISignupComponentState } from './ISignupComponentState'

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
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'capitalize',
    position: 'relative',
    fontWeight: '400',
    color: '6c6c6c',
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
  contain: {
    margin: '0 auto'
  },
  paper: {
    minHeight: 370,
    maxWidth: 450,
    minWidth: 337,
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: 35,
    padding: `${theme.spacing(3) - 3}px ${theme.spacing(15)}px`,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: '#6c6c6c'
  },
  formTitle: {
    fontFamily: '"Montserrat", sans-serif',
    fontSize: 24,
    color: '#2e2e2e',
    lineHeight: '150%',
    textTransform: 'capitalize',
    paddingLeft: '3rem'
  },
  formlinksright: {
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    color: '#f62f5e'
  },
  formlinksleft: {
    flex: 1,
    display: 'inline-flex',
    flexDirection: 'row',
    marginRight: '4rem',
    justifyContent: 'flex-end',
  },
  formlinkswrapper: {
    textAlign: 'center'
  }
})

// - Create Signup component class
export class SignupComponent extends Component<ISignupComponentProps, ISignupComponentState> {

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: ISignupComponentProps) {
    super(props)

    this.state = {
      fullNameInput: '',
      fullNameInputError: '',
      emailInput: '',
      emailInputError: '',
      passwordInput: '',
      passwordInputError: '',
      confirmInput: '',
      confirmInputError: ''
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
      case 'fullNameInput':
        this.setState({
          fullNameInputError: ''
        })
        break
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
      case 'confirmInput':
        this.setState({
          confirmInputError: '',
          passwordInputError: ''
        })
        break
      case 'checkInput':
        this.setState({
          checkInputError: ''
        })
        break
      default:

    }
  }

  /**
   * Handle register form
   */
  handleForm = () => {

    const { fullNameInput, emailInput, passwordInput, confirmInput } = this.state
    const { register, translate } = this.props

    let error = false

    /* Validate email*/
    if (!StringAPI.isValidEmail(emailInput)) {
      this.setState({
        emailInputError: translate!('signup.validEmailError')
      })
      error = true

    }

    /* Check password */
    if (passwordInput === '') {
      this.setState({
        passwordInputError: translate!('signup.passwordRequiredError')
      })
      error = true

    }

    if (fullNameInput === '') {
      this.setState({
        fullNameInputError: translate!('signup.passwordRequiredError')
      })
      error = true

    }

    if (confirmInput === '') {
      this.setState({
        confirmInputError: translate!('signup.confirmRequiredError')
      })
      error = true

    } else if (confirmInput !== passwordInput) {
      this.setState({
        passwordInputError: translate!('signup.passwordEqualConfirmError'),
        confirmInputError: translate!('signup.confirmEqualPasswordError')
      })
      error = true

    }
    if (!error) {
      register!({
        email: emailInput,
        password: passwordInput,
        fullName: fullNameInput
      })
    }

  }

  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {

    const { classes, translate, goTo } = this.props

    return (
      <React.Fragment>
          <TopAppBar />
            <AppForm>
                <React.Fragment>
                  <IconButton aria-label='Close' className={classes.closeButton} onClick={evt => {goTo!(`/`)}} >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant='h3' gutterBottom  align='center' className={classes.formTitle}>
                    Sign Up
                  </Typography>
                </React.Fragment>
                <Typography variant='h3' gutterBottom align='center'>
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
                  margin='normal'
                  required
                  onChange={this.handleInputChange}
                  helperText={this.state.fullNameInputError}
                  error={this.state.fullNameInputError.trim() !== ''}
                  name='fullNameInput'
                  label={translate!('signup.fullNameLabel')}
                  type='name'
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
                  margin='normal'
                  required
                  onChange={this.handleInputChange}
                  helperText={this.state.emailInputError}
                  error={this.state.emailInputError.trim() !== ''}
                  name='emailInput'
                  label={translate!('signup.emailLabel')}
                  type='email'
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
                  margin='normal'
                  required
                  onChange={this.handleInputChange}
                  helperText={this.state.passwordInputError}
                  error={this.state.passwordInputError.trim() !== ''}
                  name='passwordInput'
                  label={translate!('signup.passwordLabel')}
                  type='password'
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
                  margin='normal'
                  required
                  onChange={this.handleInputChange}
                  helperText={this.state.confirmInputError}
                  error={this.state.confirmInputError.trim() !== ''}
                  name='confirmInput'
                  label={translate!('signup.confirmPasswordLabel')}
                  type='password'
                />
                <FormButton
                  className={classes.button}
                  size='large'
                  color='secondary'
                  onClick={this.handleForm}
                >
                  {translate!('signup.createButton')}
                </FormButton>
              </Typography>
              <div className={classes.formlinkswrapper}>
              <Typography variant='body2' align='center' className={classes.formlinksleft}>
                  Already a member?
              </Typography>
              <Link href='/login' className={classes.formlinksright}>
                Sign In
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
const mapDispatchToProps = (dispatch: any, ownProps: ISignupComponentProps) => {
  return {
    showError: (message: string) => {
      dispatch(globalActions.showMessage(message))
    },
    register: (userRegister: UserRegisterModel) => {
      dispatch(authorizeActions.dbSignup(userRegister))
    },
    loginPage: () => {
      dispatch(push('/login'))
    },
    goTo: (url: string) => dispatch(push(url))
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: any, ownProps: ISignupComponentProps) => {
  return {
    translate: getTranslate(state.get('locale')),
  }
}

// - Connect component to redux store
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(SignupComponent as any) as any) as any)
