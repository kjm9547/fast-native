import { TouchableOpacity, View } from "react-native"
import {Ionicons} from '@expo/vector-icons'
import {COLOR} from './color'
import { useState } from "react"
export default ({
    isBookmarked: isBookmarkedProp,
    onPress,
    style,
    NEWCOLOR
}) => {
    const [isBookmarked,setIsBookmarked] = useState(isBookmarked)
    return(
        <View>
            <TouchableOpacity style={style} onPress={()=>{
                setIsBookmarked(!isBookmarked)
                onPress()
                }}>
                <Ionicons name="star" size={24} color={isBookmarked? NEWCOLOR.YELLOW : NEWCOLOR.GRAY_1_GRAY_4}/>
            </TouchableOpacity>
        </View>
    )
}