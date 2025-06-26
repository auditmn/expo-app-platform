import { ImageSourcePropType, View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceHolderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  // ---
  // Functions are now defined at the top level of the component
  // ---

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert('You did not select any image.');
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
    setSelectedImage(undefined); // Reset selected image when resetting options
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {
    // TODO: Implement save image logic here
    alert('Save image functionality not yet implemented.');
  };

  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceHolderImage} selectedImage={selectedImage} />
        { selectedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={selectedEmoji} />
        )}
      </View>

      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Chose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setSelectedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
    </GestureHandlerRootView>
  );
}

// ---
// Styles remain unchanged, but are included for completeness
// ---
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
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  }
});