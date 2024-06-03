import { StyleSheet , Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUpScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  content: {
    width: '80%',
    alignItems: 'center',
  },
  inputField: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333333',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Faded white background for input fields
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 10,
    paddingRight: 10, // Added padding to the right for spacing
  },
  passwordInput: {
    flex: 1,
    padding: 10,
    color: '#333333',
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: '#616161',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFDD0',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#ffffff',
  },
});

export default SignUpScreenStyles;
