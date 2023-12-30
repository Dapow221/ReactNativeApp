import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SearchCard({ title }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  cardText: {
    color: "white",
  },
});

