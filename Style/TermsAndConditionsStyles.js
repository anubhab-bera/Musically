import { StyleSheet } from 'react-native'; // Import Platform module

const TermsAndConditionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#EC407A', // Background color remains the same
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000', // Black color for header
  },
  content: {
    width: '100%',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#FFFDD0', // Creamy white color for text
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#FFFDD0', // Creamy white color for text
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#616161', // Gray button color
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '80%', // Set width to 80% of the container
    alignSelf: 'center', // Center the button horizontally
  },
  buttonText: {
    color: '#FFFDD0', // Creamy white color for button text
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
});

export default TermsAndConditionsStyles;
