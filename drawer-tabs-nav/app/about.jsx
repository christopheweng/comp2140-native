import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

export default function About() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>About Page</Text>
      <Text style={styles.description}>
        Welcome to StoryPath! This application aims to help users explore and learn about different locations through interactive tours and engaging content. Whether you're a student or a visitor, our app provides a fun way to discover interesting places.
      </Text>
      <Text style={styles.description}>
        Features include campus tours, map navigation, and QR code scanning for more in-depth exploration. We hope you enjoy your experience!
      </Text>
      <View style={styles.buttonContainer}>
        <Button onPress={() => router.back()} title="Go Back" color="#FF5A5F" />
        <Button
          onPress={() => router.push('/(tabs)/Projects')}
          title="Go to Projects"
          color="#008080"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF5A5F',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
  },
});
