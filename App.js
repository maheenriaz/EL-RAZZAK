import React, {Component} from 'react';
import Root from './src';
import NavigationService from './src/config/NavigationService';
import {KeyboardAvoidingView, Platform, StatusBar, View} from 'react-native';
import { Provider } from 'react-redux';
import {store} from './src/redux';
// import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  // componentDidMount() {
  //   SplashScreen.hide();
  // }
  render() {
    return (
      <Wrapper>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Provider store={store}>
        <Root
          ref={(navigatorRef) => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
        </Provider>
      </Wrapper>
    );
  }
}

export default App;

function Wrapper({children}) {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior="padding"
      >
        {children}
      </KeyboardAvoidingView>
    );
  return <View style={{flex: 1}}>{children}</View>;
}