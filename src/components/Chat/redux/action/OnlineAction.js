import {OFFLINE_PARTNER, OFFLINE_USER, ONLINE_PARTNER, ONLINE_USER} from '../type/OnlineTypes'
export const getOnlineUser = (data) => {
  return {
    type: ONLINE_USER,
    payload: data,
  }
}
export const getOfflineUser = (data) => {
  return {
    type: OFFLINE_USER,
    payload: data,
  }
}
export const getOnlinePartner = (data) => {
  return {
    type: ONLINE_PARTNER,
    payload: data,
  }
}
export const getOfflinePartner = (data) => {
  return {
    type: OFFLINE_PARTNER,
    payload: data,
  }
}
