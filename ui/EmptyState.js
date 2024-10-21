// EmptyState.js
import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Image source={require("../assets/leaf.png")} style={styles.emptyImage} />
    <Text style={styles.emptyText}>No people found.</Text>
  </View>
);

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyImage: {
    width: 200,
    height: 200,
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
  },
});

export default EmptyState;
