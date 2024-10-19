import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
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
          days: 3,
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
    <View style={styles.container}>
      {/* Şehir ve Anlık Hava Durumu Bilgisi */}
      <View style={styles.topContainer}>
        <Text style={styles.title}>{weatherData.location.name}</Text>
        <View style={styles.currentWeatherContainer}>
          <Image
            source={{ uri: `http:${weatherData.current.condition.icon}` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.currentTempText}>
            {weatherData.current.temp_c}°C
          </Text>
          <Text style={styles.currentConditionText}>
            {weatherData.current.condition.text}
          </Text>
        </View>
      </View>

      {/* Gelecek Günler için Hava Durumu */}
      <View style={styles.bottomContainer}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.daysContainer}
          showsHorizontalScrollIndicator={false}
        >
          {weatherData.forecast.forecastday.map((day, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dateText}>{day.date}</Text>
              <Image
                source={{ uri: `http:${day.day.condition.icon}` }}
                style={styles.weatherIcon}
              />
              <Text>{day.day.condition.text}</Text>
              <Text>{day.day.maxtemp_c}°C</Text>
              <Text>{day.day.mintemp_c}°C</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Üstte ve altta içerik
    alignItems: 'center',
    padding: 20,
  },
  topContainer: {
    flex: 2, // Şehir ve anlık hava durumu kısmını ortalar
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  currentWeatherContainer: {
    alignItems: 'center',
  },
  currentTempText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
  },
  currentConditionText: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  bottomContainer: {
    flex: 1, // Gelecek günler kısmını en alta koyar
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20, // Üst kısımdan boşluk
  },
  dayContainer: {
    width: 140,
    height: 180,
    marginHorizontal: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 50,
    height: 50,
    marginBottom: 5,
  },
  errorText: {
    color: 'red',
  },
  daysContainer: {
    paddingVertical: 20,
    flexDirection: 'row',
  },
});

export default Homepage;
