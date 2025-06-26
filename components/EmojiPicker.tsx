import { Modal, View, Text, StyleSheet, Pressable } from "react-native";
import { PropsWithChildren } from "react";
import { AntDesign } from "@expo/vector-icons";

type Props = PropsWithChildren<{
    isVisible: boolean;
    onClose: () => void;
}>

export default function ({ isVisible, onClose, children }: Props) {
    return (
        <View>
            <Modal animationType="none" transparent={true} visible={isVisible}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Choose a sticker</Text>
                        <Pressable onPress={onClose}>
                            <AntDesign name="close" size={22} color="#fff" />
                        </Pressable>
                    </View>
                    {children}
                </View>
            </Modal>
            </View>
    )
}


const styles = StyleSheet.create({
    modalContent: {
        height: "25%",
        width: "100%",
        backgroundColor: "#25292e",
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "16%",
        backgroundColor: "#464C55",
        borderTopRightRadius: 10,
        borderTopEndRadius: 10,
        paddingHorizontal: 20,
    },
    title: {
        color: "#fff",
        fontSize: 16,      
    }
})