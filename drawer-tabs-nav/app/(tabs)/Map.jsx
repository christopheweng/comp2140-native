import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { WebView } from 'react-native-webview';

export default function MapScreen({ visitedLocations }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show visited locations on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          setError('Location permission denied');
          setLoading(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();
  }, []);

  const generateMapUrl = () => {
    let mapUrl = 'https://www.google.com/maps/embed/v1/view?key=MY_GOOGLE_MAPS_API_KEY';// THIS WILL WORK ONCE I USED Google Cloud Platform GET API
    if (location) {
      mapUrl += `&center=${location.latitude},${location.longitude}&zoom=15`;
    } else {
      mapUrl += '&center=-27.4975,153.0137&zoom=15'; // defult in queenslam=nd university
    }

    if (visitedLocations && visitedLocations.length > 0) {
      visitedLocations.forEach(location => {
        mapUrl += `&markers=color:blue|label:${location.latitude},${location.longitude}`;
      });
    }

    return mapUrl;
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading map...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StoryPath Map</Text>
      <WebView
        source={{ uri: generateMapUrl() }}
        style={{ flex: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#FF5A5F',
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
