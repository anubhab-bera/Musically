import React, { useState, useEffect } from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Text, Dimensions, ActivityIndicator, Switch, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MaterialIcons } from '@expo/vector-icons';
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

const { height } = Dimensions.get('window');
const NoteCustomizationScreen = ({ navigation }) => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 7);  // Add 7 days to the current date

  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [selectedTab, setSelectedTab] = useState(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [isItalicEnabled, setIsItalicEnabled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [showToggleSwitch, setShowToggleSwitch] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          const parsedNotes = JSON.parse(savedNotes);
          const currentDate = new Date();
          const updatedNotes = parsedNotes.filter(note => new Date(note.date) > currentDate);
          setNotes(updatedNotes);
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
      setLoading(false);
    };

    loadNotes();
  }, []);

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

  const toggleItalic = () => {
    setIsItalicEnabled(!isItalicEnabled);
    setShowToggleSwitch(false);
  };

  const handleBack = () => {
    console.log("back");
    navigation.goBack();
  };

  const handleSave = async () => {
    const newNote = {
      id: Math.random().toString(36).substring(7),
      title: noteTitle,
      content: noteContent,
      color: selectedColor,
      date: selectedDate.toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setNoteTitle('');
    setNoteContent('');

    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      navigation.goBack();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  if (loading) {
    return (
      <View style={noteCustomizationStyle.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

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
        maxLength={25}
        multiline={false}
        numberOfLines={1}
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
          maxLength={150}
          numberOfLines={4}
          scrollEnabled={true}
        />
      </ScrollView>
      {showToggleSwitch && (
        <View style={noteCustomizationStyle.toggleSwitchContainer}>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isItalicEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleItalic}
            value={isItalicEnabled}
          />
        </View>
      )}
      <View style={noteCustomizationStyle.buttonContainer}>
        <TouchableOpacity style={noteCustomizationStyle.saveButton} onPress={handleSave}>
          <Text style={noteCustomizationStyle.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={noteCustomizationStyle.customizationTabContainer}>
        <TouchableOpacity
          style={selectedTab === 'color' ? noteCustomizationStyle.tabItemSelected : noteCustomizationStyle.tabItem}
          onPress={() => {
            setSelectedTab('color');
            setIsColorPickerOpen(!isColorPickerOpen);
          }}
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
          onPress={() => handleTabPress('text')}
        >
          <MaterialIcons name="format-italic" size={24} color="black" />
          <Text style={noteCustomizationStyle.tabItemText}>Text</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedTab === 'calendar' ? noteCustomizationStyle.tabItemSelected : noteCustomizationStyle.tabItem}
          onPress={() => handleTabPress('calendar')}
        >
          <MaterialIcons name="event" size={24} color="black" />
          <Text style={noteCustomizationStyle.tabItemText}>Calendar</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isCalendarOpen} transparent={true} animationType="fade">
        <TouchableOpacity style={noteCustomizationStyle.modalBackground} onPress={() => setIsCalendarOpen(false)}>
          <View style={noteCustomizationStyle.modalContainer}>
            <View style={noteCustomizationStyle.calendarContainer}>
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
            </View>
            <TextInput
              style={noteCustomizationStyle.selectedDateInput}
              value={selectedDate.toDateString()}
              editable={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default NoteCustomizationScreen;
