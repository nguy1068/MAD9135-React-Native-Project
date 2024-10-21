import * as React from "react";
import { Card, IconButton } from "react-native-paper";

const PersonCard = ({ title, subtitle, onDelete, onNavigate }) => (
  <Card.Title
    title={title}
    subtitle={subtitle}
    right={(props) => (
      <IconButton {...props} icon="delete" onPress={onDelete} />
    )}
    left={(props) => (
      <IconButton {...props} icon="lightbulb" onPress={onNavigate} />
    )}
  />
);

export default PersonCard;
