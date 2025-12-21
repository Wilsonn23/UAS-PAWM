import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

type Props = {
  title: string;
  description: string;
};

const Card = (props: Props) => {
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You have started the simulation!');
 };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <View style={{ marginTop: 10 }}>
        <Button
          title="Mulai Simulasi"
          onPress={handlePress}
          color="#2563eb"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3, // Untuk efek bayangan di Android
    shadowColor: '#000', // Untuk efek bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
  }
});

export default Card;