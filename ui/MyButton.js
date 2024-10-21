import * as React from "react";
import { Button } from "react-native-paper";

const MyButton = ({ onPress, label, color }) => (
  <Button
    className="mx-4 my-2"
    mode="contained"
    onPress={onPress}
    buttonColor={color}
  >
    {label} {/* Display the label passed as a prop */}
  </Button>
);

export default MyButton;
