import React from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar, AsyncStorage, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { moderateScaleVertical, textScale } from '../containers/Responsive/index';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Colors } from '../config';
import { connect } from 'react-redux';

class HeaderCustom extends React.Component {
  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };
  userLogout = () => {
    this.hideMenu()
    setTimeout(() => {
      this.props.saveUserInRedux(null)
    }, 1000);
    this.props.navigation.navigate("Login")
  }
  editProfile = () => {
    this.hideMenu()
    this.props.navigation.navigate("EditProfile")
  }
  showMenu = () => {
    this._menu.show();
  };
  render() {
    const { navigation, title, back, rightIcon, mode, user: { name } } = this.props;
    return (
      <View style={{ width: '100%', backgroundColor: Colors.primary }}>
        <StatusBar barStyle="light-content" translucent />
        <View style={{ marginTop: getStatusBarHeight(), padding: 10,paddingHorizontal:15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <Text style={{ fontSize: textScale(22), color: 'white' }}>{`Welcome, ${name}!`}</Text>
            <Menu
              ref={this.setMenuRef}
              button={<Icon name="ellipsis-vertical-sharp" size={22} color='white' onPress={this.showMenu}/>}
            >
              <MenuItem onPress={this.editProfile}>Edit Profile</MenuItem>
              <MenuItem onPress={this.userLogout}>Logout</MenuItem>
              <MenuDivider />
            </Menu>
        </View>
      </View>
    )
  }

}

function mapState({ reducer: { user } }) {
  return ({
    user,
  })
}
function mapDispatch(dispatch) {
  return ({
    saveUserInRedux: (user) => {
      dispatch({ type: "SAVE_USER", payload: user })
    }
  })
}
export default connect(mapState, mapDispatch)(HeaderCustom)

const styles = StyleSheet.create({

})