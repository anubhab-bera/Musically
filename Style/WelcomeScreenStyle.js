import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: -190, // Adjusted top position to move the header to the top
    alignItems: 'center',
  },
  bigText: {
    color: '#FFFDD0', // Creamy white color for text
    fontSize: 50,
    fontStyle: 'italic', // Italic font style
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200, // Adjusted marginTop to create space below the header
  },
  subtitle: {
    color: '#FFFDD0', // Creamy white color for text
    marginBottom: 20,
    fontSize: 18,
    fontStyle: 'italic', // Italic font style
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Add space between buttons
    marginTop: 20,
    width: '80%', // Set width to 80% of the container
  },
  button: {
    backgroundColor: '#616161',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%', // Set width to 48% to fit two buttons with space between
  },
  buttonText: {
    color: '#FFFDD0', // Creamy white color for text
    fontSize: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Loader background color
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
