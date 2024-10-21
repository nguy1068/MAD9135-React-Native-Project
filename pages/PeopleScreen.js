import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Title from "../ui/Title";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { DataContext } from "../global/dataContext";
import { useContext } from "react";
import PersonCard from "../ui/PersonCard";
import EmptyState from "../ui/EmptyState";
import { useNavigation } from "@react-navigation/native";

export default function PeopleScreen() {
  const { people, fetchPeople, deletePeople } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [emptyState, setEmptyState] = useState(false);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Add person"
          onPress={() => navigation.navigate("PersonScreen")}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPeople();
        setEmptyState(people.length === 0 ? true : false);
      } catch (err) {
        console.error("Error fetching people:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [people]);

  const handleDelete = async (id) => {
    console.log("handleDelete clicked");
    setLoading(true);
    try {
      await deletePeople(id);
      await fetchPeople();
    } catch (err) {
      console.error("Error deleting people:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleNavigate = (destination, params) => {
    navigation.navigate(destination, params);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", paddingTop: 20 }}>
      <Title />
      {emptyState ? (
        <EmptyState />
      ) : (
        <FlatList
          data={people}
          renderItem={({ item }) => (
            <PersonCard
              title={item.name}
              subtitle={item.dob}
              onDelete={() => handleDelete(item.id)}
              onNavigate={() => handleNavigate("IdeaScreen", { id: item.id })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 20,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
