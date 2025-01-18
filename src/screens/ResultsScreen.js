import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ResultsScreen = ({ route }) => {
  const { userData } = route.params;

  const resultData = {
    health_concerns: userData.health_concerns.map((concern, index) => ({
      id: concern.id,
      name: concern.name,
      priority: index + 1,
    })),
    diets: userData.diets,
    is_daily_exposure: userData.is_daily_exposure,
    is_somke: userData.is_somke,
    alchol: userData.alchol,
    allergies: userData.allergies,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Results</Text>

      <Text style={styles.resultText}>Health Concerns:</Text>
      {resultData.health_concerns.map((concern) => (
        <Text key={concern.id} style={styles.resultText}>
          {concern.name} (Priority {concern.priority})
        </Text>
      ))}

      <Text style={styles.resultText}>
        Diets: {resultData.diets.length > 0 ? resultData.diets.join(', ') : 'None'}
      </Text>

      <Text style={styles.resultText}>
        Sun Exposure: {resultData.is_daily_exposure ? 'Limited' : 'Not Limited'}
      </Text>

      <Text style={styles.resultText}>Smoke: {resultData.is_somke ? 'Yes' : 'No'}</Text>

      <Text style={styles.resultText}>Alcohol: {resultData.alchol}</Text>

      <Text style={styles.resultText}>Allergies:</Text>
      {resultData.allergies.length > 0 ? (
        resultData.allergies.map((allergy) => (
          <Text key={allergy.id} style={styles.resultText}>
            {allergy.name}
          </Text>
        ))
      ) : (
        <Text style={styles.resultText}>No allergies selected</Text>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default ResultsScreen;