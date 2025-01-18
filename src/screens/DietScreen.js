import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import dietsData from '../api/Diets.json';

const DietScreen = ({ navigation }) => {
  const [selectedDiet, setSelectedDiet] = useState(null);
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    setDiets(dietsData.data);
  }, []);

  const selectDiet = (dietId) => {
    setSelectedDiet(dietId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the diets you follow:</Text>
      <ScrollView contentContainerStyle={styles.dietContainer}>
        {diets.map((diet) => (
          <TouchableOpacity
            key={diet.id}
            style={[
              styles.dietOption,
              selectedDiet === diet.id && styles.dietOptionSelected,
            ]}
            onPress={() => selectDiet(diet.id)}
          >
            <Text
              style={[
                styles.dietLabel,
                selectedDiet === diet.id && styles.dietLabelSelected,
              ]}
            >
              {diet.name}
            </Text>
            {selectedDiet === diet.id && (
              <Text style={styles.dietDescription}>{diet.tool_tip}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('AllergiesScreen', { selectedDiet })}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f6fbf4',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  dietContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  dietOption: {
    width: '90%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  dietOptionSelected: {
    backgroundColor: '#f28049',
  },
  dietLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  dietLabelSelected: {
    color: '#fff',
  },
  dietDescription: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#f28049',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default DietScreen;