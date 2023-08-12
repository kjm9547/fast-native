import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../modules/Colors";

interface ScreenProps{
    title?: string;
    children?: React.ReactNode
}
const Screen = ({children,title}:ScreenProps) => {
    return(
        <SafeAreaView style = {styles.container}>
            <View style={styles.header}>
                <View style={styles.left}/>
                <View style={styles.center}>
                    <Text style={styles.headerTtile}>{title}</Text>
                </View>
                <View style={styles.right}/>
            </View>

            <View style={styles.body}>
                {children}
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header:{
        height:48,
        flexDirection:"row",
    
    },
    left:{
        flex:1,

    },
    center:{
        flex:3,
        justifyContent:"center",
        alignItems:'center'
    },
    headerTtile:{
        fontSize:16,
        fontWeight:"bold",
        color:Colors.BLACK

    },
    right:{
        flex:1,
        
    },
    body:{
        flex:1
    },
})
export default Screen