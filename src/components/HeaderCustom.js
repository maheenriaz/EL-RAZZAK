import React from 'react';
import {View, Text, StyleSheet, Dimensions, StatusBar,AsyncStorage,Alert} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {moderateScaleVertical, textScale} from '../containers/Responsive/index';
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

class HeaderCustom extends React.Component {
  _menu = null;
 
  setMenuRef = ref => {
    this._menu = ref;
  };
 
  hideMenu = (value) => {
    if(value === 'true'){
      this.props.navigation.navigate("Login")
    }
    else{
      this.userLogout()
    }
    this._menu.hide();
  };
  userLogout = () => {
    auth().signOut()
    .then(()=>{
       AsyncStorage.removeItem('list',()=>{
        this.setState({logout:false});
         console.log("deleted")
       })
       
      this.props.navigation.navigate("Login")
    }).catch((err)=>alert(JSON.stringify(err)))
  }
  showMenu = () => {
    this._menu.show();
  };
 render(){
    const {navigation,title,back,rightIcon,mode,onPressBack} = this.props;
    return (
      <View style={{width:'100%'}}>
      <StatusBar barStyle="dark-content" translucent/>
      <View style={{marginTop:getStatusBarHeight(),paddingVertical:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
      <View style={{position:'absolute',left:10}}>
      {this.props.menu ? <Menu
          ref={this.setMenuRef} 
          button={ <Icon  name="ellipsis-vertical-sharp" size={17} color='#037276' style={{marginLeft:moderateScaleVertical(10)}} onPress={this.showMenu} />}
          >
          <MenuItem onPress={this.hideMenu}>Logout</MenuItem>
          <MenuDivider />
        </Menu>
        :
        <TouchableOpacity onPress={onPressBack}><Icon name="ios-arrow-back" size={22} family="Ionicons" /></TouchableOpacity>}  
        </View>
      <Text style={{fontSize:textScale(20)}}>{title ? title : "Restaurant Menu"}</Text>
       <View/>
       </View>
   </View>
    )
  }
  
}
    
export default HeaderCustom

const styles = StyleSheet.create({
  
})