import { Text } from "react-native";
import { View,StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const IconButton = (props) =>{
    return(
        <Ionicons name={props.name} size={24} color="baddlack" />
    )
}
export default () => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>친구</Text>
      <View style={{flexDirection:"row"}}>
        <IconButton name="search-outline"/>
        <IconButton name="person-add-outline"/>
        <IconButton name="musical-notes-outline"/>
        <IconButton name="ios-settings-outline"/>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection:"row",
        justifyContent:"space-between",
        paddingVertical:10,
       
    },
    title: {
        fontSize: 22,
        fontWeight: "bold"
    }
})
