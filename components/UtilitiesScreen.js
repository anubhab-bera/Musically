import React from 'react';
import { View, Image } from 'react-native';

const UtilitiesScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{ uri: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3Frdzlrc2kydG1pc2xzanhtN3I3Y3NmbmNtanBrYmlkeTQxaTcyMSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/zwDNti5vWFujS/giphy.gif' }}
        style={{ width: 300, height: 300 }}
      />
    </View>
  );
};

export default UtilitiesScreen;
