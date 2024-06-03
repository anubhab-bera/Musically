import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './components/welcomescreen';
import SignUpScreen from './components/signupscreen';
import LoginScreen from './components/loginscreen';
import TermsAndConditionsScreen from './components/termsandconditionsscreen';
import AboutScreen from './components/aboutappscreen';
import MainScreen from './components/mainscreen';
import HomeScreen from './components/homescreen';
import SongDetailsScreen from './components/songdetailscreen';
import VideoDetailsScreen from './components/videodetailscreen';
import StopwatchScreen from './components/StopwatchScreen';
import NotesDetailsScreen from './components/notesdetailsscreen';
import NoteCustomizationScreen from './components/notescustomizationscreen';
import NotesScreen from './components/NotesScreen';
import WishlistScreen from './components/WishlistScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
         <Stack.Screen name="SongDetails" component={SongDetailsScreen} options={{ headerShown: false }} />
         <Stack.Screen name="VideoDetails" component={VideoDetailsScreen} options={{ headerShown: false }} />
         <Stack.Screen name="StopWatch" component={StopwatchScreen} options={{ headerShown: false }} />
         <Stack.Screen name="NoteDetails" component={NotesDetailsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NoteCustomization" component={NoteCustomizationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NoteScreen" component={NotesScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Wishlist" component={WishlistScreen} options={{ headerShown: false }} />
          
        {/* Define other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
