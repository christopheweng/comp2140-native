import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const API_BASE_URL = 'https://0b5ff8b0.uqcloud.net/api';
const JWT_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic3R1ZGVudCIsInVzZXJuYW1lIjoiczQ4NjcyMzYifQ.L-IFqnzCedaG52acx51M-2CgjVQW_uwnyi1Gs9_Wz3I';

export default function ProjectDetailsScreen({ route }) {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const projectId = route?.params?.projectId;

  useEffect(() => {
    if (!projectId) {
      setLoading(false);
      setError('No project ID provided.');
      return;
    }

    const fetchProjectDetails = async () => {
      try {
        const requestUrl = `${API_BASE_URL}/project/${projectId}`;
        console.log('Requesting project details from:', requestUrl);

        const response = await fetch(requestUrl, {
          headers: {
            'Authorization': `Bearer ${JWT_TOKEN}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projectData = await response.json();
        console.log('Project Details Response:', projectData);
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project details:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading project details...</Text>
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
      <Text style={styles.title}>{project.title || 'No Title Available'}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text>{project.instructions || 'No instructions provided.'}</Text>

        <Text style={styles.sectionTitle}>Initial Clue</Text>
        <Text>{project.initial_clue || 'No initial clue provided.'}</Text>

        <View style={styles.statsContainer}>
          <Text style={styles.stat}>Points: {project.points || 'N/A'}</Text>
          <Text style={styles.stat}>Locations Visited: {project.locations_visited || 'N/A'}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  detailsContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  stat: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});
