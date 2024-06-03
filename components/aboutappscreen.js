import React from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper'; // Import Swiper
import AboutScreenStyles from '../Style/AboutStyles'; // Import styles

const images = [
  require('../assets/images1.jpg'),
  require('../assets/images2.jpg'),
  require('../assets/images3.jpg'),
  require('../assets/images4.jpg'),
  require('../assets/images5.jpg'),
  require('../assets/images6.jpg'),
];

const AboutScreen = () => {
  const navigation = useNavigation();

  const handleSkip = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={AboutScreenStyles.container}>
      <Swiper
        style={AboutScreenStyles.carouselContainer}
        autoplay
        autoplayTimeout={3}
      >
        {images.map((image, index) => (
          <View key={index} style={AboutScreenStyles.slide}>
            <Image source={image} style={AboutScreenStyles.photo}  />
          </View>
        ))}
      </Swiper>
      <TouchableOpacity style={AboutScreenStyles.skipButton} onPress={handleSkip}>
        <Text style={AboutScreenStyles.skipText}>Skip -></Text>
      </TouchableOpacity>
    </View>
  );
};

export default AboutScreen;
