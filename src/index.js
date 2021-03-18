//Navigations here
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//Screens
import {Splash,Login,Responsive,Signup,RestaurantArea,UserView,AddRestaurant} from './containers';

console.disableYellowBox = true;
const SplashStack = createStackNavigator(
  {
    Splash: {screen: Splash},
  },

  {
    initialRouteName: 'Splash',
    headerMode: 'none',
  },
);
const LoginStack = createStackNavigator(
  {
    Login: {screen: Login,
      navigationOptions: {
        headerShown: false
      },
    },
 })
 const SignupStack = createStackNavigator(
  {
    Signup: {screen: Signup,
      navigationOptions: {
        headerShown: false
      },
    },
 })
const MainStack = createStackNavigator(
  {
  
    RestaurantArea: {screen: RestaurantArea},
    UserView: {screen: UserView},
    AddRestaurant: {screen: AddRestaurant},
 },
  {
    initialRouteName: 'RestaurantArea',
    headerMode: 'none',
  },
);
// const authStack = createStackNavigator(
//   {
//     Login: {screen: Login},
//     Verify: {screen: Verify},
//   },

//   {
//     initialRouteName: 'Verify',
//     headerMode: 'none',
//   },
// );

// const AppNavigator = createStackNavigator(
//   {
//     // TabView: {screen: TabView},
//     // Leaderboard: {screen: Leaderboard},
//   },

//   {
//     initialRouteName: 'MainStack',
//     headerMode: 'none',
//   },
// );

const RootStack = createAppContainer(
  createSwitchNavigator(
    {
      Splash: SplashStack,
      Login: LoginStack,
      Signup: SignupStack,
      // Auth: authStack,
      // Index: indexStack,
      App: MainStack,
    },
    {
      initialRouteName: 'Splash',
    },
  ),
);

export default RootStack;
