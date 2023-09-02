import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BusInfo from './src/BusInfo';
import { COLOR } from './src/color';
import { busStop, getBusNumColorByType, getRemainedTimeText, getSeatStatusText, getSections } from './src/data';
import { SimpleLineIcons } from '@expo/vector-icons';
import Margin from './src/Margin';
import BookmarkButton from './src/BookmarkButton';
import { useTheme } from './src/use-theme';
const busStopBookMarkSize = 20
const busStopBookmarkPaddingHorizontal = 6

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs())
  const [refreshing, setRefreshing] = useState(false)
  const {NEWCOLOR} = useTheme()
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    /**
     * Start
     */
    // undefined ?? null -> null 
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */

    return (
      <BusInfo
        NEWCOLOR ={NEWCOLOR}
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => { }} // TODO
        num={bus.num}
        directionDescrioption={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    )
  };
  const ListHeaderComponent = () => (
    <View style={{ 
      backgroundColor: COLOR.GRAY_3,
      height:170,
      alignContent:'center',justifyContent:'center',alignItems:'center'
       }}>
        <Margin height={10}/>
        <Text style={{color:NEWCOLOR.WHITE_BLACK,fontSize:13}}>{busStop.id}</Text>
        <Margin height={4}/>
        <Text style={{color:NEWCOLOR.WHITE_BLACK,fontSize:20}}>{busStop.name}</Text>
        <Margin height={4}/>
        <Text style={{color:NEWCOLOR.GRAY_1_GRAY_4,fontSize:14}}>{busStop.directionDescription}</Text>
        <Margin height={20}/>

        <BookmarkButton 
        NEWCOLOR={NEWCOLOR}
        size={busStopBookMarkSize}
          isBookmarked={busStop.isBookmarked} 
          onPress={onPressBusStopBookMark}
          style={{borderWidth:0.5, borderColor: NEWCOLOR.GRAY_1_GRAY_4,
             borderRadius:(busStopBookMarkSize+busStopBookmarkPaddingHorizontal*2)/2,
             padding:5}}
        />
        <Margin height={25}/>

    </View>
  )
  const onPressBusStopBookMark =() =>{}
  const renderSectionHeader = ({ section: { title } }) => (
    <View style={{
      paddingLeft: 13,
      paddingVertical: 3,
      backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
      borderTopWidth: 0.5,
      borderBottomWidth: 0.5,
      borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
      borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3
    }}>
      <Text style={{ fontSize: 12, color: NEWCOLOR.GRAY_4_GRAY_1 }}>{title}</Text>
    </View>
  )

  const ItemSeparatorComponent = () => (
    <View style={{width:"100%",height:1, backgroundColor:NEWCOLOR.GRAY_1_GRAY_4}}></View>
  )
  const ListFooterComponent =() => (
    <Margin height={30}/>
  )
  const onRefresh = () => {
    setRefreshing(true)
  }

  useEffect(()=>{
    if(refreshing){
      setTimeout(()=>{
        setRefreshing(false)
        setNow(dayjs())
      },3000)
    }
  },[refreshing])

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs()
      setNow(newNow)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:NEWCOLOR.GRAY_3_GRAY_2,width:"100%"}}>
      <SafeAreaView style={{ flexDirection: 'row', justifyContent: "space-between", }}>
        <TouchableOpacity style={{ padding: 10 }}>
          <SimpleLineIcons name="arrow-left" size={20} color={NEWCOLOR.WHITE_BLACK} />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }}>
          <SimpleLineIcons name="home" size={20} color={NEWCOLOR.WHITE_BLACK} />
        </TouchableOpacity>
      </SafeAreaView>
        <View style={{position:'absolute',width:'100%',height:500,backgroundColor:NEWCOLOR.GRAY_3_GRAY_2,zIndex:-1}}/>
      </View>

      <SectionList
        style={{ flex: 1, width: "100%" }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
          />
        }
      />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});