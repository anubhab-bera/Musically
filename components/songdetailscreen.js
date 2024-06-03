import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

const SongDetailsScreen = ({ route, navigation }) => {
  const { song } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); // New state for playback
  const [sound, setSound] = useState(null); // State for sound object

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const wishlist = await AsyncStorage.getItem('wishlist');
        if (wishlist) {
          const parsedWishlist = JSON.parse(wishlist);
          setIsFavorite(parsedWishlist.songs.some((item) => item.id === song.id));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    checkIsFavorite();

    return () => {
      // Unload the sound when the component unmounts or when sound changes
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const toggleFavorite = async () => {
    try {
      let wishlist = await AsyncStorage.getItem('wishlist');
      wishlist = wishlist ? JSON.parse(wishlist) : { songs: [], videos: [] };

      if (!isFavorite) {
        wishlist.songs.push(song);
      } else {
        wishlist.songs = wishlist.songs.filter((item) => item.id !== song.id);
      }

      await AsyncStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsFavorite(!isFavorite); // Update state after modifying wishlist
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const togglePlayback = async () => {
    try {
      if (isPlaying) {
        if (sound) {
          await sound.pauseAsync();
        }
      } else {
        if (sound) {
          await sound.playAsync();
        } else {
          const { sound: newSound } = await Audio.Sound.createAsync(
            { uri: song.url },
            { shouldPlay: true }
          );
          setSound(newSound);
        }
      }
      setIsPlaying(!isPlaying); // Toggle playback state
    } catch (error) {
      console.error('Error during playback:', error);
    }
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
      <Image source={song.artwork} style={styles.artwork} />
      <View style={styles.songInfo}>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  songInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    fontSize: 18,
    color: 'gray',
  },
  playPauseButton: {
    marginVertical: 20,
  },
});

export default SongDetailsScreen;
