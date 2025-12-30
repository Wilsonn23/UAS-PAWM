import { Text, ScrollView, View, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import Svg, { Path, Circle, Line, Text as SvgText } from 'react-native-svg';
import Slider from '@react-native-community/slider';

export default function GerakParabola() {
  const [velocity, setVelocity] = useState(10);
  const [angle, setAngle] = useState(45);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const g = 9.8; // gravitasi m/s²

  // Perhitungan fisika
  const angleRad = (angle * Math.PI) / 180;
  const vx = velocity * Math.cos(angleRad);
  const vy = velocity * Math.sin(angleRad);
  const maxHeight = (velocity * velocity * Math.sin(angleRad) * Math.sin(angleRad)) / (2 * g);
  const maxRange = (velocity * velocity * Math.sin(2 * angleRad)) / g;
  const totalTime = (2 * velocity * Math.sin(angleRad)) / g;

  // Generate path untuk parabola
  const generatePath = () => {
    const scale = 30; // skala pixel per meter
    const points: string[] = [];
    const steps = 50;
    
    for (let i = 0; i <= steps; i++) {
      const t = (totalTime * i) / steps;
      const x = vx * t;
      const y = vy * t - 0.5 * g * t * t;
      const px = 50 + x * scale;
      const py = 350 - y * scale;
      
      if (i === 0) {
        points.push(`M ${px} ${py}`);
      } else {
        points.push(`L ${px} ${py}`);
      }
    }
    
    return points.join(' ');
  };

  // Posisi bola saat animasi
  const ballX = 50 + vx * currentTime * 30;
  const ballY = 350 - (vy * currentTime - 0.5 * g * currentTime * currentTime) * 30;

  // Animasi
  useEffect(() => {
    let interval: any;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 0.05;
          if (next >= totalTime) {
            setIsAnimating(false);
            return 0;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isAnimating, totalTime]);

  const startSimulation = () => {
    setCurrentTime(0);
    setIsAnimating(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Gerak Parabola" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Link href="/(tabs)/Beranda" style={styles.backButton}>
          <View style={styles.backButtonContent}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
            <Text style={styles.backButtonText}>Kembali</Text>
          </View>
        </Link>

        <View style={styles.card}>
          <Text style={styles.mainTitle}>Gerak Parabola</Text>
          
          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Gerak parabola adalah gerak yang terdiri dari dua komponen kecepatan (kecepatan sumbu-x dan sumbu-y) dan seluruh lintasannya dipengaruhi oleh gaya gravitasi.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Pada gerak parabola, benda akan bergerak mengikuti lintasan melengkung akibat pengaruh gravitasi. 
              Kecepatan benda pada sumbu-x akan konstan karena tidak ada gaya yang mempengaruhi arahnya. 
              Sementara itu, kecepatan benda pada sumbu-y akan mengalami GLBB diperlambat akibat pengaruh percepatan gravitasi.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Karakteristik Gerak Parabola:</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Lintasan berbentuk parabola</Text>
              <Text style={styles.bulletItem}>• Kecepatan horizontal konstan</Text>
              <Text style={styles.bulletItem}>• Kecepatan vertikal berubah karena gravitasi</Text>
              <Text style={styles.bulletItem}>• Percepatan vertikal = -g (gravitasi)</Text>
              <Text style={styles.bulletItem}>• Percepatan horizontal = 0</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Rumus-rumus Gerak Parabola:</Text>
            
            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>1. Komponen Kecepatan Awal</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>vₓ = v₀ cos θ</Text>
                <Text style={styles.formula}>vᵧ = v₀ sin θ</Text>
              </View>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>2. Waktu untuk Mencapai Tinggi Maksimum</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>t = (v₀ sin θ) / g</Text>
              </View>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>3. Tinggi Maksimum</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>h = (v₀² sin² θ) / 2g</Text>
              </View>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>4. Jarak Mendatar Maksimum (Jangkauan)</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>x = (v₀² sin 2θ) / g</Text>
              </View>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>5. Waktu Total di Udara</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>T = (2v₀ sin θ) / g</Text>
              </View>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaDescription}>
                dimana:
              </Text>
              <Text style={styles.formulaDescription}>v₀ = Kecepatan awal (m/s)</Text>
              <Text style={styles.formulaDescription}>θ = Sudut elevasi (derajat)</Text>
              <Text style={styles.formulaDescription}>g = Percepatan gravitasi (9.8 m/s²)</Text>
              <Text style={styles.formulaDescription}>vₓ = Komponen kecepatan horizontal (m/s)</Text>
              <Text style={styles.formulaDescription}>vᵧ = Komponen kecepatan vertikal (m/s)</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Penerapan</Text>
            <Text style={styles.paragraph}>
              Menendang bola: ketika kita menendang sepak bola ke gawang, maka bola akan melambung membentuk lintasan parabola sebelum jatuh ke permukaan jika ditendang dengan sudut elevasi tertentu.
            </Text>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/parabola-illustration.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Soal</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                Sebuah bola ditendang dengan kecepatan awal 20 m/s dan sudut elevasi 30°. 
                Jika g = 10 m/s², tentukan:
              </Text>
              <Text style={styles.exampleText}>a) Tinggi maksimum yang dicapai</Text>
              <Text style={styles.exampleText}>b) Jarak mendatar maksimum</Text>
              
              <Text style={styles.exampleTitle}>Penyelesaian:</Text>
              
              <Text style={styles.exampleSubtitle}>a) Tinggi maksimum:</Text>
              <Text style={styles.exampleText}>
                h = (v₀² sin² θ) / 2g
              </Text>
              <Text style={styles.exampleText}>
                h = (20² × sin² 30°) / (2 × 10)
              </Text>
              <Text style={styles.exampleText}>
                h = (400 × 0.25) / 20
              </Text>
              <Text style={styles.exampleText}>
                h = 5 meter
              </Text>
              
              <Text style={styles.exampleSubtitle}>b) Jarak mendatar maksimum:</Text>
              <Text style={styles.exampleText}>
                x = (v₀² sin 2θ) / g
              </Text>
              <Text style={styles.exampleText}>
                x = (20² × sin 60°) / 10
              </Text>
              <Text style={styles.exampleText}>
                x = (400 × 0.866) / 10
              </Text>
              <Text style={styles.exampleText}>
                x ≈ 34.64 meter
              </Text>
            </View>
          </View>

          {/* Simulasi Lab */}
          <View style={styles.simulationCard}>
            <Text style={styles.simulationTitle}>Lab Gerak Parabola</Text>
            <Text style={styles.simulationDescription}>
              Simulasikan lintasan proyektil (peluru) yang dipengaruhi oleh gravitasi dengan mengubah kecepatan awal (v₀) dan sudut elevasi (θ).
            </Text>

            <View style={styles.simContent}>
              {/* Parameter */}
              <View style={styles.parameterSection}>
                <Text style={styles.parameterTitle}>Parameter Awal</Text>
                
                <View style={styles.parameterGroup}>
                  <Text style={styles.parameterLabel}>Kecepatan Awal (v₀):</Text>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={5}
                      maximumValue={30}
                      value={velocity}
                      onValueChange={setVelocity}
                      minimumTrackTintColor="#2563eb"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#2563eb"
                      disabled={isAnimating}
                    />
                    <Text style={styles.sliderValue}>{velocity.toFixed(0)} m/s</Text>
                  </View>
                </View>

                <View style={styles.parameterGroup}>
                  <Text style={styles.parameterLabel}>Sudut Elevasi (θ):</Text>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={15}
                      maximumValue={75}
                      value={angle}
                      onValueChange={setAngle}
                      minimumTrackTintColor="#2563eb"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#2563eb"
                      disabled={isAnimating}
                    />
                    <Text style={styles.sliderValue}>{angle.toFixed(0)}°</Text>
                  </View>
                </View>

                <Pressable 
                  style={[styles.startButton, isAnimating && styles.startButtonDisabled]} 
                  onPress={startSimulation}
                  disabled={isAnimating}
                >
                  <Text style={styles.startButtonText}>
                    {isAnimating ? 'Simulasi Berjalan...' : 'Mulai Simulasi'}
                  </Text>
                </Pressable>
              </View>

              {/* Canvas Visualisasi */}
              <View style={styles.canvasSection}>
                <Text style={styles.canvasSectionTitle}>Visualisasi Gerak</Text>
                <View style={styles.canvas}>
                  <Svg width="100%" height="100%" viewBox="0 0 400 400">
                    {/* Ground */}
                    <Line x1="0" y1="350" x2="400" y2="350" stroke="#666" strokeWidth="2" />
                    
                    {/* Grid vertikal */}
                    {[...Array(9)].map((_, i) => (
                      <Line 
                        key={`v${i}`}
                        x1={50 + i * 40} 
                        y1="0" 
                        x2={50 + i * 40} 
                        y2="350" 
                        stroke="#333" 
                        strokeWidth="0.5" 
                      />
                    ))}
                    
                    {/* Grid horizontal */}
                    {[...Array(9)].map((_, i) => (
                      <Line 
                        key={`h${i}`}
                        x1="0" 
                        y1={i * 40} 
                        x2="400" 
                        y2={i * 40} 
                        stroke="#333" 
                        strokeWidth="0.5" 
                      />
                    ))}
                    
                    {/* Trajectory path */}
                    <Path
                      d={generatePath()}
                      stroke="#3b82f6"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="5,5"
                    />
                    
                    {/* Ball */}
                    {isAnimating && ballY <= 350 && (
                      <Circle
                        cx={ballX}
                        cy={ballY}
                        r="8"
                        fill="#ef4444"
                      />
                    )}
                    
                    {/* Start position */}
                    <Circle cx="50" cy="350" r="4" fill="#10b981" />
                  </Svg>
                </View>
              </View>

              {/* Hasil */}
              <View style={styles.resultSection}>
                <Text style={styles.resultTitle}>Hasil Perhitungan</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Tinggi Maksimum:</Text>
                  <Text style={styles.resultValue}>{maxHeight.toFixed(2)} m</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Jangkauan Maksimum:</Text>
                  <Text style={styles.resultValue}>{maxRange.toFixed(2)} m</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Waktu Total:</Text>
                  <Text style={styles.resultValue}>{totalTime.toFixed(2)} s</Text>
                </View>
              </View>
            </View>
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
  backButton: {
    marginBottom: 15,
  },
  backButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#2563eb',
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: '#374151',
    textAlign: 'left',
  },
  bulletList: {
    marginTop: 10,
  },
  bulletItem: {
    fontSize: 15,
    lineHeight: 26,
    color: '#374151',
    marginLeft: 10,
  },
  formulaSection: {
    backgroundColor: '#f0f9ff',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  formulaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e40af',
    marginBottom: 10,
  },
  formulaContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  formula: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginVertical: 2,
  },
  formulaDescription: {
    fontSize: 14,
    color: '#475569',
    marginTop: 5,
  },
  illustrationContainer: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: 250,
  },
  exampleBox: {
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  exampleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400e',
    marginTop: 10,
    marginBottom: 5,
  },
  exampleSubtitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#92400e',
    marginTop: 8,
    marginBottom: 3,
  },
  exampleText: {
    fontSize: 14,
    color: '#78350f',
    lineHeight: 22,
    marginTop: 3,
  },
  simulationButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  simulationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  simulationCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  simulationTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 10,
  },
  simulationDescription: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 20,
  },
  simContent: {
    marginTop: 20,
  },
  parameterSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  parameterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  parameterGroup: {
    marginBottom: 20,
  },
  parameterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginLeft: 10,
    minWidth: 60,
    textAlign: 'right',
  },
  startButton: {
    backgroundColor: '#10b981',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  startButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  canvasSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  canvasSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 10,
    textAlign: 'center',
  },
  canvas: {
    backgroundColor: '#000',
    height: 400,
    borderRadius: 8,
    overflow: 'hidden',
  },
  resultSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  resultLabel: {
    fontSize: 15,
    color: '#475569',
  },
  resultValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2563eb',
  },
});
