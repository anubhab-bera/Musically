import { StyleSheet } from 'react-native';

const AboutScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
   
    backgroundColor: 'rgba(0, 0, 0, 0.7)', 
    
  },
 
  
  carouselContainer: {
    
     height: '80%',
     marginBottom: 50,
     
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photo: {
    
     width: '90%',
    height: '80%',
    borderRadius: 8,
  },
  skipButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    backgroundColor: '#616161',
    borderRadius: 50, // To make it oval-shaped
    paddingHorizontal: 20,
    paddingVertical: 7,
  },
  skipText: {
    color: '#FFFDD0',
    fontSize: 16,
  },
});

export default AboutScreenStyles;