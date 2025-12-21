import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
};

const Header = (props: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: '100%',
    height: 80,
    padding: 25,
    borderRadius: 0,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  }
});

export default Header;