import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image , ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpScreenStyles  from '../Style/SignUpStyle'; 
import eyeClosedIcon from '../assets/eye.png';
import eyeOpenIcon from '../assets/visible.png';

const SignUpScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleSignUp = async () => {
    try {
      // Validations...
          if (!userName.match(/^[a-zA-Z]{3,}$/)) {
        Alert.alert('Invalid User Name', 'User name must consist of at least 3 letters with no special characters.');
        return;
      }

      if (!phoneNumber.match(/^[0-9]{10}$/)) {
        Alert.alert('Invalid Phone Number', 'Phone number must consist of 10 digits.');
        return;
      }

      if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        Alert.alert('Invalid Email', 'Please enter a valid email.');
        return;
      }

      if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
        Alert.alert('Invalid Password', 'Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one number, and one special character.');
        return;
      }

      // Store credentials in local storage
      const credentials = {
        userName,
        phoneNumber,
        email,
        password,
        wishlist: { songs: [], videos: [] } // Initialize an empty wishlist for the new user
      };

      await AsyncStorage.setItem('credentials', JSON.stringify(credentials));
      await AsyncStorage.setItem('acceptedTerms', 'false');

      navigation.navigate('TermsAndConditions');
    } catch (error) {
      console.error('Error during sign up:', error);
      Alert.alert('Error', 'Failed to sign up. Please try again later.');
    }
  };

  return (
    <ImageBackground source={require('../assets/finger.jpg')} style={SignUpScreenStyles.background}>
      <View style={SignUpScreenStyles.container}>
        <Text style={SignUpScreenStyles.header}>Let's Sign Up</Text>
        <View style={SignUpScreenStyles.content}>
          <TextInput
            style={SignUpScreenStyles.inputField}
            placeholder="User Name"
            onChangeText={text => setUserName(text)}
            value={userName}
          />
          <TextInput
            style={SignUpScreenStyles.inputField}
            placeholder="Phone Number"
            onChangeText={text => setPhoneNumber(text)}
            keyboardType="numeric"
            value={phoneNumber}
          />
          <TextInput
            style={SignUpScreenStyles.inputField}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            keyboardType="email-address"
            value={email}
          />
          <View style={SignUpScreenStyles.passwordContainer}>
            <TextInput
              style={SignUpScreenStyles.passwordInput}
              placeholder="Password"
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
              value={password}
            />
            <TouchableOpacity style={SignUpScreenStyles.eyeIcon} onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Image source={isPasswordVisible ? eyeOpenIcon : eyeClosedIcon} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={SignUpScreenStyles.button} onPress={handleSignUp}>
            <Text style={SignUpScreenStyles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={SignUpScreenStyles.subtitle}>Already have an account?</Text>
          <TouchableOpacity style={SignUpScreenStyles.button} onPress={() => navigation.navigate('Login')}>
            <Text style={SignUpScreenStyles.buttonText}>Login Instead?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;