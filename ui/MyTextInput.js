import React from "react";
import { TextInput } from "react-native-paper";

const MyTextInput = ({ value, onChangeText, label }) => {
  return (
    <TextInput
      label={label}
      value={value}
      onChangeText={onChangeText}
      mode="outlined"
    />
  );
};

export default MyTextInput;
