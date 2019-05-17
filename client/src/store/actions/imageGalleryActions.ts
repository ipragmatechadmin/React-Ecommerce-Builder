// - Import react componetns
import { Image } from 'src/core/domain/imageGallery'
import { ImageGalleryActionType } from 'constants/imageGalleryActionType'

/* _____________ CRUD State _____________ */

/**
 * Add image list to image gallery
 * @param {Image[]} images is an array of images
 */
export const addImageList = (images: Image[]) => {
  return { type: ImageGalleryActionType.ADD_IMAGE_LIST_GALLERY,payload: images }
}

/**
 * Add image to image gallery
 * @param {Image} image
 */
export const addImage = (image: Image) => {
  return { type: ImageGalleryActionType.ADD_IMAGE_GALLERY, payload: image }
}

/**
 * Delete an image
 * @param  {string} id is an image identifier
 */
export const deleteImage = (id: string) => {
  return { type: ImageGalleryActionType.DELETE_IMAGE, payload: id }

}

/**
 * Delete an image
 */
export const setImageURL = (name: string, url: string) => {
  return {
    type: ImageGalleryActionType.SET_IMAGE_URL,
    payload: { name, url }
  }

}

/**
 * Clear all data in image gallery store
 */
export const clearAllData = () => {
  return {
    type: ImageGalleryActionType.CLEAT_ALL_DATA_IMAGE_GALLERY
  }
}

/**
 * Send image request
 */
export const sendImageRequest = (name: string) => {
  return {
    type: ImageGalleryActionType.SEND_IMAGE_REQUEST,
    payload: name
  }

}
