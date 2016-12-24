import { push } from 'react-router-redux'
import { setCookie } from '../cookie/cookieActions'

export const redirect = (path) => {
  return (dispatch) => {
    setCookie({ redirect: path })
    dispatch(push(path))
  }
}

