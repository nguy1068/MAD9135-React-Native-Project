import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { id } from "react-native-paper-dates";
import uuid from "react-native-uuid";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [people, setPeople] = useState([]);

  const fetchPeople = async () => {
    try {
      const existingData = await AsyncStorage.getItem("people");
      const peopleArray = existingData ? JSON.parse(existingData) : [];
      setPeople(peopleArray);
    } catch (err) {
      console.log("Error while fetching people", err);
    }
  };

  const savePeople = async (newPerson) => {
    try {
      const existingData = await AsyncStorage.getItem("people");
      const peopleArray = existingData ? JSON.parse(existingData) : [];
      if (!newPerson.name || !newPerson.dob) {
        console.error("Missing  required fields");
      } else {
        peopleArray.push(newPerson);
        await AsyncStorage.setItem("people", JSON.stringify(peopleArray));
        setPeople(peopleArray); // Update state
      }
    } catch (err) {
      console.log("error while save people", err);
    }
  };

  const deletePeople = async (id) => {
    try {
      const updatedPeopleArray = people.filter((person) => person.id !== id);
      await AsyncStorage.setItem("people", JSON.stringify(updatedPeopleArray));
      setPeople(updatedPeopleArray);
    } catch (err) {
      console.log("Error when deleting person", err);
    }
  };

  const saveIdeas = async (personId, ideaData) => {
    try {
      const existingData = await AsyncStorage.getItem("people");
      const peopleArray = existingData ? JSON.parse(existingData) : [];

      //find person by id and update
      const personIndex = peopleArray.findIndex(
        (person) => person.id === personId
      );
      if (personIndex !== -1) {
        const person = peopleArray[personIndex];

        const newIdea = {
          id: uuid.v4(), // Generate unique ID for the idea
          ...ideaData, // Spread the existing idea data
        };

        person.ideas.push(newIdea);
        peopleArray[personIndex] = person;
        await AsyncStorage.setItem("people", JSON.stringify(peopleArray));
        setPeople(peopleArray);
      } else {
        console.log("People not found");
      }
    } catch (error) {
      console.log("error while saving idea", error);
    }
  };

  const deleteIdea = async (personId, ideaId) => {
    try {
      const existingData = await AsyncStorage.getItem("people");
      const peopleArray = existingData ? JSON.parse(existingData) : [];

      const personIndex = peopleArray.findIndex(
        (person) => person.id === personId
      );
      if (personIndex !== -1) {
        const person = peopleArray[personIndex];
        const updatedIdeas = person.ideas.filter(
          (idea) => idea.id !== ideaId
        );
        person.ideas = updatedIdeas;
        peopleArray[personIndex] = person;
        await AsyncStorage.setItem("people", JSON.stringify(peopleArray));
        setPeople(peopleArray);
      } else {
        console.log("People/Idea not found");
      }
    } catch (error) {
      console.log("error while delete idea", error);
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <DataContext.Provider
      value={{
        people,
        fetchPeople,
        savePeople,
        deletePeople,
        saveIdeas,
        deleteIdea,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
