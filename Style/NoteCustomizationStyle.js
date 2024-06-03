import { StyleSheet } from 'react-native';

const noteCustomizationStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  scrollView: {
    flex: 1,
    marginBottom: 60, // Ensure scroll view doesn't overlap save button
  },
  noteTitleInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 50,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  noteContentInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 100,
    marginHorizontal: 20,
  },
  customizationTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  tabItem: {},
  tabItemSelected: {},
  tabItemText: {},
  colorPickerMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 56,
    width: '100%',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedDateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginTop: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
    marginTop: 40,
  },
  buttonContainer: {
    marginTop: 50, // Adjust this value as needed
    marginBottom: 80, // Adjust this value as needed
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20, // Add some margin to ensure it's well placed
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  calendarContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '80%',
    alignSelf: 'center', // Center the container horizontally
    justifyContent: 'center', // Center the content vertically
    elevation: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleSwitchContainer: {
    position: 'absolute',
    bottom: 80, // Adjusted position
    alignSelf: 'center',
    zIndex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 2,
    margin: 80,
  },
});

export default noteCustomizationStyle;
