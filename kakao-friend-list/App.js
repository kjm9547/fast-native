import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "../kakao-friend-list/src/Header";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import Profile from "./src/Profile";
import { friendProfiles, myProfile } from "./src/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";
import { useState } from "react";
import TabBar from "./src/TabBar";

const StatusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();



export default function App() {
  const [isOpened,setIsOpened] = useState(true)
  const [selectedTabIdx, setSelectedTabIdx] = useState(0)
  const onPressArrow = () => {
    console.log(bottomSpace)
    setIsOpened(!isOpened)
  }
  const ItemSeparatorComponent = () => <Margin height={13} />
  const renderItem = ({item}) =>(
    <View>
        <Profile
            uri={item.uri}
            name={item.name}
            introduction={item.introduction}
            isMe={false}
        />
      </View>
  )
  const ListHeaderComponent = () => (
  <View style={{backgroundColor:"white"}}>
    <Header />
    <Margin height={30}/>
    <Profile 
    uri={myProfile.uri}
    name ={myProfile.name}
    introduction={myProfile.introduction}
    isMe={true}/>
    <Margin height={15}/>
    <Division/>
    <Margin height={12}/>
    <FriendSection
      friendProfileLen = {friendProfiles.length}
      onPressArrow = {onPressArrow}
      isOpened={isOpened}
    />
    <Margin height={5}/>
    </View>
  )
  const ListFooterComponent = () =>
    <Margin height={5}/>

  return(
    <View style={styles.container}>
      <FlatList 
      data={isOpened? friendProfiles:[]}
      keyExtractor={(_,index) => {index}}
      renderItem={renderItem}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent ={ListFooterComponent}
      contentContainerStyle={{paddingHorizontal:15}}
      ItemSeparatorComponent={ItemSeparatorComponent}
      />
      <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
    </View>
  )
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right','left']} style={styles.container}>
        <View style={{
          flex:1,
          paddingHorizontal:15,}}>
        <Header />
        <Margin height={30}/>
        <Profile 
        uri={myProfile.uri}
        name ={myProfile.name}
        introduction={myProfile.introduction}/>
        <Margin height={15}/>
        <Division/>
        <Margin height={12}/>
        <FriendSection
          friendProfileLen = {friendProfiles.length}
          onPressArrow = {onPressArrow}
          isOpened={isOpened}
        />
        <FriendList data={friendProfiles} isOpened={isOpened}/>   
        </View>
        <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />   
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBarHeight,
    backgroundColor: "#fff",
  },
});
