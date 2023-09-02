import { Text, View } from "react-native"
import AlramButton from "./AlramButton"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "./color"
import NextBusInfo from "./NextBusInfo"

export default ({
    isBookmarked,
    onPressBookmark,
    num,
    directionDescrioption,
    numColor,
    processedNextBusInfos,
    NEWCOLOR
}) => {
    return(
        <View style={{flexDirection:"row",height:75,backgroundColor:COLOR.WHITE}}>
            <View style={{flex:0.85,flexDirection:"row",}}>
                {/*북마크*/}
                <BookmarkButton 
                NEWCOLOR ={NEWCOLOR}
                    size={20}
                    isBookmarked={isBookmarked}
                    onPress={onPressBookmark}
                    style={{paddingHorizontal:10}}
                    />

                {/*버스번호, 방향*/}
                <View style={{flex:1}}>
                    <Text style={{color:numColor, fontSize:20}}>{num}</Text>
                    <Text style={{fontSize:13, color:COLOR.GRAY_3,marginRight:5}}>{directionDescrioption} 방향</Text>
                </View>
            </View>
            <View style={{flex:1,flexDirection:"row",alignItems:"center"}}>
                {/*M분 S초 / N번째 전 / 여유 */}
                <View style={{flex:1}}>
                    {processedNextBusInfos.map((info,index)=>(
                        <NextBusInfo
                        NEWCOLOR ={NEWCOLOR}
                        key={`next-bus-info-${index}`}
                        hasInfo={info.hasInfo}
                        remainedTimeText={info.remainedTimeText}
                        numOfRemainedStart={info.numOfRemainedStart}
                        seatStatusText={info.seatStatusText}
                        />
                    ))}
                
               
                </View>
                <AlramButton NEWCOLOR ={NEWCOLOR} onPress={()=>{}} style={{paddingHorizontal:15}}/>
            </View>
        </View>
    )
}