import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface BiodataCardProps {
  title: string;
  subtitle: string;
  details: string;
}

const BiodataCard: React.FC<BiodataCardProps> = ({ title, subtitle, details }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <Text style={styles.details}>{details}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.lightBackground,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: colors.lightBlue,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textLight,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: colors.textLight,
  },
});

export default BiodataCard;