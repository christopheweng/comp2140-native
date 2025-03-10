import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor='#000' />,
        tabBarActiveTintColor: '#FF5A5F',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        headerTitle: 'Projects', 
      }}
    >
      {/* Projects Tab */}
      <Tabs.Screen
        name='Projects'
        options={{
          tabBarIcon: ({ color }) => <Feather name="briefcase" size={24} color={color} />,
          tabBarLabel: 'Projects',
          headerTitle: 'Projects',
        }}
      />

      {/* Map Tab */}
      <Tabs.Screen
        name='Map'
        options={{
          tabBarIcon: ({ color }) => <Feather name="map" size={24} color={color} />,
          tabBarLabel: 'Map',
          headerTitle: 'Map',
        }}
      />

      {/* QR Code Scanner Tab */}
      <Tabs.Screen
        name='QrCodeScanner'
        options={{
          tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} />,
          tabBarLabel: 'QR Code Scanner',
          headerTitle: 'QR Code Scanner',
        }}
      />
    </Tabs>
  );
}
