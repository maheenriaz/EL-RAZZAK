import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator, Image, StatusBar, AsyncStorage } from 'react-native';
import { Colors, CustomTextInput, Loader } from '../../config';
import { textScale, moderateScaleVertical, moderateScale } from '../Responsive/index';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';

class Signup extends React.Component {
  state = {
    email: '',
    password: '',
    name: '',
    phone: '',
    repass: '',
    data: null,
    loader: false,
  }
  userSignup = () => {
    const { name, password, phone, email, repass } = this.state
    if (password !== repass) return alert("Passwords doesn't match")
    if (!name) return alert('Please enter your name!')
    if (!password) return alert('Please enter Password!')
    if (!phone) return alert('Please enter your Phone Number!')
    this.setState({ loader: true })
    auth().createUserWithEmailAndPassword(email, password)
      .then(({ user: { uid } }) => {
        const details = {
          email,
          uid,
          name,
          phone,
          password,
        }

        firestore().collection("users").doc(uid)
          .set({
            ...details
          })
          .then(() => {
            this.setState({ loader: false })
            this.props.saveUserInRedux(details)
            this.props.navigation.navigate("UserView")
          })
          .catch((err) => {
            console.log(err.message)
            this.setState({ loader: false })
          })
      })
      .catch((err) => {
        this.setState({ loader: false })
        Alert.alert(err.message)
      })
  }
  render() {
    const { loader } = this.state
    return (
      <View style={styles.main}>
        <Loader isLoading={loader} />
        <View style={[styles.main, { paddingTop: getStatusBarHeight() }]}>

          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image source={require('../../assets/logo-nobg.png')} style={{ width: 150, height: 150, marginVertical: 20, tintColor: Colors.primary }} resizeMode="contain" />
            <Text style={{ marginBottom: 20, color: Colors.primary, fontSize: 24, fontWeight: 'bold' }}>Welcome!</Text>
            <CustomTextInput
              placeholder="Enter Name"
              placeholderTextColor="grey"
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, marginBottom: 20, backgroundColor: 'white' }}
              underlineColorAndroid="transparent"
              value={this.state.name} onChangeText={(text) => this.setState({ name: text })}
            />

            <CustomTextInput
              placeholder="Enter Email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, marginBottom: 20, backgroundColor: 'white' }}
              underlineColorAndroid="transparent"
              value={this.state.email} onChangeText={(text) => this.setState({ email: text })}
            />

            <CustomTextInput
              placeholder="Enter Phone Number"
              placeholderTextColor="grey"
              keyboardType={'phone-pad'}
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, marginBottom: 20, backgroundColor: 'white' }}
              underlineColorAndroid="transparent"
              value={this.state.phone} onChangeText={(text) => this.setState({ phone: text })}
            />

            <CustomTextInput
              underlineColorAndroid="transparent"
              placeholder="Enter Password"
              placeholderTextColor="grey"
              autoCapitalize="none"
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, marginBottom: 20, backgroundColor: 'white' }}
              secureTextEntry={true}
              value={this.state.password} onChangeText={(text) => this.setState({ password: text })}
            />
            <CustomTextInput
              underlineColorAndroid="transparent"
              placeholder="Re-Enter Password"
              placeholderTextColor="grey"
              autoCapitalize="none"
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, marginBottom: 20, backgroundColor: 'white' }}
              secureTextEntry={true}
              value={this.state.repass} onChangeText={(text) => this.setState({ repass: text })}
            />

            <TouchableOpacity
              style={{ width: '80%', backgroundColor: Colors.primary, paddingVertical: 10, borderRadius: 10 }}
              onPress={this.userSignup} >
              <Text style={{ alignSelf: 'center', fontSize: textScale(16), color: "white" }}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")}>
              <Text style={{ alignSelf: 'center', fontSize: textScale(16), marginVertical: moderateScaleVertical(10), color: Colors.primary }}>Already have an account? Login</Text>
            </TouchableOpacity>

          </ScrollView>
        </View>
      </View>
    );
  }
}


function mapDispatch(dispatch){
  return({
    saveUserInRedux: (user) => {
      dispatch({type:"SAVE_USER",payload:user})
    }
  })
}
export default connect(null,mapDispatch)(Signup)

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
