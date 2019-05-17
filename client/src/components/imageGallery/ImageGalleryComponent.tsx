// - Impoer react components
import {Map} from 'immutable'
import { connect } from 'react-redux'
import { getTranslate } from 'react-localize-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar  from '@material-ui/core/GridListTileBar'
import React, { Component } from 'react'
import SvgAddImage from '@material-ui/icons/AddAPhoto'
import SvgDelete from '@material-ui/icons/Delete'

import { Image } from 'core/domain/imageGallery'
import Img from 'components/img'
import * as globalActions from 'store/actions/globalActions'

import { IImageGalleryComponentProps } from './IImageGalleryComponentProps'
import { IImageGalleryComponentState } from './IImageGalleryComponentState'

const styles = (theme: any) => ({
  fullPageXs: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '100%',
      margin: 0,
      overflowY: 'auto'
    }
  }
})

/**
 * Create ImageGallery component class
 */
export class ImageGalleryComponent extends Component<IImageGalleryComponentProps, IImageGalleryComponentState> {

  styles = {
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    gridList: {
      width: 500,
      height: 450,
      overflowY: 'auto'
    },
    uploadButton: {
      verticalAlign: 'middle',
      fontWeight: 400
    },
    uploadInput: {
      cursor: 'pointer',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100%',
      opacity: 0
    },
    deleteImage: {
      marginLeft: '5px',
      cursor: 'pointer',
      color: 'white'
    },
    addImage: {
      marginRight: '5px',
      cursor: 'pointer',
      color: 'white'
    }
  }

  /**
   * Component constructor
   * @param  {object} props is an object properties of component
   */
  constructor (props: IImageGalleryComponentProps) {
    super(props)

    // Binding function to `this`
    this.close = this.close.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
    this.handleSetImage = this.handleSetImage.bind(this)
    this.handleDeleteImage = this.handleDeleteImage.bind(this)
    this.imageList = this.imageList.bind(this)
  }

  /**
   * Handle set image
   * @param  {event} evt  passed by on click event on add image
   * @param  {string} name is the name of the image
   */
  handleSetImage = (event: any, URL: string,fullPath: string) => {
    this.props.set!(URL,fullPath)
    this.close()
  }

  /**
   * Handle delete image
   * @param  {event} evt  passed by on click event on delete image
   * @param  {integer} id is the image identifier which selected to delete
   */
  handleDeleteImage = (event: any, id: string) => {
    this.props.deleteImage!(id)
  }

  componentDidMount () {
    window.addEventListener('onSendResizedImage', this.handleSendResizedImage)
  }
  componentWillUnmount () {
    window.removeEventListener('onSendResizedImage', this.handleSendResizedImage)
  }

  /**
   * Handle send image resize event that pass the resized image
   *
   *
   * @memberof ImageGallery
   */
  handleSendResizedImage = (event: any) => {
  }

  /**
   * Handle on change file upload
   */
  onFileChange = (event: any) => {
  }

  /**
   * Hide image gallery
   */
  close = () => {
    this.props.close!()
  }

  imageList = () => {
    return this.props.images!.map((image: Image, index) => {

      return (
      <GridListTile
        key={image.id!}
      >
        <div>
          <div style={{ overflowY: 'hidden', overflowX: 'auto' }}>
            <ul style={{ whiteSpace: 'nowrap', padding: '0 6px', margin: '8px 0 0 0', verticalAlign: 'bottom', flexShrink: 0, listStyleType: 'none' }}>
              <div style={{ display: 'block' }}>
                <div style={{ display: 'block', marginRight: '8px', transition: 'transform .25s' }}>
                  <li style={{ width: '100%', margin: 0, verticalAlign: 'bottom', position: 'static', display: 'inline-block' }}>
                    <Img fileName={image.URL} style={{ width: '100%', height: 'auto' }} />

                  </li>
                </div>
              </div>

            </ul>
          </div>
        </div>
        <GridListTileBar
              title={<SvgDelete style={this.styles.deleteImage as any} onClick={evt => this.handleDeleteImage(evt, image.id!)} />}
              titlePosition='top'
              actionIcon={
                <SvgAddImage style={this.styles.addImage as any} onClick={evt => this.handleSetImage(evt, image.URL,image.fullPath)} />}
              actionPosition='left'
            />
      </GridListTile>)
    })
  }

  render () {

    const {translate} = this.props
    /**
     * Component styles
     * @type {Object}
     */

    return (
      <div style={this.styles.root as any}>
        <GridList
          cellHeight={180}
          style={this.styles.gridList as any}
        >
          <GridListTile key='upload-image-gallery' >

            <div style={{ display: 'flex', backgroundColor: 'rgba(222, 222, 222, 0.52)', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>

              <input
                accept='image/*'
                style={this.styles.uploadInput as any}
                id='raised-button-file'
                onChange={this.onFileChange}
                type='file'
              />
              <label htmlFor='raised-button-file'>
                <Button variant='contained' component='span' style={this.styles.uploadButton as any}>
                  {translate!('imageGallery.uploadButton')}
        </Button>
              </label>
            </div>
          </GridListTile>
          {this.imageList()}
        </GridList>
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
const mapDispatchToProps = (dispatch: any, ownProps: IImageGalleryComponentProps) => {
  return {
    progressChange : (percent: number,status: boolean) => dispatch(globalActions.progressChange(percent, status))

  }
}

/**
 * Map state to props
 * @param  {object} state is the obeject from redux store
 * @param  {object} ownProps is the props belong to component
 * @return {object}          props of component
 */
const mapStateToProps = (state: Map<string, any>) => {
  const uid = state.getIn(['authorize', 'uid'])
  const currentUser = state.getIn(['user', 'info', uid])
  return {
    translate: getTranslate(state.get('locale')),
    images: state.getIn(['imageGallery', 'images']),
    avatar: currentUser ? currentUser.avatar : ''

  }
}

// - Connect component to redux store
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ImageGalleryComponent as any) as any)
