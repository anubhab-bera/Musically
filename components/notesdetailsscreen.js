import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Modal, Switch , TouchableWithoutFeedback} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar } from 'react-native-calendars';
import noteCustomizationStyle from '../Style/NoteCustomizationStyle';

const colorOptions = [
  '#ffcccc',
  '#ffddcc',
  '#ffe5cc',
  '#fff5cc',
  '#e5ffcc',
  '#ccffcc',
  '#ccffee',
  '#cce6ff',
  '#ccccff',
  '#e6ccff',
];

const NoteDetailsScreen = ({ route, navigation }) => {
  const { note, isEditable } = route.params;

  const [noteTitle, setNoteTitle] = useState(note.title);
  const [noteContent, setNoteContent] = useState(note.content);
  const [selectedTab, setSelectedTab] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(note.color);
  const [isItalicEnabled, setIsItalicEnabled] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showToggleSwitch, setShowToggleSwitch] = useState(isEditable && selectedTab === 'text'); // Adjusted to show toggle switch only in edit mode

  useEffect(() => {
    // Load the italic style preference from AsyncStorage
    const loadItalicPreference = async () => {
      try {
        const italicEnabled = await AsyncStorage.getItem('italicEnabled');
        if (italicEnabled !== null) {
          setIsItalicEnabled(JSON.parse(italicEnabled));
        }
      } catch (error) {
        console.error('Error loading italic preference:', error);
      }
    };

    loadItalicPreference();
  }, []);

  const handleSave = async () => {
    const updatedNote = { ...note, title: noteTitle, content: noteContent, color: selectedColor };
    // Update the note in AsyncStorage or wherever your data is stored
    // For demonstration purposes, I'll assume AsyncStorage here
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        const parsedNotes = JSON.parse(storedNotes);
        const updatedNotes = parsedNotes.map(n => (n.id === note.id ? updatedNote : n));
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        navigation.goBack();
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
    if (tab === 'text') {
      setIsColorPickerOpen(false);
      setShowToggleSwitch(true);
    } else if (tab === 'calendar') {
      setIsCalendarOpen(!isCalendarOpen);
      setShowToggleSwitch(false);
    } else {
      setShowToggleSwitch(false);
    }
  };

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    setIsColorPickerOpen(false);
  };

  const toggleItalic = (value) => {
    setIsItalicEnabled(value);
    // Save the italic style preference to AsyncStorage
    const saveItalicPreference = async (value) => {
      try {
        await AsyncStorage.setItem('italicEnabled', JSON.stringify(value));
      } catch (error) {
        console.error('Error saving italic preference:', error);
      }
    };

    saveItalicPreference(value);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleIconPress = (tab) => {
    if (!isEditable && tab !== 'text') {
      return; // Prevent action if not in edit mode and tab is not 'text'
    }
    setSelectedTab(tab);
    if (tab === 'color') {
      setIsColorPickerOpen(!isColorPickerOpen);
      setShowToggleSwitch(false);
    } else if (tab === 'text' && isEditable) {
      setShowToggleSwitch(true);
    } else if (tab === 'calendar') { // Added condition to handle calendar pop-up
    setIsCalendarOpen(!isCalendarOpen);
    setShowToggleSwitch(false);
    }
       else {
      setShowToggleSwitch(false);
    }
  };

  return (
    <View style={noteCustomizationStyle.container}>
      <TouchableOpacity style={noteCustomizationStyle.backButton} onPress={handleBack}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <TextInput
        style={[noteCustomizationStyle.noteTitleInput, { backgroundColor: selectedColor }]}
        placeholder="Add note title"
        onChangeText={text => setNoteTitle(text)}
        value={noteTitle}
        editable={isEditable}
      />
      <ScrollView style={noteCustomizationStyle.scrollView}>
        <TextInput
          style={[
            noteCustomizationStyle.noteContentInput,
            { backgroundColor: selectedColor, fontStyle: isItalicEnabled ? 'italic' : 'normal' },
          ]}
          placeholder="Add note"
          onChangeText={text => setNoteContent(text)}
          value={noteContent}
          multiline={true}
          editable={isEditable}
        />
      </ScrollView>
      {isEditable && (
        <View style={noteCustomizationStyle.buttonContainer}>
          <TouchableOpacity style={noteCustomizationStyle.saveButton} onPress={handleSave}>
            <Text style={noteCustomizationStyle.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={noteCustomizationStyle.customizationTabContainer}>
        <TouchableOpacity
          style={selectedTab === 'color' ? noteCustomizationStyle.tabItemSelected : noteCustomizationStyle.tabItem}
          onPress={() => handleIconPress('color')}
        >
          <MaterialIcons name="palette" size={24} color="black" />
          <Text style={noteCustomizationStyle.tabItemText}>Color</Text>
        </TouchableOpacity>
        {isColorPickerOpen && (
          <View style={noteCustomizationStyle.colorPickerMenu}>
            {colorOptions.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[noteCustomizationStyle.colorOption, { backgroundColor: color }]}
                onPress={() => handleColorSelection(color)}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          style={selectedTab === 'text' ? noteCustomizationStyle.tabItemSelected : noteCustomizationStyle.tabItem}
          onPress={() => handleIconPress('text')}
        >
          <MaterialIcons name="format-italic" size={24} color="black" />
          <Text style={noteCustomizationStyle.tabItemText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'calendar' ? noteCustomizationStyle.tabItemSelected : noteCustomizationStyle.tabItem}
          onPress={() => handleIconPress('calendar')}
        >
          <MaterialIcons name="event" size={24} color="black" />
          <Text style={noteCustomizationStyle.tabItemText}>Calendar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isCalendarOpen} transparent={true} animationType ="fade">
        <TouchableWithoutFeedback onPress={() => setIsCalendarOpen(false)}>
          <View style={noteCustomizationStyle.modalBackground}>
            <View style={noteCustomizationStyle.modalContainer}>
              <Calendar
                current={selectedDate}
                minDate={currentDate}
                onDayPress={(day) => {
                  setSelectedDate(new Date(day.dateString));
                  setIsCalendarOpen(false);
                }}
                hideExtraDays={true}
                disableMonthChange={true}
                markedDates={{
                  [selectedDate.toISOString().split('T')[0]]: { selected: true, marked: true },
                }}
              />
              <TextInput
          style={noteCustomizationStyle.selectedDateInput}
          value={selectedDate.toDateString()}
          editable={false}
        />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Toggle switch for italic */}
      {showToggleSwitch && (
        <View style={noteCustomizationStyle.toggleSwitchContainer}>
          <Text>Italic</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isItalicEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleItalic}
            value={isItalicEnabled}
          />
        </View>
      )}
    </View>
  );
};

export default NoteDetailsScreen;

