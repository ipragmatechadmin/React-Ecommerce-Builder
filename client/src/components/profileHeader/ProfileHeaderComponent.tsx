// - Import react components
import {Map} from 'immutable'
import { Parallax, Background } from 'react-parallax'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import EventListener from 'react-event-listener'
import React, { Component } from 'react'

import ImgCover from 'components/imgCover'
import UserAvatar from 'components/userAvatar'
import config from 'src/config'
import * as userActions from 'store/actions/userActions'

import { IProfileHeaderComponentProps } from './IProfileHeaderComponentProps'
import { IProfileHeaderComponentState } from './IProfileHeaderComponentState'
import Button from '@material-ui/core/Button'
/**
 * Create component class
 */
export class ProfileHeaderComponent extends Component<IProfileHeaderComponentProps, IProfileHeaderComponentState> {

    /**
     * Component constructor
     * @param  {object} props is an object properties of component
     */
  constructor (props: IProfileHeaderComponentProps) {
    super(props)

        /**
         * Defaul state
         */
    this.state = {
            /**
             * If it's true , the window is in small size
             */
      isSmall: false

    }

        // Binding functions to `this`

  }
    /**
     * Handle resize event for window to change sidebar status
     * @param  {event} evt is the event is passed by winodw resize event
     */
  handleResize = () => {

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

  componentDidMount () {
    this.handleResize()
  }

    /**
     * Reneder component DOM
     * @return {react element} return the DOM which rendered by component
     */
  render () {
    const {translate, isAuthedUser} = this.props
    const styles = {
      avatar: {
        border: '2px solid rgb(255, 255, 255)'
      },
      iconButton: {
        fill: 'rgb(255, 255, 255)',
        height: '24px',
        width: '24px'

      },
      iconButtonSmall: {
        fill: 'rgb(0, 0, 0)',
        height: '24px',
        width: '24px'
      },

      editButton: {

        marginLeft: '20px'

      },
      editButtonSmall: {

        marginLeft: '20px',
        color: 'white',
        fill: 'blue'

      },
      aboutButton: {
        color: 'white'
      },
      aboutButtonSmall: {
        color: 'black'
      }
    }

    return (

            <div>
                <Parallax strength={500} className='profile__parallax' bgStyle={{ position: 'relative' }}>
                    <Background>
                        <ImgCover width='100%' height='510px' borderRadius='2px'
                        fileName={this.props.banner || config.settings.defaultProfileCover} />
                    </Background>

                </Parallax>
                <div className={this.state.isSmall ? 'profile__head-info-s' : 'profile__head-info'}>
                    <EventListener
                        target='window'
                        onResize={this.handleResize}
                    />
                    <div className='left'>
                        {/* User avatar*/}
                        <div style={{ display: 'flex', justifyContent: 'center' }}><UserAvatar fullName={this.props.fullName || ' '} fileName={this.props.avatar} size={60} style={styles.avatar} /></div>
                        <div className='info'>
                            <div className='fullName'>
                                {this.props.fullName}
                            </div>
                            <div className='tagLine'>
                               {this.props.tagLine}
                            </div>
                            {/*<div className='followers'>
                                {this.props.followerCount} Followers
                </div>*/}
                        </div>
                    </div>
                    <div className='right'>
                        {isAuthedUser ? (<div style={this.state.isSmall ? styles.editButtonSmall : styles.editButton}>
                        <Button variant='contained' onClick={this.props.openEditor}>
                        {translate!('profile.editProfileButton')}
                        </Button>
                        </div>) : ''}
                    </div>
                </div>
                {/* {isAuthedUser && editProfileOpen ? (<EditProfile
                    avatar={this.props.avatar}
                    banner={this.props.banner}
                    fullName={this.props.fullName}
                />) : ''} */}
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
const mapDispatchToProps = (dispatch: any, ownProps: IProfileHeaderComponentProps) => {
  return {
    openEditor: () => dispatch(userActions.openEditProfile())
  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>, ownProps: IProfileHeaderComponentProps) => {

  return {
    translate: getTranslate(state.get('locale')),
    editProfileOpen: state.getIn(['user', 'openEditProfile'])
  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(ProfileHeaderComponent as any)
