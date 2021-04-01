//Navigations here
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//Screens
import {Login,ForgotPass,Signup,RestaurantArea,UserView,AddRestaurant} from './containers';

console.disableYellowBox = true;

const LoginStack = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: Signup},
    ForgotPass: {screen: ForgotPass},
  },
  {

    headerMode:'none'
  }
 )

const AppStack = createStackNavigator(
  {
    UserView: {screen: UserView},
 },
  {
    initialRouteName: 'UserView',
    headerMode: 'none',
  },
);

const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Login: LoginStack,
      App: AppStack,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);

export default RootStack;
