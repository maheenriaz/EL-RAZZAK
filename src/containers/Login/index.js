import React from 'react';
import {View, Text, StyleSheet, Linking,TouchableOpacity,TextInput,ActivityIndicator,Image,KeyboardAvoidingView,StatusBar,AsyncStorage,Alert} from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
 
class Login extends React.Component {
    state={
        email:'',
        password:'',
        loader:false,
        checkUser:true,
       }
       userLogin(email,password){
        this.setState({loader:true})
        auth().signInWithEmailAndPassword(email, password)
            .then((user)=>{
              this.setState({loader:false})
               firestore().collection("users").doc(user.user.uid)
                .onSnapshot(async(doc) => {
                  if(doc.data().details.current_user=="owner")
                  {
                       console.log(doc.data().details)
                       await AsyncStorage.setItem('list',JSON.stringify(doc.data().details))
                       this.props.navigation.navigate("RestaurantArea", JSON.stringify(doc.data().details))     
                  }
                  else {
                    console.log(doc.data().details)
                    await AsyncStorage.setItem('list',JSON.stringify(doc.data().details))
                    this.props.navigation.navigate("UserView", JSON.stringify(doc.data().details))     
                 }
                });
           }) 
        .catch((err)=>{
            Alert.alert(err.message)
            this.setState({loader:false})
        })
    }
    componentDidMount=async()=>{
     await AsyncStorage.getItem('list').then((data) => {
        if(data || data != null){
           const mydata = JSON.parse(data);
          if(mydata.current_user=="owner"){
            this.props.navigation.navigate("RestaurantArea")
            this.setState({checkUser:false})
          }
          else{
            this.props.navigation.navigate("UserView")
            this.setState({checkUser:false})
          }
           
        }
        else{
          this.setState({checkUser:false})
        }
    });
    }
       render() {
        const {loader,checkUser} = this.state
        if(checkUser)
        return  <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
        <ActivityIndicator size="large" color="black"  />
        </View>
        return (
          <View style={styles.main}>
             {loader ? <View style={{position:"absolute",zIndex:99,justifyContent:'center',top:0,bottom:0,right:0,left:0,backgroundColor:'rgba(0,0,0,0.5)'}}>
              <ActivityIndicator size="large" color="black"  />
              </View>:null 
             }
              <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#2d9bf2" translucent = {true}/>
             <KeyboardAvoidingView  style={{flex: 1}}  behavior={'height'}  >
              <View style={{marginTop:moderateScaleVertical(140),alignSelf:'center'}}>
                  <Text style={{fontSize:textScale(27),color:'#2d9bf2',fontWeight:'bold'}}>EL-RAZZAK</Text>
              </View>
                <View style={{alignSelf:'center',marginTop:moderateScaleVertical(38)}}>
                    <View style={{flexDirection:'row'}}>
                    <TextInput
                      icon="login"
                      mode="contained"
                      placeholder="Enter Email"
                      autoCapitalize="none"
                      placeholderTextColor="grey"
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.email} onChangeText={(text)=> this.setState({email:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row',marginTop:moderateScaleVertical(26)}}>
                   <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Enter Password"
                    placeholderTextColor="grey"
                   style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                   secureTextEntry={true}
                   value={this.state.password} onChangeText={(text)=> this.setState({password:text})}
                  />
                    </View>
               </View>  
    
               <View style={{marginTop:moderateScaleVertical(30),width:270,color:'green',alignSelf:'center'}}>
                   <TouchableOpacity  onPress={()=>this.userLogin(this.state.email,this.state.password)} >
                            <View style={{borderWidth:1,borderRadius:30,borderColor:'#2d9bf2',height:37}}>
                                <Text style={{alignSelf:'center',marginTop:moderateScaleVertical(8),fontSize:textScale(17),color:"grey"}}>Login</Text>
                                </View>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> this.props.navigation.navigate("Signup")}>
                       <Text style={{alignSelf:'center',fontSize:textScale(15),marginVertical:moderateScaleVertical(8),color:'#2d9bf2'}}>Don't have an account? Signup</Text>
                     </TouchableOpacity> 
                   <View style={{flexDirection: 'row',marginVertical:moderateScaleVertical(30)}}> 
                        <View style={{backgroundColor: '#A2A2A2', height: 1, flex: 1, alignSelf: 'center'}} /> 
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: textScale(14) }}>or</Text> 
                        <View style={{backgroundColor: '#A2A2A2', height: 1, flex: 1, alignSelf: 'center'}} /> 
                   </View>
                     <TouchableOpacity >
                            <View style={{flexDirection:'row',borderWidth:1,borderRadius:3,borderColor:'#5B5B5B',height:39}}>
                                <Image source={require('../../assets/google.png')} style={{width:34,height:24,marginVertical:moderateScaleVertical(6),marginHorizontal:moderateScale(4)}}/>
                                <Text style={{alignSelf:'center',fontSize:textScale(17),color:"grey",marginHorizontal:moderateScale(29)}}>Continue with Google</Text>
                            </View>
                   </TouchableOpacity>
              </View>
               </KeyboardAvoidingView>
          </View>
        );
      }
}
    
export default Login

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
