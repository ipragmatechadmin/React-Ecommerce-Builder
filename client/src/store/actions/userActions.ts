// - Import react components
import { Map } from 'immutable'

import { Profile } from 'src/core/domain/users'
import { UserActionType } from 'constants/userActionType'

/* _____________ CRUD State _____________ */

/**
 * Add user information
 */
export const addUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.ADD_USER_INFO,
    payload: { uid, info }
  }
}

/**
 * Add people information
 */
export const addPeopleInfo = (infoList: Map<string, Profile>) => {
  return {
    type: UserActionType.ADD_PEOPLE_INFO,
    payload: infoList
  }
}

/**
 * Update user information
 */
export const updateUserInfo = (uid: string, info: Profile) => {
  return {
    type: UserActionType.UPDATE_USER_INFO,
    payload: { uid, info }
  }
}

export const clearAllData = () => {
  return {
    type: UserActionType.CLEAR_ALL_DATA_USER
  }
}

/**
 * Open edit profile
 */
export const openEditProfile = () => {
  return {
    type: UserActionType.OPEN_EDIT_PROFILE
  }

}

/**
 * Close edit profile
 */
export const closeEditProfile = () => {
  return {
    type: UserActionType.CLOSE_EDIT_PROFILE
  }

}

/**
 * Set profile posts has more data to show
 */
export const hasMoreDataPeople = () => {
  return {
    type: UserActionType.HAS_MORE_DATA_PEOPLE
  }

}

/**
 * Set profile posts has not data any more to show
 */
export const notMoreDataPeople = () => {
  return {
    type: UserActionType.NOT_MORE_DATA_PEOPLE
  }

}

/**
 * Set last page request of profile posts
 */
export const requestPagePeople = (page: number) => {
  return {
    type: UserActionType.REQUEST_PAGE_PEOPLE,
    payload: { page}
  }

}

/**
 * Set last user identification of find people page
 */
export const lastUserPeople = (lastUserId: string) => {
  return {
    type: UserActionType.LAST_USER_PEOPLE,
    payload: { lastUserId}
  }

}
