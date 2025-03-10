import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';

export default function Tips() {
  const [tips, setTips] = useState([
    "Maintain good coding style.",
    "Conduct thorough requirements analysis before starting a new project.",
    "Pay attention to naming conventions, variables, functions, and files should be clear and descriptive.",
    "Testing code is very important! Do not ignore unit testing.",
    "Learn to use version control tools, such as Git, to manage your code.",
    "Regularly back up your work, especially when storing code locally.",
    "Read official documentation to better understand the usage of tools and libraries.",
    "Break complex features into smaller components for better management and maintenance.",
  ]);

  const handleAddTip = () => {
    const newTips = [
      ...tips,
      "Be patient, learning programming is a step-by-step process."
    ];
    setTips(newTips);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tips</Text>
      <FlatList
        data={tips}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.tipContainer}>
            <Text style={styles.tipText}>{item}</Text>
          </View>
        )}
      />
      <Button
        title="Add More Tips"
        onPress={handleAddTip}
        color="#FF5A5F"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tipContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    width: '100%',
  },
  tipText: {
    fontSize: 16,
  },
});
