import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MusicScreen from './MusicScreen';
import VideosScreen from './VideosScreen';
import NotesScreen from './NotesScreen';
import UtilitiesScreen from './UtilitiesScreen';
import HomeScreen from './homescreen';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedCredentialsJSON = await AsyncStorage.getItem('credentials');
        if (storedCredentialsJSON) {
          const storedCredentials = JSON.parse(storedCredentialsJSON);
          setUsername(storedCredentials.userName);
          setEmail(storedCredentials.email);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Utilities"
        component={UtilitiesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="toolbox" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default MainScreen;
