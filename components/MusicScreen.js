// MusicScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Audio } from 'expo-av';



const MusicScreen = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState(null);
  const [musicData, setMusicData] = useState([
    {
      title: 'death bed',
      artist: 'Powfu',
      artwork: require('../assets/death_bed.jpg'),
      url: 'https://sample-music.netlify.app/death%20bed.mp3',
      duration: 2 * 60 + 53,
      id: '1',
      isFavorite: false,
    },
    {
      title: 'bad liar',
      artist: 'Imagine Dragons',
      artwork: require('../assets/bad_liar.jpg'),
      url: 'https://sample-music.netlify.app/Bad%20Liar.mp3',
      duration: 2 * 60,
      id: '2',
      isFavorite: false,
    },
    {
    title: 'faded',
    artist: 'Alan Walker',
    artwork: require('../assets/faded.jpg'),
    url: 'https://sample-music.netlify.app/Faded.mp3',
    duration: 2 * 60,
    id: '3',
  },
  {
    title: 'hate me',
    artist: 'Ellie Goulding',
    artwork: require('../assets/hate_me.jpg'),
    url: 'https://sample-music.netlify.app/Hate%20Me.mp3',
    duration: 2 * 60,
    id: '4',
  },
  {
    title: 'Solo',
    artist: 'Clean Bandit',
    artwork: require('../assets/solo.jpg'),
    url: 'https://sample-music.netlify.app/Solo.mp3',
    duration: 2 * 60,
    id: '5',
  },
  {
    title: 'without me',
    artist: 'Halsey',
    artwork: require('../assets/without_me.jpg'),
    url: 'https://sample-music.netlify.app/Without%20Me.mp3',
    duration: 2 * 60,
    id: '6',
  },
    // Add more songs here...
  ]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async (song) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: true }
      );
      setSound(newSound);
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const stopSound = async () => {
    try {
      await sound.stopAsync();
    } catch (error) {
      console.error('Error stopping sound:', error);
    }
  };

const handleSongPress = (song) => {
    // Navigate to SongDetailScreen
    navigation.navigate('SongDetails', { song });
  };


  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.songItem} onPress={() => handleSongPress(item)}>
      <Image source={item.artwork} style={styles.artwork} />
      <View style={styles.songInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.artist}>{formatDuration(item.duration)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={musicData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 10,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  songInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  artist: {
    fontSize: 14,
    color: 'gray',
  },
};

export default MusicScreen;
