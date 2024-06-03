import React from 'react';
import { View, FlatList, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const videos = [
  
  {
    "id": "1",
    "title": "Big Buck Bunny",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=Big+Buck+Bunny",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    "duration": "01:00"
  },
  {
    "id": "2",
    "title": "Elephants Dream",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=Elephants+Dream",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    "duration": "02:30"
  },
  {
    "id": "3",
    "title": "For Bigger Blazes",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=For+Bigger+Blazes",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    "duration": "03:15"
  },
  {
    "id": "4",
    "title": "For Bigger Escapes",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=For+Bigger+Escapes",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    "duration": "02:45"
  },
  {
    "id": "5",
    "title": "For Bigger Fun",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=For+Bigger+Fun",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    "duration": "01:45"
  },
  {
    "id": "6",
    "title": "For Bigger Joyrides",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=For+Bigger+Joyrides",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    "duration": "02:00"
  },
  {
    "id": "7",
    "title": "For Bigger Meltdowns",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=For+Bigger+Meltdowns",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    "duration": "02:20"
  },
  {
    "id": "8",
    "title": "Sintel",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=Sintel",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    "duration": "03:10"
  },
  {
    "id": "9",
    "title": "Subaru Outback On Street And Dirt",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=Subaru+Outback+On+Street+And+Dirt",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
    "duration": "02:55"
  },
  {
    "id": "10",
    "title": "Tears Of Steel",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=Tears+Of+Steel",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    "duration": "03:45"
  },
  {
    "id": "11",
    "title": "We Are Going On Bullrun",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=We+Are+Going+On+Bullrun",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    "duration": "02:15"
  },
  {
    "id": "12",
    "title": "What Car Can You Get For A Grand",
    "thumbnail": "https://dummyimage.com/300x200/000/fff&text=What+Car+Can+You+Get+For+A+Grand",
    "url": "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    "duration": "01:30"
  },


  // Add more videos here...
];

const VideoScreen = () => {
  const navigation = useNavigation();

  const handleVideoPress = (video) => {
    navigation.navigate('VideoDetails', { video });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => handleVideoPress(item)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.videoInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.duration}>{item.duration}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  videoItem: {
    flex: 1,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 150,
  },
  videoInfo: {
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  duration: {
    fontSize: 14,
    color: 'gray',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
});

export default VideoScreen;
