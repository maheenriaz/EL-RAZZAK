import React from 'react';
import {View,Text, Image} from 'react-native';

class Splash extends React.Component {
 componentDidMount(){
   setTimeout(() => {
     this.props.navigation.navigate('Login')
   }, 2000);
 }
  render() {
    const {mode} = this.props

    return (
      <View style={{flex: 1,backgroundColor:'#2d9bf2',justifyContent:'center',alignItems:'center'}}>
<Text style={{fontSize:47,color:'white',fontWeight:'bold'}}>EL-RAZZAK</Text>   
   </View>
    );
  }
}
   
export default Splash

