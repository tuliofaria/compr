import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  fbLoginRequest: null,
  fbLoginSuccess: [],
  fbLoginFailure: null
})

export const FacebookTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  isLoggedIn: false,
  name: null,
  error: null
})

/* ------------- Reducers ------------- */

// request login
export const request = (state) =>
  state.merge({ isLoggedIn: false })

// successful temperature lookup
export const success = (state, action) => {
  const { name, picture } = action
  return state.merge({ isLoggedIn: true, name })
}

// failed to get the temperature
export const failure = state =>
  state.merge({ isLoggedIn: false, error: true, name: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.FB_LOGIN_REQUEST]: request,
  [Types.FB_LOGIN_SUCCESS]: success,
  [Types.FB_LOGIN_FAILURE]: failure
})
