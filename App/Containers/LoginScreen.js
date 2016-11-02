import React, {PropTypes} from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  LayoutAnimation,
  StyleSheet
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Metrics, Colors } from '../Themes'
//import LoginActions from '../Redux/LoginRedux'

import FacebookActions from '../Redux/FacebookRedux'

import { Actions as NavigationActions } from 'react-native-router-flux'
import Dimensions from 'Dimensions'
import Animated from 'Animated'
import Icon from 'react-native-vector-icons/FontAwesome'

import FBSDK  from 'react-native-fbsdk'

const { LoginManager, AccessToken } = FBSDK

// I18n
import I18n from 'react-native-i18n'

class LoginScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      username: 'reactnative@infinite.red',
      password: 'password',
      visibleHeight: Metrics.screenHeight,
      topLogo: { width: Metrics.screenWidth }
    }
    this.isAttempting = false


    this.loginWithFB = this.loginWithFB.bind(this)
  }

  componentWillReceiveProps (newProps) {
    this.forceUpdate()
    // Did the login attempt complete?
    /*if (this.isAttempting && !newProps.fetching) {
      NavigationActions.pop()
    }*/
  }

  componentWillMount () {
    // Using keyboardWillShow/Hide looks 1,000 times better, but doesn't work on Android
    // TODO: Revisit this if Android begins to support - https://github.com/facebook/react-native/issues/3468
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide)
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    let newSize = Metrics.screenHeight - e.endCoordinates.height
    this.setState({
      visibleHeight: newSize,
      topLogo: {width: 100, height: 70}
    })
  }

  keyboardDidHide = (e) => {
    // Animation types easeInEaseOut/linear/spring
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      visibleHeight: Metrics.screenHeight,
      topLogo: {width: Metrics.screenWidth}
    })
  }

  handlePressLogin = () => {
    const { username, password } = this.state
    this.isAttempting = true
    // attempt a login - a saga is listening to pick it up from here.
    //this.props.attemptLogin(username, password)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  loginWithFB(){
    //this.props.loginWithFB()
    console.log('loginWithFB from screenaaaaaaa')
    debugger;
      LoginManager.logInWithReadPermissions(['public_profile','email']).then(
        function(result) {
          console.log(result)
          alert(1)
          if (result.isCancelled) {
            put(FacebookActions.fbLoginFailure())
          } else {
            console.log(result.toString())
            alert('Login success with permissions: '
              +result.toString()+'-----'
              +result.grantedPermissions.toString());
            AccessToken.getCurrentAccessToken().then(
                    (data) => {
                      alert(data.accessToken.toString())
                      console.log(data)
                    })
          }
        },function(error) {
          console.log(error)
          alert('Login fail with error: ' + error);
        }
      )
  }

  render () {
    const { username, password } = this.state
    //const { fetching } = this.props
    //const editable = !fetching
    const editable = false
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    return (
      
        <Image style={Styles.containerLogin} source={Images.backgroundLogin} >
          <ScrollView contentContainerStyle={Styles.container}>
            <View style={Styles.centered}>
              <Image source={Images.clearLogo} style={Styles.logo} />
            </View>
            <View style={Styles.facebookButtonWrapper}>
              <Icon.Button name='facebook' style={Styles.facebookButton} backgroundColor={Colors.facebook} onPress={ this.loginWithFB }>
                <Text style={Styles.facebookButtonText} >
                  Entrar com seu Facebook
                </Text>
              </Icon.Button>
            </View>
          </ScrollView>
        </Image>
      
    )
  }
}
/*
<View style={styles.section}>
          <Animated.Image style={this.fadeIn(0)} source={require('../assets/logo.png')} />
        </View>
        <View style={styles.section}>
          <Animated.Text style={[styles.h1, this.fadeIn(700, -20)]}>
            economize
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -10}, this.fadeIn(700, 20)]}>
            compartilhando
          </Animated.Text>
          <Animated.Text style={[styles.h1, {marginTop: -10}, this.fadeIn(700, 20)]}>
            preços
          </Animated.Text>
        </View>
        <Animated.View style={[styles.section, styles.last, this.fadeIn(2500, 20)]}>
          <Text style={styles.loginComment}>
            Entre com o Facebook e também ajude seus amigos a economizar.
          </Text>
          <LoginButton source='First screen' navigator={this.props.navigator} />
        </Animated.View>*/
LoginScreen.propTypes = {
  dispatch: PropTypes.func,
  fetching: PropTypes.bool,
  attemptLogin: PropTypes.func
}

const mapStateToProps = state => {
  return {
    //fetching: state.login.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    loginWithFB: () => dispatch(FacebookActions.fbLoginRequest()),
  }
}

const scale = Dimensions.get('window').width / 375

var styless = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 26,
    // Image's source contains explicit size, but we want
    // it to prefer flex: 1
    width: undefined,
    height: undefined
  },
  section: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  last: {
    justifyContent: 'flex-end'
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: Math.round(44 * scale),
    color: '#FFF', /*F8Colors.lightText,*/
    backgroundColor: 'transparent'
  },
  h2: {
    textAlign: 'center',
    fontSize: 17,
    color: '#FFF', // F8Colors.darkText,
    marginVertical: 20
  },
  h3: {
    fontSize: 12,
    textAlign: 'center',
    color: '#FFF', // F8Colors.lightText,
    letterSpacing: 1
  },
  loginComment: {
    marginBottom: 14,
    fontSize: 12,
    color: '#FFF', // F8Colors.darkText,
    textAlign: 'center'
  },
  skip: {
    position: 'absolute',
    right: 0,
    top: 20,
    padding: 15
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
