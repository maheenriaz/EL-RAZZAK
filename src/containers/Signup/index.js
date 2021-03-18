import React from 'react';
import {View, Text, StyleSheet, Linking,TouchableOpacity,TextInput,ActivityIndicator,Image,KeyboardAvoidingView,StatusBar,AsyncStorage} from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import DropDownPicker from 'react-native-dropdown-picker';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
 
class Signup extends React.Component {
    state={
        email:'',
        password:'',
        name:'',
        address:'',
        phone:'',
        repass:'',
        current_user: 'user',
        data:null,
        loader:false,
       }
       userSignup = () =>{
        const {name,password,phone,address,email,repass,current_user} = this.state
        if(password !== repass) return alert("Passwords doesn't match")
        this.setState({loader:true})
        auth().createUserWithEmailAndPassword(email, password)
        .then(async(user)=>{
           let details = {
            email,
            uid : user.user.uid,
            name ,
            phone ,
            address,
            password,
            current_user
           }
    
          firestore().collection("users").doc(user.user.uid)
           .set({
               details
           })                                                                  
          .then((data)=>{
            console.log(data)
             this.setState({loader:false})
             this.props.navigation.navigate("Login")
          })
              .catch((err)=>{
                console.log(err.message)
                this.setState({loader:false})
              })
            } ) 
            .catch((err)=>{
              this.setState({loader:false})
              Alert.alert(err.message)
        })
      }  
       render() {
        const {loader} = this.state
        return (
          <View style={styles.main}>
             {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
             }
              <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#2d9bf2" translucent = {true}/>
             <KeyboardAvoidingView  style={{flex: 1}}  behavior={'height'}  >
              <View style={{marginTop:moderateScaleVertical(70),alignSelf:'center'}}>
                  <Text style={{fontSize:textScale(27),color:'#2d9bf2',fontWeight:'bold'}}>EL-RAZZAK</Text>
              </View>
                <View style={{alignSelf:'center',marginTop:moderateScaleVertical(38)}}>
                <View style={{flexDirection:'row'}}>
                    <TextInput
                      icon="Signup"
                      mode="contained"
                      placeholder="Enter Name"
                      placeholderTextColor="grey"
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.name} onChangeText={(text)=> this.setState({name:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row',marginVertical:moderateScaleVertical(10)}}>
                    <TextInput
                      icon="Signup"
                      mode="contained"
                      placeholder="Enter Email"
                      placeholderTextColor="grey"
                      autoCapitalize="none"
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.email} onChangeText={(text)=> this.setState({email:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <TextInput
                      icon="Signup"
                      mode="contained"
                      placeholder="Enter Phone Number"
                      placeholderTextColor="grey"
                      keyboardType={'phone-pad'}
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.phone} onChangeText={(text)=> this.setState({phone:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row',marginVertical:moderateScaleVertical(10)}}>
                    <TextInput
                      icon="Signup"
                      mode="contained"
                      placeholder="Enter Address"
                      placeholderTextColor="grey"
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.address} onChangeText={(text)=> this.setState({address:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row'}}>
                   <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Enter Password"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                   style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                   secureTextEntry={true}
                   value={this.state.password} onChangeText={(text)=> this.setState({password:text})}
                  />
                    </View>
                    <View style={{flexDirection:'row',marginTop:12}}>
                   <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Enter Re-Enter Password"
                    placeholderTextColor="grey"
                    autoCapitalize="none"
                   style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                   secureTextEntry={true}
                   value={this.state.repass} onChangeText={(text)=> this.setState({repass:text})}
                  />
                    </View>
               </View>  
               <View style={{marginTop:12}}>
                  <DropDownPicker
                    items={[
                        {label: 'User', value: 'user'},
                        {label: 'Restaurant Owner', value: 'owner'},
                    ]}
                    defaultValue={this.state.data}
                    containerStyle={{height: 40,width:274,alignSelf:'center',borderRadius:96}}
                    style={{backgroundColor: 'white',borderColor:'#5B5B5B',borderRadius:96,color:'grey'}}
                    itemStyle={{
                        justifyContent: 'flex-start'
                    }}                 
                    placeholder="Who are you?"
                    dropDownStyle={{backgroundColor: 'white',borderRadius:96}}
                    onChangeItem={item => this.setState({
                        current_user: item.value
                    })}
                />
                    </View>

               <View style={{marginTop:moderateScaleVertical(30),width:270,color:'green',alignSelf:'center'}}>
                   <TouchableOpacity  onPress={this.userSignup} >
                            <View style={{borderWidth:1,borderRadius:30,borderColor:'#2d9bf2',height:37}}>
                                <Text style={{alignSelf:'center',marginTop:moderateScaleVertical(8),fontSize:textScale(17),color:"grey"}}>Signup</Text>
                                </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> this.props.navigation.navigate("Login")}>
                       <Text style={{alignSelf:'center',fontSize:textScale(15),fontWeight:'bold',marginVertical:moderateScaleVertical(8),color:'#2d9bf2'}}>Already have an account? Login</Text>
                     </TouchableOpacity> 
              </View>
               </KeyboardAvoidingView>
          </View>
        );
      }
}
    
export default Signup

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent:'flex-start',
    backgroundColor:'white'
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
