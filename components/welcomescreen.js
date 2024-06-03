// WelcomeScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Animated, Easing , ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome5 } from '@expo/vector-icons';
import styles from '../Style/WelcomeScreenStyle';

const WelcomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const waveValue = new Animated.Value(0);

  useEffect(() => {
    // Check if user has logged in today
    const checkLoginStatus = async () => {
      try {
        const lastLoginTime = await AsyncStorage.getItem('lastLoginTime');
        const today = new Date().toDateString();
        const lastLoginDate = new Date(lastLoginTime).toDateString();

        if (lastLoginDate === today) {
          // User logged in today, navigate to home screen
          navigation.replace('Home');
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, [navigation]); // Include navigation in the dependency array

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        waveValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true
        }
      )
    ).start();
  }, [waveValue]);

  const translateX = waveValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10] // Adjusted range to keep the emojis centered
  });

  const handleLogin = () => {
    // Handle login action
    console.log('Login button pressed');
    navigation.navigate('Login');
  };

  const handleSignup = () => {
    // Handle signup action
    console.log('Signup button pressed');
    navigation.navigate('SignUp');
  };

  return (
    <ImageBackground source={require('../assets/back1.jpg')} style={styles.background}>
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.bigText}>Musically<FontAwesome5 name="music" size={50} color="#FFFD00" /> </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <FontAwesome5 name="music" size={30} color="#1F39C" style={{ marginLeft: 10 }} />
            </Animated.View>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <FontAwesome5 name="video" size={30} color="#1F39D" style={{ marginLeft: 10 }} />
            </Animated.View>
            <Animated.View style={{ transform: [{ translateX }] }}>
              <FontAwesome5 name="play-circle" size={30} color="#1F3A5" style={{ marginLeft: 10 }} />
            </Animated.View>
          </View>
        </View>
        <Text style={styles.subtitle}>Welcome to Musically</Text>
        <Text style={styles.subtitle}>Discover the world of music and videos</Text> 
        <Text style={styles.subtitle}>with us.</Text>
        {/* Login/Signup buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isLoading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#EC407A" />
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

export default WelcomeScreen;
