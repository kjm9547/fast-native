import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "../kakao-friend-list/src/Header";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { SafeAreaProvider,SafeAreaView } from "react-native-safe-area-context";
import MyProfile from "./src/MyProfile";
import { myProfile } from "./src/data";
import Margin from "./src/Margin";

const StatusBarHeight = getStatusBarHeight();
const bottomSpace = getBottomSpace();



export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['right','left']} style={styles.container}>
        <Header />
        <Margin height={30}/>
        <MyProfile 
        uri={myProfile.uri}
        name ={myProfile.name}
        introduction={myProfile.introduction}/>
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
