import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity  } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const WishlistScreen = () => {
  const [wishlist, setWishlist] = useState({ songs: [], videos: [] });
  const [activeTab, setActiveTab] = useState('music');

  const fetchWishlist = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('wishlist');
      const storedWishlist = jsonValue ? JSON.parse(jsonValue) : { songs: [], videos: [] };
      setWishlist(storedWishlist);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlist();
    }, [])
  );

  const removeFromWishlist = async (item, itemType) => {
    try {
      let updatedWishlist = { ...wishlist };

      if (itemType === 'music') {
        updatedWishlist.songs = updatedWishlist.songs.filter((wishlistItem) => wishlistItem.id !== item.id);
      } else if (itemType === 'videos') {
        updatedWishlist.videos = updatedWishlist.videos.filter((wishlistItem) => wishlistItem.id !== item.id);
      }

      setWishlist(updatedWishlist);
      await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const WishlistItem = ({ item, type }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeFromWishlist(item, type)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'music' && styles.activeTab]}
          onPress={() => setActiveTab('music')}
        >
          <Text style={styles.tabText}>Music</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'videos' && styles.activeTab]}
          onPress={() => setActiveTab('videos')}
        >
          <Text style={styles.tabText}>Videos</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={activeTab === 'music' ? wishlist.songs : wishlist.videos}
        renderItem={({ item }) => <WishlistItem item={item} type={activeTab} />}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<Text style={styles.noItemsText}>No {activeTab === 'music' ? 'music' : 'videos'} found</Text>}
        contentContainerStyle={styles.listContentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
  },
  activeTab: {
    backgroundColor: '#3498db',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ecf000',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 10,
  },
  noItemsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  listContentContainer: {
    flexGrow: 1,
    padding: 10,
  },
});

export default WishlistScreen;
