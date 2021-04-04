import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import HeaderCustom from '../../components/HeaderCustom';
import { textScale, moderateScaleVertical } from '../Responsive/index';
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux';
import { Loader, Colors } from '../../config';
import SplashScreen from 'react-native-splash-screen';


class UserView extends React.Component {
  state = {
    restaurants: [],
    loader: true,
  }
  getData = () =>{
    firestore().collection("OwnerRestaurant")
      .onSnapshot((querySnapshot) => {
        var alldata = []
        querySnapshot.forEach((doc) => {
          alldata.push(doc.data())
        });
        this.setState({ restaurants: alldata, loader: false })
      });
  }
  componentDidMount() {
    SplashScreen.hide();
    this.getData()
  }
  updatePlate = (ownerRestaurant,index) =>{
    let restaurant = ownerRestaurant.restaurant
    restaurant.addplate[index] = {booked:true}
    firestore().collection('OwnerRestaurant').doc(ownerRestaurant.uid)
    .update({
      restaurant,
    })

  }
  _renderItem = ({ item }) => {
    const {restaurant} = item
    return (
      <View style={{ borderColor: "#E1E1E1", borderWidth: 1, marginTop: moderateScaleVertical(10) }}>
        <Image style={{ width: "100%", height: 220, resizeMode: "cover" }} source={{ uri: restaurant.img }} />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: textScale(18), marginBottom: 3, fontWeight: 'bold' }}>{restaurant.name}</Text>
          <Text style={{ fontSize: textScale(16), marginBottom: 3 }}>{restaurant.email}</Text>
          <Text style={{ fontSize: textScale(16), marginBottom: 3 }}>{restaurant.address}</Text>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <Text style={{ fontSize: textScale(16), marginBottom: 3 }}>Number of Total Plates</Text>
            <Text style={{ fontSize: textScale(22), marginBottom: 3, fontWeight: "bold" }}>{restaurant.addplate.length}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
            <Text style={{ fontSize: textScale(16), marginBottom: 3 }}>Number of Available Plates</Text>
            <Text style={{ fontSize: textScale(22), marginBottom: 3, fontWeight: "bold" }}>{restaurant.addplate.filter((plate)=>!plate.booked).length}</Text>
          </View>
          <View style={{flexDirection:'row',flexWrap:'wrap'}}>
            {restaurant?.addplate.map((plate,index)=>{
              const {booked} = plate
              return <TouchableOpacity
              onPress={()=>{
                if(!booked)
                this.updatePlate(item,index)
              }}
              key={index} style={{padding:5,borderWidth:booked?0:1,borderColor: Colors.primary,backgroundColor: booked ? Colors.primary:"white",margin:3}}><Text style={{color:booked?'white':'black'}}>{`Plate ${index+1}`}</Text></TouchableOpacity>
            })}
          </View>
        </View>
      </View>
    );
  }
  _listHeader = () => {
    return <Text style={{ fontSize: textScale(22), fontWeight: "bold",color:Colors.primary }}>Browse Restaurants</Text>;
  }
  render() {

    const { navigation } = this.props
    const { loader, restaurants } = this.state
    return (
      <View style={styles.main}>
        <Loader isLoading={loader} />

        <HeaderCustom navigation={navigation} />
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 15 }}
          ListHeaderComponent={this._listHeader}
          data={restaurants}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.name + item.address}
          renderItem={this._renderItem}
        />
      </View>

    );
  }
}

function mapState(state) {
  return ({
    user: state.reducer.user
  })
}
export default connect(mapState)(UserView)

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
