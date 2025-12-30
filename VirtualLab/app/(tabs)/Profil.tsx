import { Text, View, StyleSheet, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import { Link, useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import { useEffect, useState } from 'react';

export default function ProfilScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    email: ''
  });

  useEffect(() => {
    // Get current user info
    const user = auth.currentUser;
    if (user) {
      setUserInfo({
        displayName: user.displayName || 'User',
        email: user.email || ''
      });
    }
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Apakah Anda yakin ingin keluar?',
      [
        {
          text: 'Batal',
          style: 'cancel'
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              // Sign out dari Firebase
              await signOut(auth);
              
              // Redirect ke login
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Terjadi kesalahan saat logout');
            }
          }
        }
      ]
    );
  };

  const handleChangePassword = () => {
    router.push('/change-password');
  };

  const handleViewQuizHistory = () => {
    router.push('/quiz-history');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Profil" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          {/* Avatar and Header Info */}
          <View style={styles.headerSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{userInfo.displayName.charAt(0).toUpperCase() || 'U'}</Text>
            </View>
            <Text style={styles.name}>{userInfo.displayName}</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Profile Information */}
          <View style={styles.infoSection}>
            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Nama</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoValue}>{userInfo.displayName}</Text>
              </View>
            </View>

            <View style={styles.infoGroup}>
              <Text style={styles.infoLabel}>Email</Text>
              <View style={styles.infoBox}>
                <Text style={styles.infoValue}>{userInfo.email}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonSection}>
            <Pressable style={styles.primaryButton} onPress={handleViewQuizHistory}>
              <Text style={styles.primaryButtonText}>📊 Lihat Riwayat Quiz</Text>
            </Pressable>

            <Pressable style={styles.primaryButton} onPress={handleChangePassword}>
              <Text style={styles.primaryButtonText}>🔒 Ubah Password</Text>
            </Pressable>

            <Pressable style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </Pressable>
          </View>
        </View>
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
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    marginBottom: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: '#64748b',
  },
  divider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginBottom: 30,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoGroup: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  infoBox: {
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  infoValue: {
    fontSize: 16,
    color: '#1e293b',
  },
  buttonSection: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
