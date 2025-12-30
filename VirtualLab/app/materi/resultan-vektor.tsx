import { Text, ScrollView, View, StyleSheet, TextInput, Pressable, Switch, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/app/components/Header';
import { Link } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import Svg, { Line, Circle, Text as SvgText, Defs, Pattern, Rect } from 'react-native-svg';

interface Vector {
  id: number;
  x: number;
  y: number;
  color: string;
}

export default function ResultanVektor() {
  const [vectors, setVectors] = useState<Vector[]>([]);
  const [inputX, setInputX] = useState('');
  const [inputY, setInputY] = useState('');
  const [showGrid, setShowGrid] = useState(true);
  const [vectorColor, setVectorColor] = useState('#3b82f6');

  const addVector = () => {
    const x = parseFloat(inputX) || 0;
    const y = parseFloat(inputY) || 0;
    if (x !== 0 || y !== 0) {
      setVectors([...vectors, { id: Date.now(), x, y, color: vectorColor }]);
      setInputX('');
      setInputY('');
    }
  };

  const clearVectors = () => {
    setVectors([]);
  };

  const resultant = vectors.reduce(
    (acc, v) => ({ x: acc.x + v.x, y: acc.y + v.y }),
    { x: 0, y: 0 }
  );

  const magnitude = Math.sqrt(resultant.x ** 2 + resultant.y ** 2);
  const angle = Math.atan2(resultant.y, resultant.x) * (180 / Math.PI);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2563eb' }}>
      <Header title="Resultan Vektor" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        <Link href="/(tabs)/Beranda" style={styles.backButton}>
          <View style={styles.backButtonContent}>
            <Ionicons name="arrow-back" size={20} color="#2563eb" />
            <Text style={styles.backButtonText}>Kembali</Text>
          </View>
        </Link>

        <View style={styles.card}>
          <Text style={styles.mainTitle}>Resultan Vektor</Text>
          
          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Dalam ilmu fisika, vektor merupakan besaran yang memiliki nilai dan arah. 
              Dalam konteks ini, vektor tidak hanya mencerminkan nilai besaran, tetapi juga 
              mengindikasilkan ke arah mana besaran tersebut bergerak. Contohnya adalah pada 
              konsep gaya, di mana vektor gaya tidak sekadar mencerminkan besar gaya yang 
              bekerja, melainkan juga menunjukkan arah gaya tersebut bekerja.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Besaran vektor adalah besaran yang memiliki dua karakteristik utama, yaitu 
              magnitude (nilai atau besarnya) dan arah. Beberapa contoh besaran vektor mencakup 
              perpindahan, kecepatan, percepatan, momentum, dan gaya. Untuk menyatakan besaran 
              vektor dengan jelas, perlu mencantumkan nilai besaran (dalam bentuk angka) 
              sekaligus menentukan arah yang terkait.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Resultan vektor adalah vektor tunggal yang merupakan hasil dari penjumlahan atau 
              penggabungan dari two atau lebih vektor. Resultan ini mencerminkan total efek atau 
              dampak dari vektor-vektor tersebut, baik dalam hal magnitude (besarnya) maupun arahnya.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.paragraph}>
              Dalam konteks fisika, resultan vektor digunakan untuk menggambarkan hasil akhir 
              dari berbagai gaya atau vektor yang bekerja pada suatu objek, membantu dalam 
              menganalisis pergerakan atau keseimbangan benda dalam suatu sistem.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Berikut ini rumus yang berkaitan dengan vektor:</Text>
            
            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>Besar resultan</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formula}>R = √(F₁² + F₂² + 2F₁F₂cosθ)</Text>
              </View>
              <Text style={styles.formulaDescription}>
                dimana:
              </Text>
              <Text style={styles.formulaDescription}>
                R = Resultan vektor (N)
              </Text>
              <Text style={styles.formulaDescription}>
                F₁ = Vektor gaya pertama (N)
              </Text>
              <Text style={styles.formulaDescription}>
                F₂ = Vektor gaya kedua (N)
              </Text>
              <Text style={styles.formulaDescription}>
                θ = Sudut antara kedua vektor (derajat)
              </Text>
            </View>
            <View style={styles.formulaSection}>
              <Text style={styles.formulaTitle}>Penjumlahan/Pengurangan Vektor</Text>
              <View style={styles.formulaContainer}>
                <Text style={styles.formulaDescription}>Jika diketahui Vektor a = (p, q, r) dan Vektor B = (x, y, z), maka</Text>
                <Text style={styles.formula}></Text>
                <Text style={styles.formula}>a+b = (p+x, q+y, r+z)</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Penerapan</Text>
            <Text style={styles.paragraph}>
                Perahu menyeberangi sungai: Kecepatan perahu melintasi sungai memanfaatkan penjumlahan vektor kecepatan perahu dan kecepatan arus air sungai, baik searah maupun berlawanan.
            </Text>
            <View style={styles.illustrationContainer}>
              <Image
                source={require('@/assets/images/vektor-illustration.png')}
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contoh Soal</Text>
            <View style={styles.exampleBox}>
              <Text style={styles.exampleText}>
                Dua vektor gaya F₁ = 10 N dan F₂ = 15 N membentuk sudut 60°. 
                Tentukan besar resultan vektor!
              </Text>
              <Text style={styles.exampleTitle}>Penyelesaian:</Text>
              <Text style={styles.exampleText}>
                R = √(10² + 15² + 2(10)(15)cos60°)
              </Text>
              <Text style={styles.exampleText}>
                R = √(100 + 225 + 300(0.5))
              </Text>
              <Text style={styles.exampleText}>
                R = √(100 + 225 + 150)
              </Text>
              <Text style={styles.exampleText}>
                R = √475
              </Text>
              <Text style={styles.exampleText}>
                R ≈ 21.79 N
              </Text>
            </View>
          </View>

          {/* Simulasi Lab */}
          <View style={styles.simulationCard}>
            <Text style={styles.simulationTitle}>Lab Resultan Vektor</Text>
            <Text style={styles.simulationDescription}>
              Simulasikan penjumlahan vektor dengan menambahkan vektor menggunakan koordinat (x,y). 
              Resultan akan ditampilkan sebagai panah hijau ketika terdapat minimal 2 vektor.
            </Text>

            <View style={styles.simContent}>
              {/* Form Input */}
              <View style={styles.inputSection}>
                <Text style={styles.inputSectionTitle}>Tambah Vektor</Text>
                
                <Text style={styles.inputLabel}>Koordinat X (px):</Text>
                <TextInput
                  style={styles.input}
                  value={inputX}
                  onChangeText={setInputX}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#999"
                />

                <Text style={styles.inputLabel}>Koordinat Y (px):</Text>
                <TextInput
                  style={styles.input}
                  value={inputY}
                  onChangeText={setInputY}
                  keyboardType="numeric"
                  placeholder="0"
                  placeholderTextColor="#999"
                />

                <View style={styles.colorSection}>
                  <Text style={styles.inputLabel}>Warna vektor:</Text>
                  <View style={styles.colorOptions}>
                    {['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e'].map((color) => (
                      <Pressable
                        key={color}
                        style={[
                          styles.colorButton,
                          { backgroundColor: color },
                          vectorColor === color && styles.colorButtonSelected,
                        ]}
                        onPress={() => setVectorColor(color)}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.switchContainer}>
                  <Text style={styles.inputLabel}>Tampilkan grid & origin</Text>
                  <Switch
                    value={showGrid}
                    onValueChange={setShowGrid}
                    trackColor={{ false: '#ccc', true: '#2563eb' }}
                    thumbColor={showGrid ? '#fff' : '#f4f4f4'}
                  />
                </View>

                <View style={styles.buttonRow}>
                  <Pressable style={styles.addButton} onPress={addVector}>
                    <Text style={styles.addButtonText}>Tambah Vektor</Text>
                  </Pressable>
                  <Pressable style={styles.clearButton} onPress={clearVectors}>
                    <Text style={styles.clearButtonText}>Hapus Semua</Text>
                  </Pressable>
                </View>
              </View>

              {/* Canvas Visualisasi */}
              <View style={styles.canvasSection}>
                <Text style={styles.canvasSectionTitle}>Visualisasi Vektor</Text>
                <View style={styles.canvas}>
                  <Svg width="100%" height="100%" viewBox="0 0 400 400">
                    <Defs>
                      {showGrid && (
                        <Pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <Rect width="20" height="20" fill="none" />
                          <Line x1="0" y1="0" x2="0" y2="20" stroke="#333" strokeWidth="0.5" />
                          <Line x1="0" y1="0" x2="20" y2="0" stroke="#333" strokeWidth="0.5" />
                        </Pattern>
                      )}
                    </Defs>
                    
                    {showGrid && <Rect width="400" height="400" fill="url(#grid)" />}
                    
                    {/* Axis */}
                    {showGrid && (
                      <>
                        <Line x1="0" y1="200" x2="400" y2="200" stroke="#666" strokeWidth="1.5" />
                        <Line x1="200" y1="0" x2="200" y2="400" stroke="#666" strokeWidth="1.5" />
                        <Circle cx="200" cy="200" r="3" fill="#fff" />
                      </>
                    )}

                    {/* Draw vectors */}
                    {vectors.map((vector, index) => {
                      const startX = index === 0 ? 200 : 200 + vectors.slice(0, index).reduce((sum, v) => sum + v.x, 0);
                      const startY = index === 0 ? 200 : 200 - vectors.slice(0, index).reduce((sum, v) => sum + v.y, 0);
                      const endX = startX + vector.x;
                      const endY = startY - vector.y;
                      
                      const angle = Math.atan2(-(vector.y), vector.x);
                      const arrowSize = 8;
                      const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
                      const arrowY1 = endY + arrowSize * Math.sin(angle - Math.PI / 6);
                      const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
                      const arrowY2 = endY + arrowSize * Math.sin(angle + Math.PI / 6);

                      return (
                        <React.Fragment key={vector.id}>
                          <Line
                            x1={startX}
                            y1={startY}
                            x2={endX}
                            y2={endY}
                            stroke={vector.color}
                            strokeWidth="2"
                          />
                          <Line x1={endX} y1={endY} x2={arrowX1} y2={arrowY1} stroke={vector.color} strokeWidth="2" />
                          <Line x1={endX} y1={endY} x2={arrowX2} y2={arrowY2} stroke={vector.color} strokeWidth="2" />
                        </React.Fragment>
                      );
                    })}

                    {/* Draw resultant */}
                    {vectors.length >= 2 && (
                      <>
                        <Line
                          x1="200"
                          y1="200"
                          x2={200 + resultant.x}
                          y2={200 - resultant.y}
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeDasharray="5,5"
                        />
                        {(() => {
                          const endX = 200 + resultant.x;
                          const endY = 200 - resultant.y;
                          const angle = Math.atan2(-resultant.y, resultant.x);
                          const arrowSize = 10;
                          const arrowX1 = endX - arrowSize * Math.cos(angle - Math.PI / 6);
                          const arrowY1 = endY + arrowSize * Math.sin(angle - Math.PI / 6);
                          const arrowX2 = endX - arrowSize * Math.cos(angle + Math.PI / 6);
                          const arrowY2 = endY + arrowSize * Math.sin(angle + Math.PI / 6);
                          
                          return (
                            <>
                              <Line x1={endX} y1={endY} x2={arrowX1} y2={arrowY1} stroke="#10b981" strokeWidth="3" />
                              <Line x1={endX} y1={endY} x2={arrowX2} y2={arrowY2} stroke="#10b981" strokeWidth="3" />
                            </>
                          );
                        })()}
                      </>
                    )}
                  </Svg>
                </View>
              </View>

              {/* Hasil */}
              <View style={styles.resultSection}>
                <Text style={styles.resultTitle}>Hasil Resultan</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Komponen X:</Text>
                  <Text style={styles.resultValue}>{resultant.x.toFixed(2)} px</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Komponen Y:</Text>
                  <Text style={styles.resultValue}>{resultant.y.toFixed(2)} px</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Magnitude:</Text>
                  <Text style={styles.resultValue}>{magnitude.toFixed(2)} px</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.resultLabel}>Sudut:</Text>
                  <Text style={styles.resultValue}>{angle.toFixed(2)}°</Text>
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
  inputSection: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 20,
  },
  inputSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f1f5f9',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1e293b',
  },
  colorSection: {
    marginTop: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    marginTop: 8,
    flexWrap: 'wrap',
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    marginRight: 10,
    marginBottom: 10,
  },
  colorButtonSelected: {
    borderColor: '#1e293b',
    borderWidth: 3,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 15,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginRight: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#ef4444',
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 5,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
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
