import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import AppIntro from 'react-native-app-intro'
import { connect } from 'react-redux'
import { Actions as NavigationActions } from 'react-native-router-flux'

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
    padding: 15,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

class IntroScreen extends Component {

  render() {
    return (
      <AppIntro
        doneBtnLabel='Pronto!'
        skipBtnLabel='Pular'
        nextBtnLabel='Próximo'
        onDoneBtnClick={NavigationActions.login}
        >
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={10}><Text style={styles.text}>Que tal economizar</Text></View>
          <View level={15}><Text style={styles.text}>compartilhando</Text></View>
          <View level={8}><Text style={styles.text}>preços da sua região?</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={-10}><Text style={styles.text}>Simples!</Text></View>
          <View level={5}><Text style={styles.text}>Ligue o GPS do seu celular</Text></View>
          <View level={20}><Text style={styles.text}>Busque o produto que você quer</Text></View>
        </View>
        <View style={[styles.slide,{ backgroundColor: '#fa931d' }]}>
          <View level={8}><Text style={styles.text}>Economize!</Text></View>
          <View level={0}><Text style={styles.text}>Economize!</Text></View>
          <View level={-10}><Text style={styles.text}>Economize!</Text></View>
        </View>
        <View style={[styles.slide, { backgroundColor: '#a4b602' }]}>
          <View level={5}><Text style={styles.text}>Compr!</Text></View>
          <View level={10}><Text style={styles.text}>Compr!</Text></View>
          <View level={15}><Text style={styles.text}>Compr!</Text></View>
        </View>
      </AppIntro>
    );
  }
}

export default connect()(IntroScreen)