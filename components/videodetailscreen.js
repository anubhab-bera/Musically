import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoDetailsScreen = ({ route, navigation }) => {
  const { video } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state for playback
  const videoRef = useRef(null); // Ref for the video component

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const wishlist = await AsyncStorage.getItem('wishlist');
        if (wishlist) {
          const parsedWishlist = JSON.parse(wishlist);
          setIsFavorite(parsedWishlist.videos.some((item) => item.id === video.id));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    checkIsFavorite();
  }, []);

  const toggleFavorite = async () => {
    try {
      let wishlist = await AsyncStorage.getItem('wishlist');
      wishlist = wishlist ? JSON.parse(wishlist) : { songs: [], videos: [] };

      if (!isFavorite) {
        wishlist.videos.push(video);
      } else {
        wishlist.videos = wishlist.videos.filter((item) => item.id !== video.id);
      }

      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.wishlistButton} onPress={toggleFavorite}>
        <MaterialIcons
          name={isFavorite ? 'favorite' : 'favorite-border'}
          size={30}
          color={isFavorite ? 'red' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          source={{ uri: video.url }}
          style={styles.video}
          resizeMode="contain"
          shouldPlay={false} // Do not auto-play the video
        />
      </View>
      <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayback}>
        <MaterialIcons
          name={isPlaying ? 'pause-circle-filled' : 'play-circle-filled'}
          size={50}
          color={isPlaying ? 'red' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  wishlistButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60, // Adjust the margin to prevent overlap with the top buttons
  },
  video: {
    width: '100%',
    height: 300,
  },
  playPauseButton: {
    marginVertical: 20,
    alignSelf: 'center',
  },
});

export default VideoDetailsScreen;
