import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert , Image , ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreenStyles from '../Style/LoginScreenStyle'; 
import eyeClosedIcon from '../assets/eye.png';
import eyeOpenIcon from '../assets/visible.png';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const handleLogin = async () => {
    try {
      const storedCredentialsJSON = await AsyncStorage.getItem('credentials');
      if (!storedCredentialsJSON) {
        Alert.alert('Error', 'No credentials found. Please sign up first.');
        return;
      }

      const storedCredentials = JSON.parse(storedCredentialsJSON);

      if (email === storedCredentials.email && password === storedCredentials.password) {
        navigation.replace('Main');
      } else {
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Alert.alert('Error', 'Failed to login. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../assets/finger.jpg')} style={LoginScreenStyles.background}>
    <View style={LoginScreenStyles.container}>
      <Text style={LoginScreenStyles.header}>Welcome Back!</Text>
      <View style={LoginScreenStyles.content}>
        <TextInput
          style={LoginScreenStyles.inputField}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          keyboardType="email-address"
          value={email}
        />
        <View style={LoginScreenStyles.passwordContainer}>
            <TextInput
              style={LoginScreenStyles.passwordInput}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={!isPasswordVisible}
              value={password}
            />
            <TouchableOpacity style={LoginScreenStyles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Image source={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={LoginScreenStyles.button} onPress={handleLogin}>
            <Text style={LoginScreenStyles.buttonText}>Login</Text>
          </TouchableOpacity>
          <Text style={LoginScreenStyles.subtitle}>Don't have an account yet?</Text>
          <TouchableOpacity style={LoginScreenStyles.button} onPress={() => navigation.navigate('SignUp')}>
            <Text style={LoginScreenStyles.buttonText}>Sign Up First?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;