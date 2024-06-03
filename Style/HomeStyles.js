import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EC407A', // Background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    color: '#000000', // Black color for header
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 20,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  bigText: {
    color: '#FFFDD0', // Creamy white color for text
    fontSize: 50,
    fontStyle: 'italic', // Italic font style
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
});

export default HomeStyles;
