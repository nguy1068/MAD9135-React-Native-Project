import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, SafeAreaView } from "react-native";
import Title from "../ui/Title";
import NameInput from "../ui/MyTextInput";
import MyDatePicker from "../ui/MyDatePicker";
import MyButton from "../ui/MyButton";
import { DataContext } from "../global/dataContext";
import { useContext } from "react";
import uuid from "react-native-uuid";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../ui/MyTextInput";

export default function AddPersonScreen() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const navigation = useNavigation();
  const { savePeople } = useContext(DataContext);

  const handleSave = async () => {
    const newUUID = uuid.v4();
    const newPerson = {
      id: newUUID,
      name: name,
      dob: dob,
      ideas: [],
    };

    if (!newPerson.name || !newPerson.dob) {
      alert("Please fill in all fields");
    } else {
      await savePeople(newPerson);
      navigation.goBack();
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 pt-5">
      <Title />
      <MyTextInput value={name} onChangeText={setName} label={"Input name"} />
      <MyDatePicker onDateChange={setDob} />
      <SafeAreaView className="flex-1 justify-between">
        <View></View>
        <View className="flex flex-col">
          <MyButton onPress={handleSave} label="Save Button" />
          <MyButton label="Cancel" onPress={handleCancel} color={"red"} />
        </View>
      </SafeAreaView>
      <StatusBar style="auto" />
    </View>
  );
}
