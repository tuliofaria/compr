import { put, select, call } from 'redux-saga/effects'
import FacebookActions from '../Redux/FacebookRedux'
import { is } from 'ramda'

// exported to make available for tests
//export const selectTemperature = state => state.temperature.temperature

import FBSDK  from 'react-native-fbsdk'

const { LoginManager, AccessToken } = FBSDK

// process STARTUP actions
export function * facebookLogin () {
  //const temp = yield select(selectTemperature)
  // only fetch new temps when we don't have one yet
  //if (!is(Number, temp)) {
  //  yield put(TemperatureActions.temperatureRequest('San Francisco'))
  //}
  //yield put(FacebookActions.loginRequest())

  console.log('bateu no saga');
  LoginManager.logInWithReadPermissions(['public_profile','email']).then(
    function(result) {
    	console.log(result)
      if (result.isCancelled) {
        put(FacebookActions.fbLoginFailure())
      } else {
      	console.log(result)
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
    },function(error) {
    	console.log(error)
      alert('Login fail with error: ' + error);
    }
  )
  console.log('saiu do saga');
  //const response = call(LoginManager.logInWithReadPermissions, ['public_profile','email'])
  //console.log("response", response)
}
