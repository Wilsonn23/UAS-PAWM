import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import Card from '@/app/components/Card';
import TitleCard from '@/app/components/TitleCard';

export default function QuizScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Quiz" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <TitleCard 
          title="Pilih Quiz" 
          description="Uji pemahaman Anda tentang berbagai topik fisika" 
          buttonText="Riwayat Quiz"
          buttonLink="/quiz-history"
        />
        <Card 
          title="Quiz Gerak Parabola" 
          description="Uji pemahaman Anda tentang gerak parabola, jangkauan maksimum, dan tinggi maksimum." 
          link="/quiz/gerak-parabola"
          buttonText="Mulai Quiz"
          questionCount={5}
          duration="5 menit"
        />
        <Card 
          title="Quiz Hukum Newton" 
          description="Uji pemahaman Anda tentang Hukum Newton I, II, dan III serta penerapannya dalam kehidupan sehari-hari." 
          link="/quiz/hukum-newton"
          buttonText="Mulai Quiz"
          questionCount={5}
          duration="5 menit"
        />
        <Card 
          title="Quiz Vektor" 
          description="Uji pemahaman Anda tentang vektor, penjumlahan vektor, dan magnitude vektor." 
          link="/quiz/vektor"
          buttonText="Mulai Quiz"
          questionCount={5}
          duration="5 menit"
        />
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
});
