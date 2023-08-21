import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../modules/Colors";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/MaterialIcons'

interface ScreenProps {
    title?: string;
    children?: React.ReactNode
}
const Screen = ({ children, title }: ScreenProps) => {
    const { goBack, canGoBack } = useNavigation();
    const onPressBackButton = useCallback(() => {
        goBack();
    }, [goBack])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.left}>
                    {
                        canGoBack() && (
                            <TouchableOpacity onPress={onPressBackButton}>
                                <Icon style={styles.backButtonIcon} name="arrow-back"/>
                            </TouchableOpacity>
                        )
                    }

                </View>
                <View style={styles.center}>
                    <Text style={styles.headerTtile}>{title}</Text>
                </View>
                <View style={styles.right} />
            </View>

            <View style={styles.body}>
                {children}
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 48,
        flexDirection: "row",

    },
    left: {
        flex: 1,
        justifyContent: "center",
        

    },
    center: {
        flex: 3,
        justifyContent: "center",
        alignItems: 'center'
    },
    headerTtile: {
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.BLACK

    },
    right: {
        flex: 1,

    },
    body: {
        flex: 1
    },
    backButtonText: {
        fontSize: 12,
        color: Colors.BLACK
    },
    backButtonIcon:{
        color:Colors.BLACK,
        fontSize:20,
        marginLeft:20
    }
})
export default Screen