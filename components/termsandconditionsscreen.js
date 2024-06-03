import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from 'react-native-check-box'
import TermsAndConditionsStyles from '../Style/TermsAndConditionsStyles'; // Import style file

const TermsAndConditionsScreen = () => {
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const navigation = useNavigation();

  const handleContinue = async () => {
    if (isChecked1 && isChecked2) {
      try {
        await AsyncStorage.setItem('acceptedTerms', 'true');
        navigation.navigate('About');
      } catch (error) {
        console.error('Error updating accepted terms:', error);
        Alert.alert('Error', 'Failed to update accepted terms. Please try again later.');
      }
    } else {
      console.log('Please accept both terms and conditions.');
    }
  };

  return (
    <View style={TermsAndConditionsStyles.container}>
      <Text style={TermsAndConditionsStyles.header}>Terms and Conditions</Text>
      <View style={TermsAndConditionsStyles.content}>
        <Text style={[TermsAndConditionsStyles.bodyText, { fontStyle: 'italic' }]}>
          By using this App, you agree to accept all terms and conditions. You must not use this app if you disagree with any of the Standard Terms and Conditions.
        </Text>
        <View style={TermsAndConditionsStyles.checkboxContainer}>
          <CheckBox
            onClick={() => setIsChecked1(!isChecked1)}
            isChecked={isChecked1}
          />
          <Text style={[TermsAndConditionsStyles.checkboxText, { marginTop: Platform.OS === 'ios' ? -2 : 0 }]}> I accept the <Text style={TermsAndConditionsStyles.link}>terms and conditions</Text> of use</Text>
        </View>
        <View style={TermsAndConditionsStyles.checkboxContainer}>
          <CheckBox
             onClick={() => setIsChecked2(!isChecked2)}
            isChecked={isChecked2}
          />
          <Text style={[TermsAndConditionsStyles.checkboxText, { marginTop: Platform.OS === 'ios' ? -2 : 0 }]}> I accept the <Text style={TermsAndConditionsStyles.link}>privacy policy</Text></Text>
        </View>
        <TouchableOpacity
          style={[TermsAndConditionsStyles.button, (isChecked1 && isChecked2) ? {} : TermsAndConditionsStyles.disabledButton]}
          onPress={handleContinue}
          disabled={!isChecked1 || !isChecked2}
        >
          <Text style={TermsAndConditionsStyles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermsAndConditionsScreen;
