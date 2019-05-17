// - Import react components
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import EventListener from 'react-event-listener'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import moment from 'moment/moment'

import { ShippingAddress } from 'core/domain/shippings'
import AppDialogTitle from 'layouts/dialogTitle'
import ImageGallery from 'components/imageGallery'
import ImgCover from 'components/imgCover'
import UserAvatarComponent from 'components/userAvatar'
import * as shippingsActions from 'store/actions/shippingsActions'
import * as userActions from 'store/actions/userActions'

import { IEditProfileComponentProps } from './IEditProfileComponentProps'
import { IEditProfileComponentState } from './IEditProfileComponentState'

const styles = (theme: any) => ({
  dialogTitle: {
    padding: 0
  },
  dialogContentRoot: {
    maxHeight: 400,
    minWidth: 330,
    [theme.breakpoints.down('xs')]: {
      maxHeight: '100%'
    }
  },
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0
    }
  },
  fixedDownStickyXS: {
    [theme.breakpoints.down('xs')]: {
      position: 'fixed',
      bottom: 0,
      right: 0,
      background: 'white',
      width: '100%'
    }
  },
  bottomPaperSpace: {
    height: 16,
    [theme.breakpoints.down('xs')]: {
      height: 90
    }
  },
  box: {
    padding: '0px 24px 0px',
    display: 'flex'
  },
  bottomTextSpace: {
    marginBottom: 15
  },
  dayPicker: {
    width: '100%',
    padding: '13px 0px 8px'
  },
  formHelperText: {
    color: '#f62f5e'
  }
})

/**
 * Create component class
 */
export class EditProfileComponent extends Component<
  IEditProfileComponentProps,
  IEditProfileComponentState
