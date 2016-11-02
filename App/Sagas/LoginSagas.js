import { put, call } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

import FBSDK  from 'react-native-fbsdk'

const { LoginManager, AccessToken } = FBSDK

    /*LoginManager.logInWithReadPermissions(['public_profile','email']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          //alert('Login success with permissions: '
          //  +result.toString()+'-----'
          //  +result.grantedPermissions.toString());
          AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    alert(data.accessToken.toString())
                    console.log(data)
                  })
          //navigator.push({ title: 'logged', index: 1 })
        }
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    )*/

// attempts to login
export function * login ({ username, password }) {
  console.log('bateu no saga');
  const response = yield call(LoginManager.logInWithReadPermissions, ['public_profile','email'])
  console.log("response", response)

  /*if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(username))
  }*/
}
