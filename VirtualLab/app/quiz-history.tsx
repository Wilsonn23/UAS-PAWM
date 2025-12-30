import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';

export default function QuizHistoryScreen() {
  const router = useRouter();
  const [quizHistory, setQuizHistory] = useState<any[]>([]);

  useEffect(() => {
    loadQuizHistory();
  }, []);

  const loadQuizHistory = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        return;
      }

      const q = query(
        collection(db, `users/${user.uid}/quizHistory`),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const history = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          title: data.title,
          score: data.score,
          maxScore: data.maxScore,
          date: new Date(data.date).toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
          }),
          duration: data.duration,
          status: data.status
        };
      });
      
      setQuizHistory(history);
    } catch (error) {
      console.error('Error loading quiz history:', error);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // Green
    if (score >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Riwayat Quiz" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Riwayat Pengerjaan Quiz</Text>
          <Text style={styles.subtitle}>Lihat hasil quiz yang telah Anda kerjakan</Text>

          {quizHistory.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyText}>Belum ada riwayat quiz</Text>
              <Text style={styles.emptySubtext}>Mulai mengerjakan quiz untuk melihat riwayat Anda</Text>
            </View>
          ) : (
            <View style={styles.historyList}>
              {quizHistory.map((item) => (
                <View key={item.id} style={styles.historyCard}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyTitle}>{item.title}</Text>
                    <View style={[styles.scoreBadge, { backgroundColor: getScoreColor(item.score) }]}>
                      <Text style={styles.scoreText}>{item.score}</Text>
                    </View>
                  </View>

                  <View style={styles.historyDetails}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailIcon}>📅</Text>
                      <Text style={styles.detailText}>{item.date}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailIcon}>⏱️</Text>
                      <Text style={styles.detailText}>{item.duration}</Text>
                    </View>
                  </View>

                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { 
                          width: `${item.score}%`,
                          backgroundColor: getScoreColor(item.score)
                        }
                      ]} 
                    />
                  </View>
                </View>
              ))}
            </View>
          )}

          <Pressable 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Kembali</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 25,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  historyList: {
    marginBottom: 20,
  },
  historyCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  scoreBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  scoreText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyDetails: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  detailText: {
    fontSize: 13,
    color: '#64748b',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  backButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
