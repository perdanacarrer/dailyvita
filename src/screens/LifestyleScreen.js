import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LifestyleScreen = ({ route, navigation }) => {
  const { selectedConcerns, selectedDiet, selectedAllergies } = route.params; // Receive all previous data
  const [sunExposure, setSunExposure] = useState(null);
  const [smoke, setSmoke] = useState(null);
  const [alcohol, setAlcohol] = useState(null);

  const handleSubmit = () => {
    if (sunExposure !== null && smoke !== null && alcohol !== null) {
      const userData = {
        health_concerns: selectedConcerns,
        diets: selectedDiet ? [selectedDiet] : [],
        is_daily_exposure: sunExposure === 'Yes',
        is_somke: smoke === 'Yes',
        alchol: alcohol,
        allergies: selectedAllergies.map((allergy) => ({
          id: allergy.id,
          name: allergy.name,
        })),
      };
      console.log('User Data:', JSON.stringify(userData, null, 2));
      navigation.navigate('ResultsScreen', { userData });
    } else {
      alert('Please answer all the questions.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Is your daily exposure to sun limited?</Text>
      <TouchableOpacity onPress={() => setSunExposure('Yes')}>
        <Text>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSunExposure('No')}>
        <Text>No</Text>
      </TouchableOpacity>

      <Text>Do you smoke?</Text>
      <TouchableOpacity onPress={() => setSmoke('Yes')}>
        <Text>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setSmoke('No')}>
        <Text>No</Text>
      </TouchableOpacity>

      <Text>Alcohol consumption per week?</Text>
      <TouchableOpacity onPress={() => setAlcohol('0-1')}>
        <Text>0 - 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAlcohol('2-5')}>
        <Text>2 - 5</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setAlcohol('5+')}>
        <Text>5+</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit}>
        <Text>Get my personalized vitamin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default LifestyleScreen;