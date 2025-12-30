import { Text, ScrollView, View, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState, useEffect } from 'react';
import Svg, { Rect, Line, Text as SvgText, Polygon } from 'react-native-svg';
import Slider from '@react-native-community/slider';

export default function HukumNewton() {
  const [mass, setMass] = useState(1);
  const [force, setForce] = useState(10);
  const [friction, setFriction] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState(50);
  const [velocity, setVelocity] = useState(0);
  const g = 9.8;

  // Perhitungan fisika
  const normalForce = mass * g;
  const frictionForce = friction * normalForce;
  const netForce = force - frictionForce;
  const acceleration = netForce / mass;

  // Reset posisi
  const resetSimulation = () => {
    setPosition(50);
    setVelocity(0);
    setIsAnimating(false);
  };

  // Animasi
  useEffect(() => {
    let interval: any;
    if (isAnimating) {
      let currentVelocity = 0;
      let currentPosition = 50;
      
      interval = setInterval(() => {
        currentVelocity += acceleration * 0.1;
        currentPosition += currentVelocity * 0.1;
        
        if (currentPosition >= 330) {
          setIsAnimating(false);
          setPosition(330);
          setVelocity(currentVelocity);
          return;
        }
        
        if (currentPosition <= 50) {
          setIsAnimating(false);
          setPosition(50);
          setVelocity(0);
          return;
        }
        
        setPosition(currentPosition);
        setVelocity(currentVelocity);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAnimating, acceleration]);

  const startSimulation = () => {
    resetSimulation();
    setIsAnimating(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Hukum Newton" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Link href="/(tabs)/Beranda" style={styles.backButton}>
          <View style={styles.backButtonContent}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
            <Text style={styles.backButtonText}>Kembali</Text>
          </View>
        </Link>

        <View style={styles.card}>
          <Text style={styles.mainTitle}>Hukum Newton</Text>
          
          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Hukum Newton adalah tiga hukum fisika yang menjadi dasar mekanika klasik. 
              Hukum ini menggambarkan hubungan antara gaya yang bekerja pada suatu benda 
              dan gerak yang dihasilkannya. Ketiga hukum ini dirumuskan oleh Sir Isaac Newton 
              pada abad ke-17 dan menjadi fondasi dalam memahami dinamika benda.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hukum I Newton (Hukum Inersia)</Text>
            <View style={styles.lawBox}>
              <Text style={styles.lawText}>
                "Setiap benda akan tetap diam atau bergerak lurus beraturan kecuali ada 
                gaya luar yang bekerja padanya."
              </Text>
            </View>
            <Text style={styles.paragraph}>
              Hukum ini menjelaskan konsep inersia atau kelembaman. Artinya, benda cenderung 
              mempertahankan keadaannya. Benda yang diam akan tetap diam, dan benda yang 
              bergerak akan tetap bergerak dengan kecepatan konstan jika tidak ada gaya yang 
              mempengaruhinya.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hukum II Newton (Hukum Aksi-Reaksi Gaya)</Text>
            <View style={styles.lawBox}>
              <Text style={styles.lawText}>
                "Percepatan yang dialami suatu benda berbanding lurus dengan gaya yang 
                bekerja padanya dan berbanding terbalik dengan massanya."
              </Text>
            </View>
            
            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>Rumus Matematis:</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>F = m × a</Text>
              </View>
              <Text style={styles.formulaDescription}>dimana:</Text>
              <Text style={styles.formulaDescription}>F = Gaya (Newton)</Text>
              <Text style={styles.formulaDescription}>m = Massa benda (kg)</Text>
              <Text style={styles.formulaDescription}>a = Percepatan (m/s²)</Text>
            </View>

            <Text style={styles.paragraph}>
              Hukum ini adalah hukum yang paling sering digunakan dalam perhitungan fisika. 
              Semakin besar gaya yang diberikan, semakin besar percepatan yang dihasilkan. 
              Sebaliknya, semakin besar massa benda, semakin kecil percepatannya untuk gaya 
              yang sama.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hukum III Newton (Hukum Aksi-Reaksi)</Text>
            <View style={styles.lawBox}>
              <Text style={styles.lawText}>
                "Untuk setiap aksi, selalu ada reaksi yang sama besar tetapi berlawanan arah."
              </Text>
            </View>
            
            <View style={styles.formulaSection}>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>F_aksi = -F_reaksi</Text>
              </View>
            </View>

            <Text style={styles.paragraph}>
              Hukum ini menjelaskan bahwa gaya selalu muncul berpasangan. Ketika suatu benda 
              memberikan gaya pada benda lain, benda kedua akan memberikan gaya yang sama besar 
              tetapi berlawanan arah pada benda pertama.
            </Text>

            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>
                • Contoh: Saat mendorong dinding, dinding mendorong kita balik dengan gaya 
                yang sama
              </Text>
              <Text style={styles.bulletItem}>
                • Contoh: Roket melontarkan gas ke belakang, gas mendorong roket ke depan
              </Text>
              <Text style={styles.bulletItem}>
                • Contoh: Saat berjalan, kaki mendorong tanah ke belakang, tanah mendorong 
                kaki ke depan
              </Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aplikasi Hukum Newton II</Text>
            
            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>Gerak pada Bidang Datar</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>ΣF = m × a</Text>
                <Text style={styles.formula}>F - f = m × a</Text>
              </View>
              <Text style={styles.formulaDescription}>
                f = gaya gesek = μ × N
              </Text>
              <Text style={styles.formulaDescription}>
                N = gaya normal = m × g
              </Text>
            </View>

            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>Gerak pada Bidang Miring</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>ΣF = m × a</Text>
                <Text style={styles.formula}>mg sin θ - f = m × a</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Penerapan</Text>
            <Text style={styles.paragraph}>
                Mendorong benda: Ketika kita mendorong benda, gaya yang kita berikan kepada benda untuk mendorongnya sangat mempengaruhi percepatan geraknya. Semakin besar gaya, maka semakin besar percepatan geraknya.
            </Text>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/newton-illustration.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Soal</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                Sebuah mobil dengan massa 1000 kg bergerak dengan percepatan 2 m/s². 
                Jika gaya gesek yang bekerja adalah 500 N, berapakah gaya dorong mesin 
                yang diperlukan?
              </Text>
              
              <Text style={styles.exampleTitle}>Penyelesaian:</Text>
              <Text style={styles.exampleText}>Diketahui:</Text>
              <Text style={styles.exampleText}>• m = 1000 kg</Text>
              <Text style={styles.exampleText}>• a = 2 m/s²</Text>
              <Text style={styles.exampleText}>• f = 500 N</Text>
              
              <Text style={styles.exampleSubtitle}>Menggunakan Hukum II Newton:</Text>
              <Text style={styles.exampleText}>
                ΣF = m × a
              </Text>
              <Text style={styles.exampleText}>
                F - f = m × a
              </Text>
              <Text style={styles.exampleText}>
                F - 500 = 1000 × 2
              </Text>
              <Text style={styles.exampleText}>
                F - 500 = 2000
              </Text>
              <Text style={styles.exampleText}>
                F = 2500 N
              </Text>
              
              <Text style={styles.exampleSubtitle}>Jawaban:</Text>
              <Text style={styles.exampleText}>
                Gaya dorong mesin yang diperlukan adalah 2500 Newton.
              </Text>
            </View>
          </View>

          {/* Simulasi Lab */}
          <View style={styles.simulationCard}>
            <Text style={styles.simulationTitle}>Lab Hukum Newton II</Text>
            <Text style={styles.simulationDescription}>
              Simulasikan pengaruh gaya, massa, dan koefisien gesek terhadap percepatan benda pada bidang datar.
            </Text>

            <View style={styles.simContent}>
              {/* Parameter */}
              <View style={styles.parameterSection}>
                <Text style={styles.parameterTitle}>Parameter Simulasi</Text>
                
                <View style={styles.parameterGroup}>
                  <Text style={styles.parameterLabel}>Massa Objek (m):</Text>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={1}
                      maximumValue={10}
                      value={mass}
                      onValueChange={setMass}
                      minimumTrackTintColor="#2563eb"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#2563eb"
                      disabled={isAnimating}
                    />
                    <Text style={styles.sliderValue}>{mass.toFixed(0)} kg</Text>
                  </View>
                </View>

                <View style={styles.parameterGroup}>
                  <Text style={styles.parameterLabel}>Gaya Dorong (F):</Text>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={1}
                      maximumValue={50}
                      value={force}
                      onValueChange={setForce}
                      minimumTrackTintColor="#2563eb"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#2563eb"
                      disabled={isAnimating}
                    />
                    <Text style={styles.sliderValue}>{force.toFixed(0)} N</Text>
                  </View>
                </View>

                <View style={styles.parameterGroup}>
                  <Text style={styles.parameterLabel}>Koefisien Gesek (μ):</Text>
                  <View style={styles.sliderContainer}>
                    <Slider
                      style={styles.slider}
                      minimumValue={0}
                      maximumValue={0.5}
                      value={friction}
                      onValueChange={setFriction}
                      minimumTrackTintColor="#2563eb"
                      maximumTrackTintColor="#cbd5e1"
                      thumbTintColor="#2563eb"
                      disabled={isAnimating}
                    />
                    <Text style={styles.sliderValue}>{friction.toFixed(2)}</Text>
                  </View>
                </View>

                <View style={styles.buttonRow}>
                  <Pressable 
                    style={[styles.startButton, isAnimating && styles.startButtonDisabled]} 
                    onPress={startSimulation}
                    disabled={isAnimating}
                  >
                    <Text style={styles.startButtonText}>
                      {isAnimating ? 'Simulasi Berjalan...' : 'Mulai Simulasi'}
                    </Text>
                  </Pressable>
                  <Pressable 
                    style={styles.resetButton} 
                    onPress={resetSimulation}
                  >
                    <Text style={styles.resetButtonText}>Reset</Text>
                  </Pressable>
                </View>
              </View>

              {/* Canvas Visualisasi */}
              <View style={styles.canvasSection}>
                <Text style={styles.canvasSectionTitle}>Visualisasi Gerak</Text>
                <View style={styles.canvas}>
                  <Svg width="100%" height="100%" viewBox="0 0 400 250">
                    {/* Ground */}
                    <Rect x="0" y="200" width="400" height="50" fill="#94a3b8" />
                    
                    {/* Grid lines */}
                    {[...Array(10)].map((_, i) => (
                      <Line 
                        key={`grid${i}`}
                        x1={i * 40} 
                        y1="0" 
                        x2={i * 40} 
                        y2="200" 
                        stroke="#333" 
                        strokeWidth="0.5" 
                      />
                    ))}
                    
                    {/* Box */}
                    <Rect 
                      x={position} 
                      y="150" 
                      width="50" 
                      height="50" 
                      fill="#64748b" 
                      stroke="#334155"
                      strokeWidth="2"
                    />
                    
                    {/* Mass label */}
                    <SvgText
                      x={position + 25}
                      y="180"
                      fontSize="14"
                      fill="white"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      {mass.toFixed(0)} kg
                    </SvgText>
                    
                    {/* Force arrow */}
                    {force > 0 && (
                      <>
                        <Line
                          x1={position + 50}
                          y1="175"
                          x2={position + 50 + Math.min(force * 2, 80)}
                          y2="175"
                          stroke="#ef4444"
                          strokeWidth="3"
                        />
                        <Polygon
                          points={`${position + 50 + Math.min(force * 2, 80)},175 ${position + 50 + Math.min(force * 2, 80) - 10},170 ${position + 50 + Math.min(force * 2, 80) - 10},180`}
                          fill="#ef4444"
                        />
                        <SvgText
                          x={position + 50 + Math.min(force * 2, 80) / 2}
                          y="165"
                          fontSize="12"
                          fill="#ef4444"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          F_dorong: {force.toFixed(0)} N
                        </SvgText>
                      </>
                    )}
                  </Svg>
                </View>
              </View>

              {/* Analisis */}
              <View style={styles.resultSection}>
                <Text style={styles.resultTitle}>Analisis Real-Time</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Gaya Gesek (f):</Text>
                  <Text style={styles.resultValue}>{frictionForce.toFixed(2)} N</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Gaya Netto (ΣF):</Text>
                  <Text style={styles.resultValue}>{netForce.toFixed(2)} N</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Percepatan (a):</Text>
                  <Text style={styles.resultValue}>{acceleration.toFixed(2)} m/s²</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Kecepatan (v):</Text>
                  <Text style={styles.resultValue}>{velocity.toFixed(2)} m/s</Text>
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
    marginTop: 10,
  },
  lawBox: {
    backgroundColor: '#e0f2fe',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2563eb',
    marginVertical: 10,
  },
  lawText: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#1e40af',
    lineHeight: 22,
    fontWeight: '500',
  },
  bulletList: {
    marginTop: 10,
  },
  bulletItem: {
    fontSize: 14,
    lineHeight: 24,
    color: '#374151',
    marginLeft: 10,
    marginVertical: 3,
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
  buttonRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  startButton: {
    flex: 1,
    backgroundColor: '#10b981',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 5,
  },
  resetButtonText: {
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
    height: 250,
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
