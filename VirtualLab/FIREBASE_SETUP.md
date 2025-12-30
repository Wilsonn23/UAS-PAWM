# Panduan Setup Firebase Authentication

## 1. Konfigurasi Firebase

✅ **Konfigurasi sudah selesai!** File `config/firebaseConfig.ts` sudah diisi dengan data dari project Firebase Anda:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyAE8g3IH9fghnuc77fsm-Yj-QYoYtcQ4tg",
  authDomain: "virtuallab-b69f8.firebaseapp.com",
  projectId: "virtuallab-b69f8",
  storageBucket: "virtuallab-b69f8.firebasestorage.app",
  messagingSenderId: "663393452055",
  appId: "1:663393452055:android:dbe6e5618f8f81e6269c52"
};
```

## 2. Aktifkan Authentication di Firebase (PENTING!)

⚠️ **Langkah ini wajib dilakukan agar login/register bisa berfungsi:**

1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **virtuallab-b69f8**
3. Di menu sidebar kiri, klik **Authentication**
4. Klik tab **Sign-in method**
5. Cari dan klik **"Email/Password"**
6. Toggle **Enable** menjadi ON (warna biru)
7. Klik **Save**

## 3. Fitur yang Sudah Terimplementasi

✅ **Login dengan Email & Password**
- File: `app/login.tsx`
- Menggunakan Firebase `signInWithEmailAndPassword()`
- Validasi error dengan pesan bahasa Indonesia
- Loading state saat proses login

✅ **Registrasi User Baru**
- File: `app/register.tsx`
- Menggunakan Firebase `createUserWithEmailAndPassword()`
- Update profile dengan display name menggunakan `updateProfile()`
- Validasi password minimal 6 karakter
- Konfirmasi password

✅ **Auth State Persistence**
- File: `app/index.tsx`
- Menggunakan Firebase `onAuthStateChanged()` listener
- Auto-bypass ke Beranda jika sudah login
- Redirect ke Login jika belum login
- Persistence menggunakan AsyncStorage (sudah dikonfigurasi di firebaseConfig.ts)

✅ **Logout**
- File: `app/(tabs)/Profil.tsx`
- Menggunakan Firebase `signOut()`
- Konfirmasi dialog sebelum logout
- Auto-redirect ke login setelah logout

✅ **Display User Profile**
- Menampilkan display name dan email dari Firebase Auth
- Avatar dengan initial nama user
- Update real-time dari Firebase Auth state

## 4. Error Handling

Aplikasi menangani berbagai error Firebase dengan pesan bahasa Indonesia:

### Login Errors:
- `auth/user-not-found` → "User tidak ditemukan"
- `auth/wrong-password` → "Password salah"
- `auth/invalid-email` → "Format email tidak valid"
- `auth/user-disabled` → "Akun ini telah dinonaktifkan"
- `auth/too-many-requests` → "Terlalu banyak percobaan login. Coba lagi nanti"
- `auth/network-request-failed` → "Koneksi internet bermasalah"

### Register Errors:
- `auth/email-already-in-use` → "Email sudah digunakan"
- `auth/invalid-email` → "Format email tidak valid"
- `auth/weak-password` → "Password terlalu lemah"
- `auth/network-request-failed` → "Koneksi internet bermasalah"

## 5. Testing

Untuk testing autentikasi:

1. **Buat akun baru:**
   - Buka halaman Register
   - Isi email, nama lengkap, dan password (minimal 6 karakter)
   - Klik Daftar
   - Akan muncul alert sukses dan redirect ke Login

2. **Login:**
   - Masukkan email dan password yang sudah didaftarkan
   - Klik Login
   - Akan otomatis masuk ke halaman Beranda

3. **Logout:**
   - Buka halaman Profil dari tab navigation
   - Klik tombol Logout
   - Konfirmasi logout
   - Akan kembali ke halaman Login

4. **Auto Login:**
   - Setelah login sukses, tutup aplikasi
   - Buka kembali aplikasi
   - Akan langsung masuk ke Beranda (tidak perlu login lagi)

## 6. Package yang Digunakan

- `firebase` (v10+) - Firebase SDK untuk web
- `@react-native-async-storage/async-storage` - Untuk persistence
- `expo-router` - Untuk navigation

## 7. Next Steps (Opsional)

Fitur tambahan yang bisa ditambahkan:
- Password reset via email
- Email verification
- Update password
- Update profile (nama, foto)
- Social login (Google, Facebook, dll)

## Troubleshooting

**Problem:** "Cannot find module '@/config/firebaseConfig'"
**Solution:** Pastikan TypeScript path alias sudah dikonfigurasi di `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

**Problem:** Error saat import firebase
**Solution:** Restart development server dengan `npx expo start --clear`

**Problem:** Login berhasil tapi tidak redirect
**Solution:** Pastikan `expo-router` sudah dikonfigurasi dengan benar di `app/_layout.tsx`
