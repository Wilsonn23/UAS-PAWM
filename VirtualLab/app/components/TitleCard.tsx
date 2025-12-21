import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  description: string;
};

const TitleCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '100%',
    height: 150,
    paddingVertical: 20,
    paddingHorizontal: 25,
    marginVertical: 10,
    borderRadius: 8,
    elevation: 3, // Untuk efek bayangan di Android
    shadowColor: '#000', // Untuk efek bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    color: '#555',
    marginTop: 10,
    textAlign: 'center',
    width: '100%',
  }
});

export default TitleCard;