import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import allergiesData from '../api/allergies.json';

const AllergiesScreen = ({ navigation }) => {
  const [allergies, setAllergies] = useState([]);
  const [selectedAllergies, setSelectedAllergies] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    setAllergies(allergiesData.data);
  }, []);

  const toggleAllergy = (allergy) => {
    if (selectedAllergies.includes(allergy)) {
      setSelectedAllergies(selectedAllergies.filter((item) => item !== allergy));
    } else {
      setSelectedAllergies([...selectedAllergies, allergy]);
    }
  };

  const filteredAllergies = allergies.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Write any specific allergies or sensitivities towards specific things (optional):
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Search for an allergy..."
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      <FlatList
        data={filteredAllergies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.allergyItem,
              selectedAllergies.includes(item.name) && styles.allergyItemSelected,
            ]}
            onPress={() => toggleAllergy(item.name)}
          >
            <Text
              style={[
                styles.allergyText,
                selectedAllergies.includes(item.name) && styles.allergyTextSelected,
              ]}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('LifestyleScreen', { selectedAllergies })}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  allergyItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  allergyItemSelected: {
    backgroundColor: '#f28049',
  },
  allergyText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  allergyTextSelected: {
    color: '#fff',
  },
  nextButton: {
    marginTop: 20,
    backgroundColor: '#f28049',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AllergiesScreen;