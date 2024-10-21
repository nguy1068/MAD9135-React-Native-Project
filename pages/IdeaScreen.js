import React, { useEffect, useState, useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  Image,
} from "react-native";
import { DataContext } from "../global/dataContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function IdeaScreen() {
  const { people, deleteIdea } = useContext(DataContext);
  const route = useRoute();
  const { id } = route.params;
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handleDeleteIdea = async (ideaId) => {
    await deleteIdea(id, ideaId);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add Idea"
          onPress={() => navigation.navigate("AddIdeaScreen", { id })}
        />
      ),
    });
  }, [navigation, id]);

  useEffect(() => {
    const foundPerson = people.find((person) => person.id === id);
    setPerson(foundPerson);
    setLoading(false);
  }, [id, people]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ideas for {person?.name}</Text>
      {person?.ideas && person.ideas.length > 0 ? (
        person.ideas.map((idea) => (
          <View key={idea.id}>
            <Text>{idea.idea}</Text>
            <Image
              source={{ uri: idea.photo.uri }}
              style={{ width: 200, height: 200 }}
            />
            <Button title="Delete" onPress={() => handleDeleteIdea(idea.id)} />
          </View>
        ))
      ) : (
        <Text>No ideas available for this person.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    color: "gray",
  },
});
