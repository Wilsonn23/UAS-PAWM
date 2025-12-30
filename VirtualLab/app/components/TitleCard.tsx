import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';

type Props = {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: any;
};

const TitleCard = (props: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      {props.buttonText && props.buttonLink && (
        <Link href={props.buttonLink as any} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{props.buttonText}</Text>
          </Pressable>
        </Link>
      )}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default TitleCard;