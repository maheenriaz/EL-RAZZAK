import React from 'react';
import { View, Dimensions, ActivityIndicator } from 'react-native';
const { width, height } = Dimensions.get('screen')

export default class Loader extends React.Component {
    render() {
        if(!this.props.isLoading)
        return null
        return (
            <View style={{zIndex:99,position:'absolute',top:0,bottom:0,right:0,left:0, height, width, alignItems: 'center', justifyContent: 'center', backgroundColor: "rgba(0,0,0,0.5)" }}>
                <ActivityIndicator size={'large'} color="black" />
            </View>
        )
    }
}
