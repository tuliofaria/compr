import FBSDK  from 'react-native-fbsdk'

const {
  LoginManager,
  AccessToken
} = FBSDK;

const create = () => {
  
  const login = () => LoginManager.logInWithReadPermissions(['public_profile','email'])
  const getAccessToken = () => AccessToken.getCurrentAccessToken()

  return {
    login,
    getAccessToken
  }
}

export default {
  create
}
