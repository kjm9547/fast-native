import { KeyboardAvoidingView, Modal, Pressable, SafeAreaView, TextInput, View } from "react-native"
export default ({ modalVisible, albumTitle, setAlbumTitle,onSubmitEditing,onPressBackdrop}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}>
                <Pressable style={{ flex: 1 , backgroundColor:"pink"}} onPress ={onPressBackdrop} >
                    <SafeAreaView style={{ flex: 1, position: "absolute", width: "100%", bottom: 0 }}>
                        <TextInput
                            placeholder="앨범명"
                            style={{ width: "100%",padding:10, borderColor: "lightgrey" }}
                            value={albumTitle}
                            onChangeText={setAlbumTitle}
                            onSubmitEditing ={onSubmitEditing}
                            autoFocus ={true} />
                    </SafeAreaView>
                </Pressable>
            </KeyboardAvoidingView>


        </Modal>
    )
}