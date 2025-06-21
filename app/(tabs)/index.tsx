import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

const PlaceHolderImage = require("@/assets/images/background-image.png")

export default function Index() {

  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async() => {
    
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(result);
    } else {
      alert('You did not select any image.');
    }


  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
          <Button theme="primary" label="Chose a photo" onPress={pickImageAsync}/>
          <Button label="Use this photo" />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: '#fff',
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
    marginTop: 20,
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1/3,
    alignItems: "center"
  }
});