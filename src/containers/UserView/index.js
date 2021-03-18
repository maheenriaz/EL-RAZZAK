import React from 'react';
import {View, Text, StyleSheet, Linking,TouchableOpacity,TextInput,ActivityIndicator,Image,KeyboardAvoidingView,StatusBar,FlatList,ScrollView,AsyncStorage} from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { TouchableNativeFeedback } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import {textScale,moderateScaleVertical,moderateScale}  from '../Responsive/index';
import firestore from '@react-native-firebase/firestore'

 
class UserView extends React.Component {
    state={
       myres:[],
        loader:false,
        checkUser:false,
        haverestaurant:false
       }
       componentDidMount=async()=>{
        let user = await AsyncStorage.getItem('list')
        console.log(user)
        user=JSON.parse(user)
        console.log(user,"hh")
        const  User = user ? user :{} 
        console.log(User.uid)
        firestore().collection("OwnerRestaurant")
        .onSnapshot((querySnapshot) => {
          var alldata=[]
         querySnapshot.forEach((doc)=> {
            alldata.push(doc.data()) 
         });
        this.setState({myres:alldata})
        });
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
             <HeaderCustom navigation={this.props.navigation} menu />
              {
                haverestaurant ?
                <TouchableOpacity>
                  <View style={{width:240,height:40,borderWidth:1,borderColor:"#2d9bf2",alignSelf:"center",marginVertical:moderateScaleVertical(240),borderRadius:12}}>
                    <Text style={{fontSize:textScale(18),marginVertical:moderateScaleVertical(8),alignSelf:"center"}}>Add Restaurants</Text>
                </View>
               </TouchableOpacity> :
                <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,backgroundColor:"white",padding:10}}>
                <Text style={{fontSize:textScale(18),fontWeight:"bold"}}>Your Restaurants</Text>
                  <FlatList 
                 data={this.state.myres}
                 showsVerticalScrollIndicator={false}
                 keyExtractor={(item)=>item.id}   
                 renderItem={({item})=>{
                   return(
                      <View style={{borderColor:"#E1E1E1",borderWidth:1,borderRadius:10,marginVertical:moderateScaleVertical(10)}}>
                            <Image style={{width:"100%",height:212,borderRadius:10,resizeMode:"cover"}} source={{uri:item.img}} />
                             <View style={{flexDirection:"row",justifyContent:"space-between"}}>
                               <Text style={{fontSize:textScale(14),padding:10}}>{item.name}</Text>
                               <Text style={{fontSize:textScale(14),padding:10}}>{item.phone}</Text>
                             </View>
                             <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:moderateScaleVertical(-17)}}>
                               <Text style={{fontSize:textScale(14),padding:10}}>{item.email}</Text>
                               <Text style={{fontSize:textScale(14),padding:10}}>{item.address}</Text>
                             </View>
                             <View style={{flexDirection:"row",justifyContent:"space-between",marginTop:moderateScaleVertical(-17)}}>
                               <Text style={{fontSize:textScale(14),padding:10}}>Number of Available Plates</Text>
                               <Text style={{fontSize:textScale(14),padding:8,fontWeight:"bold"}}>{item.addplate}</Text>
                             </View>
                         </View>
                   );
                 }}
             /> 
                </View>
         
          </ScrollView>
              }
          </View>
        );
      }
}
    
export default UserView

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
