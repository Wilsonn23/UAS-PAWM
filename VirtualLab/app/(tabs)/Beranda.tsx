import { Text, ScrollView, View,  StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/app/components/Button';
import Card from '@/app/components/Card';
import TitleCard from '@/app/components/TitleCard';
import Header from '@/app/components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Virtual Lab Fisika" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <TitleCard title="Selamat Datang di Virtual Lab Fisika" description="Eksplorasi konsep fisika melalui simulasi interaktif" />
        <Card title="Penjumlahan Vektor" description="Pelajari cara menjumlahkan vektor menggunakan metode poligon dan jajaran genjang" />
        <Card title="Gerak Parabola" description="Simulasi gerak proyektil dan analisis lintasan parabola dengan berbagai sudut elevasi" />
        <Card title="Hukum Newton" description="Eksplorasi hukum newton II tentang gerak dan gaya yang memengaruhi pergerakan objek" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#2563eb',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});
