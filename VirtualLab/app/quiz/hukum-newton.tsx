import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { collection, addDoc } from 'firebase/firestore';
import { auth, db } from '@/config/firebaseConfig';
import Header from '@/app/components/Header';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    question: 'Apa bunyi Hukum Newton I?',
    options: [
      'F = m × a',
      'Benda akan tetap diam atau bergerak lurus beraturan jika tidak ada gaya yang bekerja',
      'Setiap aksi ada reaksi yang sama besar dan berlawanan arah',
      'Momentum selalu kekal'
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    question: 'Rumus Hukum Newton II adalah?',
    options: [
      'F = m / a',
      'F = m + a',
      'F = m × a',
      'F = a / m'
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: 'Jika massa benda 5 kg dan percepatannya 10 m/s², besar gaya yang bekerja adalah?',
    options: [
      '2 N',
      '15 N',
      '50 N',
      '500 N'
    ],
    correctAnswer: 2
  },
  {
    id: 4,
    question: 'Apa bunyi Hukum Newton III?',
    options: [
      'Gaya sebanding dengan massa',
      'Benda diam tetap diam',
      'Setiap aksi ada reaksi yang sama besar dan berlawanan arah',
      'Percepatan berbanding terbalik dengan massa'
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    question: 'Contoh penerapan Hukum Newton III dalam kehidupan sehari-hari adalah?',
    options: [
      'Mobil bergerak dengan kecepatan konstan',
      'Bola jatuh ke tanah',
      'Roket meluncur ke atas dengan mengeluarkan gas ke bawah',
      'Benda terapung di air'
    ],
    correctAnswer: 2
  }
];

export default function QuizHukumNewtonScreen() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Load saved answer when changing question
  useEffect(() => {
    setSelectedAnswer(answers[currentQuestion]);
  }, [currentQuestion]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (index: number) => {
    setSelectedAnswer(index);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = index;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = async () => {
    const score = answers.reduce((total, answer, index) => {
      if (answer === questions[index].correctAnswer) {
        return total + 20; // Each question worth 20 points
      }
      return total;
    }, 0);

    const correctAnswers = answers.filter((answer, index) => answer === questions[index].correctAnswer).length;
    const duration = 300 - timeLeft; // Calculate time taken
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    const durationString = `${mins}m ${secs}s`;

    // Save to Firestore
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error('No user logged in');
        return;
      }

      await addDoc(collection(db, `users/${user.uid}/quizHistory`), {
        title: 'Quiz Hukum Newton',
        score: score,
        maxScore: 100,
        date: new Date().toISOString(),
        duration: durationString,
        status: 'completed',
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Error saving quiz result:', error);
    }

    Alert.alert(
      'Quiz Selesai',
      `Skor Anda: ${score}/100\n\nJawaban benar: ${correctAnswers} dari ${questions.length}`,
      [
        {
          text: 'Lihat Riwayat',
          onPress: () => router.replace('/quiz-history')
        },
        {
          text: 'Kembali ke Quiz',
          onPress: () => router.back()
        }
      ]
    );
  };

  const currentQ = questions[currentQuestion];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Quiz Hukum Newton" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <Text style={styles.progressText}>
            Soal {currentQuestion + 1} dari {questions.length}
          </Text>
          <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        </View>

        {/* Question Card */}
        <View style={styles.questionCard}>
          <Text style={styles.questionText}>{currentQ.question}</Text>

          {/* Options */}
          <View style={styles.optionsContainer}>
            {currentQ.options.map((option, index) => (
              <Pressable
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.optionButtonSelected
                ]}
                onPress={() => handleSelectAnswer(index)}
              >
                <View style={[
                  styles.radioCircle,
                  selectedAnswer === index && styles.radioCircleSelected
                ]}>
                  {selectedAnswer === index && <View style={styles.radioDot} />}
                </View>
                <Text style={[
                  styles.optionText,
                  selectedAnswer === index && styles.optionTextSelected
                ]}>
                  {option}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.navigationContainer}>
          <Pressable
            style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
            onPress={handlePrevious}
            disabled={currentQuestion === 0}
          >
            <Text style={styles.navButtonText}>← Sebelumnya</Text>
          </Pressable>

          <Pressable
            style={styles.navButton}
            onPress={handleNext}
          >
            <Text style={styles.navButtonText}>
              {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya →'}
            </Text>
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
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  timerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
  },
  questionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionButtonSelected: {
    backgroundColor: '#eff6ff',
    borderColor: '#2563eb',
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#2563eb',
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2563eb',
  },
  optionText: {
    fontSize: 15,
    color: '#475569',
    flex: 1,
    lineHeight: 22,
  },
  optionTextSelected: {
    color: '#1e293b',
    fontWeight: '500',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  navButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
});
