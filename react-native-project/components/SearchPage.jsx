import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, FlatList } from "react-native";
import Card from "./SearchCard"; // Import your Card component

const data = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
  { id: 3, title: "Movie 3" },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (query) => {
    const filteredResults = data.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search movies..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            handleSearch(text);
          }}
        />
      </View>
      <View style={styles.resultsContainer}>
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Card title={item.title} />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "#666",
    borderWidth: 1,
    paddingHorizontal: 8,
    color: "white",
  },
  resultsContainer: {
    flex: 1,
  },
});



