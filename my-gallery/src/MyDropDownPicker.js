import { useEffect } from "react"
import { View, Text, TouchableOpacity } from "react-native"
import {SimpleLineIcons} from '@expo/vector-icons'
const headerHeight = 50
export default ({ 
    selectedAlbum,
    onPressAddAlbum,
    onPressHeader,
    isDropdownOpen,
    albums,
    onPressAlbum,
    onLongPressAlbum }) => {
    return (
        <View>
        <TouchableOpacity
        onPress={onPressHeader}
        style={{
            
            height: headerHeight,
            justifyContent: "center",
            alignItems: "center",
            flexDirection:"row",
        }}>
            <Text style={{ fontWeight: "bold" }}>{selectedAlbum.title}</Text>
            <SimpleLineIcons
                name ={isDropdownOpen ? "arrow-up" : "arrow-down"}
                size = {12}
                color ="black"
                style = {{marginLeft: 8}}
            />
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
                        top: headerHeight,
                        borderBottomWidth:1,
                        borderBottomColor: "grey",
                        borderTopWidth:1,
                        borderTopColor: "grey",
                        
                          }}> 
                          {albums.map((album,index)=>{
                            const isSelectedAlbum = album.id === selectedAlbum.id
                            return(
                                <TouchableOpacity
                            key={`album-${index}`} 
                            activeOpacity={1}
                            onPress={()=> onPressAlbum(album)}
                            style={{
                                paddingVertical :10,
                                width: "100%",
                                justifyContent:"center",
                                alignItems: "center",
                                backgroundColor:"#FFFFFF"
                            }}
                            onLongPress={()=>onLongPressAlbum(album.id)}
                             > 
                                <Text style ={{ fontWeight: isSelectedAlbum?"bold":undefined}}>{album.title}</Text>
                            </TouchableOpacity>
                            )
                        }) }
                    </View>
                )
            }
                
        </View>
    )
}