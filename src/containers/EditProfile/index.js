import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Touchable, TextInput } from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { textScale, moderateScaleVertical } from '../Responsive/index';
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux';
import { Loader, Colors, Icon, CustomTextInput } from '../../config';
import SplashScreen from 'react-native-splash-screen';
import { getStatusBarHeight } from 'react-native-status-bar-height';


class UserView extends React.Component {
  state = {
    loader: false,
    email:"",
    name:"",
    phone:"",

  }
  updateUser = () =>{
    this.setState({loader:true})
    const { name,phone } = this.state

    const {user,saveUserInRedux} = this.props;
    firestore().collection("users").doc(user.uid)
    .update({
      name,phone
    })
    .then(()=>{
      const newUser = {...user};
      newUser.name = name
      newUser.phone = phone
      saveUserInRedux(newUser)
      alert("Values Updated")
      this.setState({loader:false})
    })
    .catch((err)=>{
      alert(err.message)
      this.setState({loader:false})
    })
  }
  componentDidMount() {
    const {user:{name,email,phone}} = this.props;
    this.setState({name,email,phone})
  }
  
  render() {

    const { navigation,user } = this.props
    const { loader, email,name,phone } = this.state
    const disabled = phone === user.phone && name === user.name 
    return (
      <View style={styles.main}>
        <Loader isLoading={loader} />
        <View style={{ width: '100%', backgroundColor: Colors.primary }}>
        <View style={{ marginTop: getStatusBarHeight(), padding: 10,paddingHorizontal:0, flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
          onPress={()=>this.props.navigation.goBack()}
          style={{paddingHorizontal:10}}>
            <Icon name="chevron-back" color='white' style={{fontSize: textScale(24),}} />
          </TouchableOpacity>
          <Text style={{ fontSize: textScale(22), color: 'white' }}>{`Edit Profile`}</Text>

        </View>
      </View>
      <View style={{flex:1,alignItems:'center'}}>
      <CustomTextInput
        placeholder="Enter Name"
        autoCapitalize="none"
        placeholderTextColor="grey"
        style={{paddingLeft:17,fontSize:textScale(16),width:'80%',height:44,borderRadius:10,borderWidth:1,backgroundColor:'white',marginVertical:20}}
        underlineColorAndroid="transparent"
        value={name} onChangeText={(name)=> this.setState({name})}
      />
      <CustomTextInput
        placeholder="Enter Phone"
        keyboardType="phone-pad"
        placeholderTextColor="grey"
        style={{paddingLeft:17,fontSize:textScale(16),width:'80%',height:44,borderRadius:10,borderWidth:1,backgroundColor:'white'}}
        underlineColorAndroid="transparent"
        value={phone} onChangeText={(phone)=> this.setState({phone})}
      />
      <CustomTextInput
      editable={false}
        placeholder="Enter Email"
        autoCapitalize="none"
        placeholderTextColor="grey"
        style={{paddingLeft:17,color:"grey",fontSize:textScale(16),width:'80%',height:44,borderRadius:10,borderWidth:1,backgroundColor:'white',marginVertical:20}}
        underlineColorAndroid="transparent"
        value={email}
      />
      <TouchableOpacity
                disabled={disabled}
                   style={{width:'80%',backgroundColor:disabled?"grey":Colors.primary,paddingVertical:10,borderRadius:10}}
                   onPress={this.updateUser} >
                  <Text style={{alignSelf:'center',fontSize:textScale(16),color:"white"}}>Update</Text>
        </TouchableOpacity>
      </View>

        
       
      </View>

    );
  }
}

function mapState(state) {
  return ({
    user: state.reducer.user
  })
}
function mapDispatch(dispatch){
  return({
    saveUserInRedux: (user) => {
      dispatch({type:"SAVE_USER",payload:user})
    }
  })
}
export default connect(mapState,mapDispatch)(UserView)

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
