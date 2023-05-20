import { useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
const headerHeight = 50
export default ({ selectedAlbumTitle,onPressAddAlbum,onPressHeader,isDropdownOpen }) => {
    return (
        <View>

        
        <TouchableOpacity
        onPress={onPressHeader}
        style={{
            
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <Text style={{ fontWeight: "bold" }}>{selectedAlbumTitle}</Text>
            <TouchableOpacity 
            onPress= {onPressAddAlbum}
            style={{
                position: "absolute",
                right: 0,
                height: headerHeight,
                paddingHorizontal: 10,  
                justifyContent:"center",
                alignItems:"center"
            }}>
                <Text style={{fontSize:12}}>앨범 추가</Text>
            </TouchableOpacity>
        </TouchableOpacity>

        {
                isDropdownOpen &&(

                    <View style ={{ 
                        position:"absolute",
                        width: "100%",
                         height:100,
                          backgroundColor:"blue",
                          top:headerHeight
                          }}> 
                    </View>
                )
            }
                
        </View>
    )
}