import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { bottomSpace, ITEM_WIDTH } from "./util";
import {AntDesign} from "@expo/vector-icons"

export default (
    {
        value,
        onChangeText,
        placeholder,
        onPressAdd,
        onSubmitEditing,
        onFocus,
    }
) => {
    return(
        <View style = {{
            width: ITEM_WIDTH,
            flexDirection:"row",
            alignSelf:"center"
            }}>
            <TextInput
                value={value}
                onChangeText = {onChangeText}
                placeholder ={placeholder}
                style = {{
                    flex:1 ,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    color:"#595959"
                    
                }}
                onSubmitEditing = {onSubmitEditing}
                blurOnSubmit ={false}
                onFocus= {onFocus}
            />
            <TouchableOpacity  style = {{padding:5}} onPress = {onPressAdd}>
            <AntDesign name="plus" size = {18} color = "#595959" />
            </TouchableOpacity>
            
        </View>
    )
}