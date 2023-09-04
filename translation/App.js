import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Button from './src/Button';
import { useCookie } from './src/use-cookie';
import { useTranslation } from './src/use-translation';
import * as SplashScreen from 'expo-splash-screen'
import LoadingView from './src/LoadingView';
import LottieView from 'lottie-react-native'
import {useFonts} from 'expo-font'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const { t, locale, setLocale, format } = useTranslation();
  const { cookieKey } = useCookie();
  const [isLoaded, setIsLoaded] = useState(false)

  const y = new Date().getFullYear()
  const m = new Date().getMonth() + 1
  const d = new Date().getDate()

  const todayText = format(t('today_is'), y, m, d);

  const [fontsLoaded] = useFonts({
    'RIDIBatang':require('./assets/RIDIBatang.otf')
  })
  useEffect(() => {
    if (cookieKey !== "") {
      setIsLoaded(true)
    }
  }, [cookieKey])

  useEffect(() => {
    if (locale !== null && fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [locale,fontsLoaded])

  if (!isLoaded) return (
    <LoadingView />
  )
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay={true}
        source={require('./assets/animation_lm4gki1f.json')}
        resizeMode="cover"
        style={{ borderWidth: 1, width: '100%', height: '100%', zIndex: -1, position: 'absolute' }}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.topContainer}>
          <Text style={styles.todayText}>{todayText}</Text>
          <Text style={styles.cookieText}>{t(cookieKey)}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => setLocale("ko")}
              isSelected={locale === "ko"}
              text="KO"
            />
            <Button
              onPress={() => setLocale("en")}
              isSelected={locale === "en"}
              text="EN"
            />
            <Button
              onPress={() => setLocale("ja")}
              isSelected={locale === "ja"}
              text="JA"
            />
            <Button
              onPress={() => setLocale("zh")}
              isSelected={locale === "zh"}
              text="ZH"
            />
            <Button
              onPress={() => setLocale("es")}
              isSelected={locale === "es"}
              text="ES"
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    backgroundColor: 'purple', // for test
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  todayText: {
    position: "absolute",
    top: 70,
    fontSize: 13,
    color: "#8b658f",
    fontFamily:"RIDIBatang"
  },
  cookieText: {
    fontSize: 22,
    color: "#372538",
    textAlign: "center",
    marginHorizontal: 30,
    fontFamily:"RIDIBatang"
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 25,
  },
});