import React from 'react';
import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import { Link } from 'expo-router';

type Props = {
  title: string;
  description: string;
  link?: any;
  buttonText?: string;
  questionCount?: number;
  duration?: string;
};

const Card = (props: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      
      {/* Metadata */}
      {(props.questionCount || props.duration) && (
        <View style={styles.metaContainer}>
          {props.questionCount && (
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>📝</Text>
              <Text style={styles.metaText}>{props.questionCount} Soal</Text>
            </View>
          )}
          {props.duration && (
            <View style={styles.metaItem}>
              <Text style={styles.metaIcon}>⏱️</Text>
              <Text style={styles.metaText}>{props.duration}</Text>
            </View>
          )}
        </View>
      )}
      
      {props.link && (
        <Link href={props.link as any} asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>{props.buttonText || 'Mulai Simulasi'}</Text>
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
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  metaIcon: {
    fontSize: 14,
    marginRight: 5,
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  }
});

export default Card;