> {
  static propTypes = {
    /**
     * User full name
     */
    fullName: PropTypes.string.isRequired
  }

  styles = {
    avatar: {
      border: '2px solid rgb(255, 255, 255)'
    },
    paper: {
      width: '90%',
      height: '100%',
      margin: '0 auto',
      display: 'block'
    },
    title: {
      padding: '24px 24px 20px 24px',
      font: '500 20px Roboto,RobotoDraft,Helvetica,Arial,sans-serif',
      display: 'flex',
      wordWrap: 'break-word',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      flexGrow: 1
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '24px 24px 20px'
    },
    updateButton: {
      marginLeft: '10px'
    },
    dialogGallery: {
      width: '',
      maxWidth: '530px',
      borderRadius: '4px'
    },
    iconButtonSmall: {},
    iconButton: {}
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor(props: IEditProfileComponentProps) {
    super(props)
    // Defaul state
    this.state = {
      /**
       * If it's true the winow is in small size
       */
      isSmall: false,
      /**
       * User tag line input value
       */
      tagLineInput: '',
      /**
       * User full name input value
       */
      fullNameInput: '',
      /**
       * Error message of full name input
       */
      fullNameInputError: '',
      /**
       * User banner address
       */
      banner:
        'https://firebasestorage.googleapis.com/v0/b/open-social-33d92.appspot.com/o/images%2F751145a1-9488-46fd-a97e-04018665a6d3.JPG?alt=media&token=1a1d5e21-5101-450e-9054-ea4a20e06c57',
      /**
       * User avatar address
       */
      avatar: '',
      /**
       * It's true if the image galley for banner is open
       */
      openBanner: false,
      /**
       * It's true if the image gallery for avatar is open
       */
      openAvatar: false,
      /**
       * Default birth day
       */
      defaultBirthday:
        props.info && props.info.birthday
          ? moment.unix(props.info!.birthday!).toDate()
          : '',
      /**
       * Seleted birth day
       */
      selectedBirthday: 0,
      /**
       * Web URL
       */
      webUrl: props.info && props.info.webUrl ? props.info.webUrl : '',
      /**
       * User company name
       */
      companyName:
        props.info && props.info.companyName ? props.info.companyName : '',
      /**
       * User twitter id
       */
      twitterId: props.info && props.info.twitterId ? props.info.twitterId : '',

      activeStep: 0,
      addressInputError: '',
      cityInputError: '',
      stateInputError: '',
      zipInputError: '',
      regionSelectError: '',
      region: 1,
      address: this.props.shippingAddress ? this.props.shippingAddress.address1 : '',
      city: this.props.shippingAddress ? this.props.shippingAddress.city : '',
      state: this.props.shippingAddress ? this.props.shippingAddress.country : '',
      zip: this.props.shippingAddress ? this.props.shippingAddress.postalCode : '',
    }

    // Binding functions to `this`
    this.handleUpdate = this.handleUpdate.bind(this)
    this.handleRequestSetAvatar = this.handleRequestSetAvatar.bind(this)
    this.handleRequestSetBanner = this.handleRequestSetBanner.bind(this)
  }

  /**
   * Close image gallery of banner
   */
  handleCloseBannerGallery = () => {
    this.setState({
      openBanner: false
    })
  }

  /**
   * Open image gallery of banner
   */
  handleOpenBannerGallery = () => {
    this.setState({
      openBanner: true
    })
  }

  /**
   * Close image gallery of avatar
   */
  handleCloseAvatarGallery = () => {
    this.setState({
      openAvatar: false
    })
  }

  /**
   * Open image gallery of avatar
   */
  handleOpenAvatarGallery = () => {
    this.setState({
      openAvatar: true
    })
  }

  /**
   * Set banner image url
   */
  handleRequestSetBanner = (url: string) => {
    this.setState({
      banner: url
    })
  }

  /**
   * Set avatar image url
   */
  handleRequestSetAvatar = (fileName: string) => {
    this.setState({
      avatar: fileName
    })
  }

  /**
   * Update profile on the server
   *
   *
   * @memberof EditProfile
   */
  handleUpdate = () => {
    const {
      address,
      city,
      state,
      zip,
    } = this.state
    const { update, translate, uid } = this.props

    let error = false
    if (this.state.address === undefined || (this.state.address.trim() === '' || this.state.address.trim().length === 0)) {
      this.setState({
        addressInputError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (this.state.city === undefined || (this.state.city.trim() === '' || this.state.city.trim().length === 0)) {
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

    if (this.state.region === 1 || this.state.region === undefined) {
      this.setState({
        regionSelectError: translate!('login.emailRequiredError')
      })
      error = true
    }

    if (!error) {
      update!({
      address: address,
      city: city,
      state: state,
      postalCode: zip,
      region: 3,
      regionValue: 'US / Canada',
      shippingCost: '10',
      shippingId: '2',
      shippingType: '3-4 Days ($10)',
      customerId: uid,
      })

      this.props.onRequestClose!()
    // }
    }
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
        region: target.key
      })
    }
    this.setState({
      [name]: value
    })
  }

  /**
   * Handle resize event for window to change sidebar status
   * @param  {any} event is the event is passed by winodw resize event
   */
  handleResize = (event: any) => {
    // Set initial state
    let width = window.innerWidth

    if (width > 900) {
      this.setState({
        isSmall: false
      })
    } else {
      this.setState({
        isSmall: true
      })
    }
  }

  /**
   * Handle birthday date changed
   */
  handleBirthdayDateChange = (date: any) => {
    this.setState({ selectedBirthday: moment(date).unix() })
  }

  componentDidMount() {
    this.handleResize(null)
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
  /**
   * Reneder component DOM
   * @return {react element} return the DOM which rendered by component
   */
  render() {
    const { classes, translate, shippingAddress } = this.props
    return (
      <div>
        {/* Edit profile dialog */}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          key='Edit-Profile'
          open={this.props.open!}
          onClose={this.props.onRequestClose}
          maxWidth='sm'
        >
          <DialogContent className={classes.dialogContentRoot}>
            {/* Banner */}
            <div style={{ position: 'relative' }}>
              <ImgCover
                width='100%'
                height='250px'
                borderRadius='2px'
                fileName={this.state.banner}
              />
              {/* <div
                className='g__circle-black'
                onClick={this.handleOpenBannerGallery}
                style={{ position: 'absolute', right: '10px', top: '10px' }}
              >
                <SvgCamera
                  style={{
                    fill: 'rgba(255, 255, 255, 0.88)',
                    transform: 'translate(6px, 6px)'
                  }}
                />
              </div> */}
            </div>
            <div className='profile__edit'>
              <EventListener target='window' onResize={this.handleResize} />
              <div className='left'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Avatar */}
                  {/* <div
                    className='g__circle-black'
                    onClick={this.handleOpenAvatarGallery}
                    style={{
                      zIndex: 1,
                      position: 'absolute',
                      left: '50%',
                      display: 'inline-block',
                      top: '52px',
                      margin: '-18px'
                    }}
                  >
                    <SvgCamera
                      style={{
                        fill: 'rgba(255, 255, 255, 0.88)',
                        transform: 'translate(6px, 6px)'
                      }}
                    />
                  </div> */}
                  <UserAvatarComponent
                    fullName={this.props.fullName}
                    fileName={this.state.avatar}
                    size={90}
                    style={this.styles.avatar}
                  />
                </div>
                <div className='info'>
                  <div className='fullName'>{this.props.fullName}</div>
                </div>
              </div>
            </div>

            {/* Edit user information box*/}
            <Paper style={this.styles.paper} elevation={1}>
              <div style={this.styles.title as any}>
                {translate!('profile.personalInformationLabel')}
              </div>
              {/* <div className={classes.box}>
                <FormControl fullWidth aria-describedby='fullNameInputError'>
                  <InputLabel htmlFor='fullNameInput'>
                    {translate!('profile.fullName')}
                  </InputLabel>
                  <Input
                    id='fullNameInput'
                    onChange={this.handleInputChange}
                    name='fullNameInput'
                    value={this.state.fullNameInput}
                  />
                  <FormHelperText id='fullNameInputError'>{this.state.fullNameInputError}</FormHelperText>
                </FormControl>
              </div> */}

              <div className={classes.box}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='address'>Address</InputLabel>
                  <Input
                    id='address'
                    name='address'
                    value={this.state.address ? this.state.address : shippingAddress ? shippingAddress.address1 : ''}
                    onChange={this.handleInputChange}
                    required
                  />
                  <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.addressInputError}
                </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.box}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='city'>City</InputLabel>
                  <Input
                    id='city'
                    name='city'
                    value={this.state.city ? this.state.city : shippingAddress ? shippingAddress.city : ''}
                    onChange={this.handleInputChange}
                    required
                  />
                  <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.cityInputError}
                </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.box}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='state'>Country</InputLabel>
                  <Input
                    id='state'
                    name='state'
                    value={this.state.state ? this.state.state : shippingAddress ? shippingAddress.country : ''}
                    onChange={this.handleInputChange}
                    required
                  />
                  <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.stateInputError}
                </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.box}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='zip'>Zip code</InputLabel>
                  <Input
                    id='zip'
                    name='zip'
                    value={this.state.zip ? this.state.zip : shippingAddress ? shippingAddress.postalCode : ''}
                    onChange={this.handleInputChange}
                    required
                  />
                  <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.zipInputError}
                </FormHelperText>
                </FormControl>
              </div>

              <div className={classes.box}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='region'>Region</InputLabel>
                  <Select
                    id='zip'
                    value={this.state.region ? this.state.region : shippingAddress ? shippingAddress.shippingRegionId : ''}
                    input={<Input name='region' id='rigion' required/>}
                    onClose={this.handleClose}
                    onOpen={this.handleOpen}
                    onChange={this.handleInputChange}
                  >
                    {this.shippingList()}
                  </Select>
                  <FormHelperText id='component-helper-text' className={classes.formHelperText}>
                  {this.state.regionSelectError}
                </FormHelperText>
                </FormControl>
              </div>
              <br />
            </Paper>
            <div className={classes.bottomPaperSpace} />
          </DialogContent>
          <DialogActions className={classes.fixedDownStickyXS}>
            <Button onClick={this.props.onRequestClose}>
              {' '}
              {translate!('profile.cancelButton')}{' '}
            </Button>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.handleUpdate}
              style={this.styles.updateButton}
            >
              {' '}
              {translate!('profile.updateButton')}{' '}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Image gallery for banner*/}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.openBanner}
          onClose={this.handleCloseBannerGallery}
        >
          <DialogTitle className={classes.dialogTitle}>
            <AppDialogTitle
              title={translate!('profile.chooseBanerDialogTitle')}
              onRequestClose={this.handleCloseBannerGallery}
            />
          </DialogTitle>
          <ImageGallery
            set={this.handleRequestSetBanner}
            close={this.handleCloseBannerGallery}
          />
        </Dialog>

        {/* Image gallery for avatar */}
        <Dialog
          PaperProps={{ className: classes.fullPageXs }}
          open={this.state.openAvatar}
          onClose={this.handleCloseAvatarGallery}
        >
          <DialogTitle className={classes.dialogTitle}>
            <AppDialogTitle
              title={translate!('profile.chooseAvatarDialogTitle')}
              onRequestClose={this.handleCloseAvatarGallery}
            />
          </DialogTitle>
          <ImageGallery
            set={this.handleRequestSetAvatar}
            close={this.handleCloseAvatarGallery}
          />
        </Dialog>
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
  dispatch: any,
  ownProps: IEditProfileComponentProps
) => {
  return {
    update: (shippingAddress: ShippingAddress) => {
      dispatch(shippingsActions.dbAddShippingAddress(shippingAddress))
    },
    onRequestClose: () => dispatch(userActions.closeEditProfile())
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
  ownProps: IEditProfileComponentProps
) => {
  const uid = state.getIn(['authorize', 'uid'])
  const shippingRegions = state.getIn(['shippings', 'shippingRegions'])
  const shippingAddress = state.getIn(['shippings', 'shippingAddress'])
  return {
    currentLanguage: getActiveLanguage(state.get('locale')).code,
    translate: getTranslate(state.get('locale')),
    open: state.getIn(['user', 'openEditProfile'], false),
    info: state.getIn(['user', 'info', uid]),
    avatarURL: state.getIn(['imageGallery', 'imageURLList']),
    shippingRegions,
    activeStep: state.getIn(['checkout', 'activeState'], 0),
    fullName: state.getIn(['authorize', 'displayName']),
    uid,
    shippingAddress,
  }
}

// - Connect component to redux store
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles as any)(EditProfileComponent as any) as any)
