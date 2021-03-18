import React from 'react';
import {View, Text, StyleSheet, Linking,TouchableOpacity,TextInput,ActivityIndicator,Image,KeyboardAvoidingView,StatusBar,FlatList,ScrollView,AsyncStorage} from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import firestore from '@react-native-firebase/firestore'

 
class RestaurantArea extends React.Component {
    state={
        oemail:'',
        ophone:'',
        oname:'',
        oaddress:'',
        oimg:'',
        addplate:0,
        loader:false,
        checkUser:false,
        haverestaurant:true
       }
   componentDidMount=async()=>{
    let user = await AsyncStorage.getItem('list')
    console.log(user)
    user=JSON.parse(user)
    console.log(user,"hh")
    const  User = user ? user :{} 
    console.log(User.uid)
    firestore().collection("OwnerRestaurant").doc(User.uid)
    .onSnapshot((doc) => {
      if (doc.exists) {
        this.setState({haverestaurant:false,oemail:doc.data().email,ophone:doc.data().phone,oimg:doc.data().img,oaddress:doc.data().address,oname:doc.data().name})
        console.log(doc)
    } else {
        this.setState({haverestaurant:true})
    }
    
    });
   } 
   addplate=async()=>{
     this.setState({addplate : this.state.addplate + 1})

     var user = await AsyncStorage.getItem('list')
     user=JSON.parse(user)
      const   User = user ? user :{} 
      firestore().collection("OwnerRestaurant").doc(User.uid)
      .update({"addplate": this.state.addplate})
      .then((msg)=>{
        console.log("done")
      })
   }   
    render() {
   
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
             <HeaderCustom onPressBack={()=>this.props.navigation.goBack()} menu navigation={this.props.navigation} />
              {
                haverestaurant ?
                <TouchableOpacity onPress={()=>this.props.navigation.navigate("AddRestaurant")}>
                  <View style={{width:240,height:40,borderWidth:1,borderColor:"#2d9bf2",alignSelf:"center",marginVertical:moderateScaleVertical(240),borderRadius:12}}>
                    <Text style={{fontSize:textScale(18),marginVertical:moderateScaleVertical(8),alignSelf:"center"}}>Add Restaurants</Text>
                </View>
               </TouchableOpacity> :
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,backgroundColor:"white",padding:10}}>
                <Text style={{fontSize:textScale(18),fontWeight:"bold"}}>Your Restaurants</Text>
                
                      <View style={{borderColor:"#E1E1E1",borderWidth:1,borderRadius:10,marginVertical:moderateScaleVertical(10)}}>
                            <Image style={{width:"100%",height:212,borderRadius:10,resizeMode:"cover"}} source={{uri:this.state.oimg}} />
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text style={{fontSize:textScale(14),padding:10}}>{this.state.oname}</Text>
                               <Text style={{fontSize:textScale(14),padding:10}}>{this.state.ophone}</Text>
                             </View>
                                
                             <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:moderateScaleVertical(-17)}}>
                               <Text style={{fontSize:textScale(14),padding:10}}>{this.state.oemail}</Text>
                               <Text style={{fontSize:textScale(14),padding:10}}>{this.state.oaddress}</Text>
                             </View>
                             <View style={{flexDirection:"row",marginTop:moderateScaleVertical(-17),justifyContent:"space-between"}}>
                               <TouchableOpacity onPress={this.addplate}>
                                  <View >
                                      <Text style={{fontSize:textScale(14),padding:10}}>Add Plate</Text>
                                  </View>
                               </TouchableOpacity>
                                  <Text style={{fontSize:textScale(14),padding:10,fontWeight:"bold"}}>{this.state.addplate}</Text>
                             </View>
                         </View>
                   
                </View>
         
          </ScrollView>
              }
          </View>
        );
      }
}
    
export default RestaurantArea

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
