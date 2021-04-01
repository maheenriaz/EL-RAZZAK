import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity,ActivityIndicator,Image,StatusBar,Alert, ScrollView} from 'react-native';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import {CustomTextInput, Loader,Colors}  from '../../config';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
 
class Login extends React.Component {
    state={
        email:'',
        password:'',
        loader:false,
       }
       userLogin = () => {
         const {email,password} = this.state
         if(!email) return alert("Please enter your Email.")
         if(!password) return alert("Please enter your Password.")
        this.setState({loader:true})
        auth().signInWithEmailAndPassword(email, password)
            .then(({user:{uid}})=>{
               firestore().collection("users").doc(uid).get()
                .then((doc) => {
                  const data = doc.data()
                  if(data){
                  this.props.saveUserInRedux(data)
                  this.props.navigation.navigate("UserView")     
                  }
                  else alert("You're not signed up as a User!")
                  this.setState({loader:false})

                })
                .catch((err)=>{
                  Alert.alert(err.message)
                  this.setState({loader:false})
              })
           }) 
        .catch((err)=>{
            Alert.alert(err.message)
            this.setState({loader:false})
        })
    }
    componentDidMount(){
      setTimeout(() => {
        if(this.props.user?.uid){
          this.props.navigation.navigate('UserView')
        }
        else{
          SplashScreen.hide()
        }
      }, 1000);
    }
       render() {
         console.log(this.props.user?.uid)
        const {loader,email,password} = this.state
       return <View style={styles.main}>
             <Loader isLoading={loader} />
          <View style={[styles.main,{paddingTop:getStatusBarHeight()}]}>
              
                <ScrollView contentContainerStyle={{alignItems:'center'}}>
                  <Image source={require('../../assets/logo-nobg.png')} style={{width:150,height:150,marginVertical:20,tintColor:Colors.primary}} resizeMode="contain" />
                    <Text style={{marginBottom:20,color:Colors.primary,fontSize:24,fontWeight:'bold'}}>Welcome Back!</Text>
                    <CustomTextInput
                      icon="login"
                      mode="contained"
                      placeholder="Enter Email"
                      autoCapitalize="none"
                      placeholderTextColor="grey"
                      style={{paddingLeft:17,fontSize:textScale(16),width:'80%',height:44,borderRadius:10,borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={email} onChangeText={(email)=> this.setState({email})}
                    />
                   <CustomTextInput
                    underlineColorAndroid="transparent"
                    placeholder="Enter Password"
                    placeholderTextColor="grey"
                   style={{paddingLeft:17,fontSize:textScale(16),width:'80%',height:44,borderRadius:10,borderWidth:1,backgroundColor:'white',marginTop:20}}
                   secureTextEntry={true}
                   value={password} onChangeText={(password)=> this.setState({password})}
                  />
                   <TouchableOpacity onPress={()=> this.props.navigation.navigate("ForgotPass")} style={{marginVertical:10,alignSelf:'flex-end',marginRight:'10%'}}>
                       <Text style={{alignSelf:'center',fontSize:textScale(16),color:Colors.primary}}>Forgot Password?</Text>
                     </TouchableOpacity> 
    
                   <TouchableOpacity
                   style={{width:'80%',backgroundColor:Colors.primary,paddingVertical:10,borderRadius:10}}
                   onPress={this.userLogin} >
                  <Text style={{alignSelf:'center',fontSize:textScale(16),color:"white"}}>Login</Text>
                   </TouchableOpacity>
                   <TouchableOpacity onPress={()=> this.props.navigation.navigate("Signup")} style={{marginVertical:10}}>
                       <Text style={{alignSelf:'center',fontSize:textScale(16),color:Colors.primary}}>Don't have an account? Signup</Text>
                     </TouchableOpacity> 
                   {/* <View style={{flexDirection: 'row',marginVertical:moderateScaleVertical(30)}}> 
                        <View style={{backgroundColor: '#A2A2A2', height: 1, flex: 1, alignSelf: 'center'}} /> 
                        <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: textScale(14) }}>or</Text> 
                        <View style={{backgroundColor: '#A2A2A2', height: 1, flex: 1, alignSelf: 'center'}} /> 
                   </View>
                     <TouchableOpacity >
                            <View style={{flexDirection:'row',borderWidth:1,borderRadius:3,borderColor:'#5B5B5B',height:39}}>
                                <Image source={require('../../assets/google.png')} style={{width:34,height:24,marginVertical:moderateScaleVertical(6),marginHorizontal:moderateScale(4)}}/>
                                <Text style={{alignSelf:'center',fontSize:textScale(17),color:"grey",marginHorizontal:moderateScale(29)}}>Continue with Google</Text>
                            </View>
                   </TouchableOpacity> */}
              </ScrollView>
          </View>
          </View>
        
      }
}
    
function mapState({reducer:{user}}){
  return({
    user
  })
}
function mapDispatch(dispatch){
  return({
    saveUserInRedux: (user) => {
      dispatch({type:"SAVE_USER",payload:user})
    }
  })
}
export default connect(mapState,mapDispatch)(Login)
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
