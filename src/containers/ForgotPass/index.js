import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { textScale } from '../Responsive/index';
import { CustomTextInput, Loader, Colors } from '../../config';
import auth from '@react-native-firebase/auth'
import { getStatusBarHeight } from 'react-native-status-bar-height';

class Login extends React.Component {
  state = {
    email: '',
    loader: false,
  }
  sendEmail = () => {
    const { email } = this.state
    if (!email) return alert("Please enter your Email.")
    this.setState({ loader: true })
    auth().sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ loader: false })
        alert("Password Reset Link sent to your Email!")
      })
      .catch((err) => {
        Alert.alert(err.message)
        this.setState({ loader: false })
      })
  }

  render() {
    const { loader, email } = this.state
    return (
      <View style={styles.main}>
        <Loader isLoading={loader} />
        <View style={[styles.main, { paddingTop: getStatusBarHeight() }]}>
          <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <Image source={require('../../assets/logo-nobg.png')} style={{ width: 150, height: 150, marginVertical: 20, tintColor: Colors.primary }} resizeMode="contain" />
            <Text style={{ marginBottom: 20, color: Colors.primary, fontSize: 24, fontWeight: 'bold' }}>Reset your Password</Text>
            <CustomTextInput
              placeholder="Enter your Email"
              autoCapitalize="none"
              placeholderTextColor="grey"
              style={{ paddingLeft: 17, fontSize: textScale(16), width: '80%', height: 44, borderRadius: 10, borderWidth: 1, backgroundColor: 'white', marginBottom: 20 }}
              underlineColorAndroid="transparent"
              value={email} onChangeText={(email) => this.setState({ email })}
            />
            <TouchableOpacity
              style={{ width: '80%', backgroundColor: Colors.primary, paddingVertical: 10, borderRadius: 10 }}
              onPress={this.sendEmail} >
              <Text style={{ alignSelf: 'center', fontSize: textScale(16), color: "white" }}>Send me the link!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={{ marginVertical: 10 }}>
              <Text style={{ alignSelf: 'center', fontSize: textScale(16), color: Colors.primary }}>Go Back to Login!</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Login

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
