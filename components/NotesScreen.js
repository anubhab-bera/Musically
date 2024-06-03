import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import NoteStyles from '../Style/NoteStyles';

const NotesScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await AsyncStorage.getItem('notes');
        if (savedNotes !== null) {
          setNotes(JSON.parse(savedNotes));
        }
      } catch (error) {
        console.error('Error loading notes:', error);
      }
    };

    loadNotes();
  }, [isFocused, route.params?.shouldRefresh]);

  useEffect(() => {
    if (searchText === '') {
      setFilteredNotes(notes);
    } else {
      setFilteredNotes(notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase())));
    }
  }, [searchText, notes]);

  const handleNotePress = (note) => {
    setSelectedNote(note);
    setIsOptionsModalVisible(true);
  };

  const closeModal = () => {
    setIsOptionsModalVisible(false);
  };

  const handleViewNote = (note) => {
    setIsOptionsModalVisible(false);
    navigation.navigate('NoteDetails', { note, isEditable: false });
  };

  const handleEditNote = (note) => {
    setIsOptionsModalVisible(false);
    navigation.navigate('NoteDetails', { note, isEditable: true });
    const updatedNotes = notes.map(item => {
      if (item.id === note.id) {
        return note;
      }
      return item;
    });
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)).catch(error => {
      console.error('Error saving notes:', error);
    });
  };

  const handleDeleteNote = (note) => {
    setIsOptionsModalVisible(false);
    const updatedNotes = notes.filter(item => item.id !== note.id);
    setNotes(updatedNotes);
    AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)).catch(error => {
      console.error('Error saving notes:', error);
    });
  };

  const renderNoteItem = ({ item }) => (
    <TouchableOpacity style={NoteStyles.noteItem} onPress={() => handleNotePress(item)}>
      <Text style={NoteStyles.noteTitle}>{item.title}</Text>
      <Text style={NoteStyles.noteContent}>{item.content}</Text>
    </TouchableOpacity>
  );

  const handleAddNote = () => {
    navigation.navigate('NoteCustomization', { shouldRefresh: true });
  };

  return (
    <View style={NoteStyles.container}>
      <TextInput
        style={NoteStyles.searchBar}
        placeholder="Search notes..."
        onChangeText={setSearchText}
        value={searchText}
      />
      {filteredNotes.length === 0 ? (
        <Text style={NoteStyles.noNotesFound}>No notes found</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          renderItem={renderNoteItem}
          keyExtractor={item => item.id}
          contentContainerStyle={NoteStyles.noteList}
        />
      )}
      <TouchableOpacity style={NoteStyles.addButton} onPress={handleAddNote}>
        <MaterialIcons name="add" size={30} color="white" />
      </TouchableOpacity>
      <Modal
        visible={isOptionsModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={NoteStyles.optionsModal}>
            <View style={NoteStyles.optionsModalContent}>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleViewNote(selectedNote)}>
                <MaterialIcons name="visibility" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>View Note</Text>
              </TouchableOpacity>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleEditNote(selectedNote)}>
                <MaterialIcons name="edit" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>Edit Note</Text>
              </TouchableOpacity>
              <TouchableOpacity style={NoteStyles.modalOption} onPress={() => handleDeleteNote(selectedNote)}>
                <MaterialIcons name="delete" size={24} color="black" />
                <Text style={NoteStyles.modalOptionText}>Delete Note</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default NotesScreen;
