import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Homepage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '4752401a35774d8db13102146210412';
  const baseUrl = 'http://api.weatherapi.com/v1';
  const location = 'Istanbul';
  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/forecast.json`, {
        params: {
          key: apiKey,
          q: location,
          days: 5,
        },
      });
      setWeatherData(response.data);
    } catch (error) {
      setError('Veri çekilemedi');
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!weatherData) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Şehir: {weatherData.location.name}</Text>
      <View contentContainerStyle={styles.container}>
      {weatherData.forecast.forecastday.map((day, index) => (
        <View key={index} style={styles.dayContainer}>
          <Text style={styles.dateText}>{day.date}</Text>
          <Text>Hava Durumu: {day.day.condition.text}</Text>
          <Text>Gün Maksimum Sıcaklık: {day.day.maxtemp_c}°C</Text>
          <Text>Gün Minimum Sıcaklık: {day.day.mintemp_c}°C</Text>
        </View>
      ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:"space-around",
    alignItems:"stretch",
    padding: 20,
  },
  title: {
    textAlign:"center",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dayContainer: {
    marginVertical: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
});

export default Homepage;
