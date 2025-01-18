import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import healthConcernsData from '../api/Healthconcern.json';

const HealthConcernsScreen = ({ navigation }) => {
  const [selectedConcerns, setSelectedConcerns] = useState([]);
  const [healthConcerns, setHealthConcerns] = useState([]);

  useEffect(() => {
    setHealthConcerns(healthConcernsData.data);
  }, []);

  const toggleConcern = (concern) => {
    if (selectedConcerns.some((item) => item.id === concern.id)) {
      setSelectedConcerns(selectedConcerns.filter((item) => item.id !== concern.id));
    } else if (selectedConcerns.length < 5) {
      setSelectedConcerns([...selectedConcerns, concern]);
    }
  };

  const isSelected = (id) => selectedConcerns.some((item) => item.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select the top health concerns (up to 5):</Text>
      <View style={styles.concernList}>
        {healthConcerns.map((concern) => (
          <TouchableOpacity
            key={concern.id}
            style={[
              styles.concernOption,
              isSelected(concern.id) && styles.concernOptionSelected,
            ]}
            onPress={() => toggleConcern(concern)}
          >
            <Text
              style={[
                styles.concernLabel,
                isSelected(concern.id) && styles.concernLabelSelected,
              ]}
            >
              {concern.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedConcerns.length > 0 && (
        <>
          <Text style={styles.title}>Prioritize:</Text>
          <DraggableFlatList
            data={selectedConcerns}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, drag, isActive }) => (
              <TouchableOpacity
                style={[
                  styles.dragItem,
                  isActive && styles.activeDragItem,
                ]}
                onLongPress={drag}
              >
                <Text style={styles.dragItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            onDragEnd={({ data }) => setSelectedConcerns(data)}
          />
        </>
      )}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.navigate('DietScreen', { selectedConcerns })}
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
  concernList: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  concernOption: {
    width: '90%',
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  concernOptionSelected: {
    backgroundColor: '#f28049',
  },
  concernLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  concernLabelSelected: {
    color: '#fff',
  },
  dragItem: {
    width: '90%',
    backgroundColor: '#f28049',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  activeDragItem: {
    backgroundColor: '#ff9966',
  },
  dragItemText: {
    fontSize: 16,
    color: '#fff',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#999',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginRight: 10,
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#f28049',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HealthConcernsScreen;