import { Tabs } from 'expo-router';

import Ionicons from '@expo/vector-icons/Ionicons';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tabs.Screen
        name="Beranda"
        options={{
          title: 'Beranda',
        //   order: 1,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profil"
        options={{
          title: 'Profil',
        //   order: 2,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24}/>
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
