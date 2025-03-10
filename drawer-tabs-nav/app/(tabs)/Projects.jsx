import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4NjcyMzYifQ.L-IFqnzCedaG52acx51M-2CgjVQW_uwnyi1Gs9_Wz3I';

export default function ProjectsScreen() {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/project`, {
          headers: {
            'Authorization': `Bearer ${JWT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const projectsData = await response.json();
        console.log('API Response:', projectsData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item);
    return (
      <Pressable
        style={styles.projectContainer}
        onPress={() => {
          if (item && item.id) {
            console.log('Navigating to ProjectDetailsScreen with project ID:', item.id);
            navigation.navigate('ProjectDetailsScreen', { projectId: item.id });
          }
        }}
      >
        <Text style={styles.projectName}>{item.title || 'No Title Available'}</Text>
        <Text style={styles.participantCount}>Participants: {item.participant_count || 'Unknown'}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Projects</Text>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyListText}>No projects available</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  projectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  projectName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantCount: {
    fontSize: 14,
    color: '#FF5A5F',
  },
  emptyListText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});
