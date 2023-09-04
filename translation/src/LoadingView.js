import { View } from "react-native"
import LottieView from 'lottie-react-native'
import { useRef } from "react"
export default () => {
    const ref = useRef(null)
    return(
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <LottieView
                autoPlay
                ref={ref}
                style={{
                    flex:1,
                    width:'100%',
                    height:'100%',
                    backgroundColor:'lightblue'
                }}
                source={require('../assets/animation_lm3jkkfs.json')}
            />
        </View>
    )
}