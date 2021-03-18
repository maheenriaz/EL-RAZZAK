import React from 'react';
import {View, Text, StyleSheet, Linking,TouchableOpacity,TextInput,ActivityIndicator,Image,KeyboardAvoidingView,StatusBar,FlatList,ScrollView,AsyncStorage} from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import ImagePicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore'
 
class AddRestaurant extends React.Component {
    state={
        email:'',
        password:'',
        name:'',
        phone:'',
        address:'',
        addplate:'',
        img:'https://lh3.googleusercontent.com/proxy/zi3Al490PeiDypjmpqzSgBad4nDBgPXBLKRP5VlPf2eLPKskwCuY6A11OniPNNEf9XuVjFm4PPu-blbEgATVOgMsdOLm5nAHVLrwpfCx',
        loader:false,
        checkUser:false,
        haverestaurant:false
       }
     PickPhotoFromGallery=()=>{
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
             this.setState({img:image.path})
             console.log(this.state.img)
          });
     }
     savePost=async()=>{
      let user = await AsyncStorage.getItem('list')
      console.log(user)
      user=JSON.parse(user)
      console.log(user,"hh")
      const  User = user ? user :{} 
      console.log(User.uid)
      firestore().collection("OwnerRestaurant").doc(User.uid)
      .set({
        uid:User,
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
        address: this.state.address,
        img: this.state.img,
        addplate: this.state.addplate,
      })  
    .then(()=> {
        alert("Your Restaurant Added!!")
        this.props.navigation.navigate("RestaurantArea")
    })
    .catch((error) =>{
      alert("Error writing document: ", error);
    });
    }
       render() {
         const myres= [
          {id:1,oimage:"https://images.freekaamaal.com/post_images/1606817930.jpg",oname:"Zayan Ahmed",oaddress:"R-102 Karachi, Pakistan",ophone:"+923312347281",oemail:"zayan@gmail.com"},
          ]
        const {loader,checkUser,haverestaurant} = this.state
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
             <HeaderCustom onPressBack={()=>this.props.navigation.goBack()} title="Add Resturant"  navigation={this.props.navigation}  />
             <View style={{alignSelf:'center',marginTop:moderateScaleVertical(38)}}>
                    <View style={{flexDirection:'row'}}>
                    <TextInput
                      icon="login"
                      mode="contained"
                      placeholder="Owner Name"
                      placeholderTextColor="grey"
                      style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                      underlineColorAndroid="transparent"
                      value={this.state.name} onChangeText={(text)=> this.setState({name:text})}
                    />
                    </View>
                    <View style={{flexDirection:'row',marginTop:moderateScaleVertical(26)}}>
                   <TextInput
                    underlineColorAndroid="transparent"
                    placeholder="Owner Email"
                    autoCapitalize="none"
                    placeholderTextColor="grey"
                   style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                  value={this.state.email} onChangeText={(text)=> this.setState({email:text})}
                  />
                    </View>
                    <View style={{flexDirection:'row',marginTop:moderateScaleVertical(26)}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Owner Address"
                            placeholderTextColor="grey"
                        style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                        value={this.state.address} onChangeText={(text)=> this.setState({address:text})}
                        />
                    </View>
                    <View style={{flexDirection:'row',marginTop:moderateScaleVertical(26)}}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            placeholder="Owner Phone Number"
                            placeholderTextColor="grey"
                            keyboardType={'phone-pad'}
                        style={{paddingLeft:17,fontSize:textScale(15),width:280,height:44,borderRadius:26,borderColor:'#5B5B5B',borderWidth:1,backgroundColor:'white'}}
                        value={this.state.phone} onChangeText={(text)=> this.setState({phone:text})}
                        />
                    </View>
                  
                    <TouchableOpacity onPress={this.PickPhotoFromGallery}>
                        <View style={{flexDirection:'row',marginTop:moderateScaleVertical(26)}}>
                        <Image style={{width:278,height:150,alignSelf:'center',borderRadius:20}} source={{uri:this.state.img}} />
                        </View>
                    </TouchableOpacity>
               </View>
               <View style={{marginTop:moderateScaleVertical(30),width:270,color:'green',alignSelf:'center'}}>
                   <TouchableOpacity  onPress={this.savePost} >
                            <View style={{borderWidth:1,borderRadius:30,borderColor:'#2d9bf2',height:37}}>
                                <Text style={{alignSelf:'center',marginTop:moderateScaleVertical(8),fontSize:textScale(17),color:"grey"}}>Add Restaurant</Text>
                                </View>
                   </TouchableOpacity>
              </View>
               
          </View>
        );
      }
}
    
export default AddRestaurant

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
