import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '@/config/firebaseConfig';
import Header from '@/app/components/Header';

export default function ChangePasswordScreen() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChangePassword = async () => {
    // Validasi
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'Mohon isi semua field');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password baru minimal 6 karakter');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Password baru dan konfirmasi password tidak sama');
      return;
    }

    if (currentPassword === newPassword) {
      Alert.alert('Error', 'Password baru harus berbeda dari password lama');
      return;
    }

    setIsLoading(true);

    try {
      const user = auth.currentUser;
      
      if (!user || !user.email) {
        Alert.alert('Error', 'User tidak ditemukan. Silakan login kembali.');
        return;
      }

      // Re-authenticate user dengan password lama
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);

      // Update password
      await updatePassword(user, newPassword);

      Alert.alert(
        'Berhasil',
        'Password berhasil diubah',
        [
          {
            text: 'OK',
            onPress: () => router.back()
          }
        ]
      );
    } catch (error: any) {
      console.error('Change password error:', error);
      
      let errorMessage = 'Terjadi kesalahan saat mengubah password';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Password lama salah';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password baru terlalu lemah';
      } else if (error.code === 'auth/requires-recent-login') {
        errorMessage = 'Sesi login sudah terlalu lama. Silakan logout dan login kembali.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Koneksi internet bermasalah';
      }
      
      Alert.alert('Gagal Ubah Password', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Ubah Password" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <Text style={styles.instruction}>
              Masukkan password lama dan password baru Anda
            </Text>

            {/* Form */}
            <View style={styles.formContainer}>
              <Text style={styles.label}>Password Lama</Text>
              <TextInput
                style={styles.input}
                placeholder="Masukkan password lama"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <Text style={styles.label}>Password Baru</Text>
              <TextInput
                style={styles.input}
                placeholder="Minimal 6 karakter"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <Text style={styles.label}>Konfirmasi Password Baru</Text>
              <TextInput
                style={styles.input}
                placeholder="Ulangi password baru"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />

              <Pressable 
                style={[styles.changeButton, isLoading && styles.changeButtonDisabled]} 
                onPress={handleChangePassword}
                disabled={isLoading}
              >
                <Text style={styles.changeButtonText}>
                  {isLoading ? 'Loading...' : 'Ubah Password'}
                </Text>
              </Pressable>

              <Pressable 
                style={styles.cancelButton} 
                onPress={() => router.back()}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Batal</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2563eb',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  instruction: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 25,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#1e293b',
  },
  changeButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
  },
  changeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  changeButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cancelButtonText: {
    color: '#64748b',
    fontSize: 16,
    fontWeight: '600',
  },
});
