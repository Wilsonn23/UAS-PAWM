import { Stack } from 'expo-router';

export default function MateriLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="resultan-vektor" />
      <Stack.Screen name="gerak-parabola" />
      <Stack.Screen name="hukum-newton" />
    </Stack>
  );
}
