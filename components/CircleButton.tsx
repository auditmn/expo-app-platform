import { View, Pressable, StyleSheet } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = {
    onPress: () => void;
}

export default function CircleButton({ onPress }: Props) {
    return (
        <View style={styles.CircleButtonContainer}>
            <Pressable style={styles.CircleButton} onPress={onPress}>
                <MaterialIcons name="add" size={38} color="#25292e" />
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    CircleButtonContainer: {
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: "#ffd33d",
        marginHorizontal: 60,
        borderWidth: 4,
        padding: 3
},
    CircleButton: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 42,
        backgroundColor: "#fff"
    },
})