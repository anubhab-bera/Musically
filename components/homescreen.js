import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import MusicListScreen from './MusicScreen';
import VideosListScreen from './VideosScreen';
import WishlistScreen from './WishlistScreen';
import StopwatchScreen from './StopwatchScreen';
import NotesScreen from './NotesScreen';

const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('credentials');
              props.navigation.reset({
                index: 0,
                routes: [{ name: 'SignUp' }],
              });
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', paddingVertical: 20 }}>
        <MaterialCommunityIcons name="account-circle" size={100} color="black" />
        <Text style={{ marginTop: 10 }}>{props.username}</Text>
        <Text>{props.email}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <MaterialCommunityIcons name="logout" size={size} color={color} />
        )}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
};

const HomeScreen = () => {
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
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawerContent {...props} username={username} email={email} />
      )}
    >
      <Drawer.Screen
        name="Home"
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      >
        {(props) => (
          <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              {username ? <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#060270' }}>Hi {username}, What would you like to do today?</Text> : null}
            </View>
            <Tab.Navigator>
              <Tab.Screen name="Music" component={MusicListScreen} />
              <Tab.Screen name="Videos" component={VideosListScreen} />
            </Tab.Navigator>
          </View>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Stopwatch"
        component={StopwatchScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="timer" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeScreen;
