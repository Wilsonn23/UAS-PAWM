import { Stack } from 'expo-router';

export default function QuizLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="gerak-parabola" />
      <Stack.Screen name="hukum-newton" />
      <Stack.Screen name="vektor" />
    </Stack>
  );
}
