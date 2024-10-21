import React, { useEffect, useState, useContext, useRef } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { DataContext } from "../global/dataContext";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import MyTextInput from "../ui/MyTextInput";
import { CameraView, useCameraPermissions } from "expo-camera";
import MyButton from "../ui/MyButton";

export default function AddIdeaScreen() {
  const { people, saveIdeas } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const { id } = route.params;
  const [person, setPerson] = useState(null);
  const [idea, setIdea] = useState("");
  const navigation = useNavigation();

  // Camera
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const { width } = Dimensions.get("window");
  const cameraWidth = width * 0.65;
  const cameraHeight = (cameraWidth * 3) / 2;

  useEffect(() => {
    const foundPerson = people.find((person) => person.id === id);
    setPerson(foundPerson);
    setLoading(false);
  }, [id, people]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleSave = async () => {
    if (idea && photo) {
      await saveIdeas(id, { idea, photo });
      navigation.navigate("IdeaScreen", { id });
    } else {
      alert("Please provide an idea and take a picture.");
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create idea for {person.name}</Text>
      <MyTextInput
        value={idea}
        onChangeText={(text) => {
          setIdea(text);
          console.log(idea);
        }}
        label="Input idea's name"
      />
      <View className="flex-1 justify-between">
        {photo ? (
          <Image
            source={{ uri: photo.uri }}
            style={[
              styles.camera,
              { width: cameraWidth, height: cameraHeight },
            ]}
          />
        ) : (
          <CameraView
            ref={cameraRef}
            style={[
              styles.camera,
              { width: cameraWidth, height: cameraHeight },
            ]}
            facing={facing}
            mode="picture"
            base64={true}
            ratio="2:3"
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
          </CameraView>
        )}
        <View style={styles.buttonContainer}>
          <Button title="Take Picture" onPress={takePicture} />
        </View>
        <View className="flex flex-col">
          <MyButton label="Save" onPress={handleSave} />
          <MyButton
            label="Cancel"
            color={"red"}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
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
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 0,
    margin: 20,
    alignSelf: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 12,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
