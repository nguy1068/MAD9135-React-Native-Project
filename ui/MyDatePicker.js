import React from "react";
import DatePicker from "react-native-modern-datepicker";

const MyDatePicker = ({ onDateChange }) => {
  return (
    <DatePicker
      current="2024-10-17"
      mode="calendar"
      onSelectedChange={onDateChange}
    />
  );
};

export default MyDatePicker;
