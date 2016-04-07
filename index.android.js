/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  ToolbarAndroid,
  TouchableHighlight,
  BackAndroid
} from 'react-native';
var _navigator; // we fill this up upon on first navigation.

BackAndroid.addEventListener('hardwareBackPress', ()=>{
  if (_navigator.getCurrentRoutes.length===1) {
    return false;
  }
  _navigator.pop();
  return true;
})

class Navigation extends Component{
  render(){
    return(
        <Navigator style={styles.container}
          initialRoute = {{'id':'first'}}
          renderScene = {this.navigatorRenderScene}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }}
          />
      );
  }
  navigatorRenderScene(route,navigator){
    _navigator = navigator;
    switch (route.id) {
      case 'first':
        return (<First navigator={navigator} title='First Screen'/>);
      case 'second':
        return (<Second navigator={navigator} title='Second Screen'/>);
    }

  }
}

class First extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Text>Loaded First Screen here</Text>
        <ToolbarAndroid
          style={styles.toolbar}
          title="Wow, toolbar on First"
          // title={this.props.title}
          />
          <TouchableHighlight
            onPress={this.navSecond.bind(this)}>
            <Text>Navigate to Second screen</Text>
          </TouchableHighlight>
      </View>
      )
  }
  navSecond(){
    this.props.navigator.push({
      'title':'second',
      'component':Second
    })
  }
}

class Second extends Component{
  render(){
    return(
      <View style={styles.container}>
      <Text> This is the second screen</Text>
      </View>
      )
  }
}

class MainApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Shake or press menu button for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#999999',
    marginBottom: 5,
  },
  toolbar: {
    // color: '#FFF0F0',
    height: 20,
  }
});

AppRegistry.registerComponent('DictionaryApp', () => Navigation);
