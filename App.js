import { Button } from "react-native";
import { PaperProvider } from "react-native-paper";
import PeopleScreen from "./pages/PeopleScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import IdeaScreen from "./pages/IdeaScreen";
import AddIdeaScreen from "./pages/AddIdeaScreen";
import AddPersonScreen from "./pages/AddPersonScreen";
import { DataProvider } from "./global/dataContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <DataProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
            <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
            <Stack.Screen name="AddIdeaScreen" component={AddIdeaScreen} />
            <Stack.Screen name="PersonScreen" component={AddPersonScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </DataProvider>
  );
}
