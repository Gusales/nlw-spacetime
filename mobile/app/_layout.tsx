import { StatusBar } from 'expo-status-bar'
import { styled } from 'nativewind'
import { ImageBackground } from 'react-native'

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'

import { SplashScreen, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import BlurBg from '../src/assets/bg-blur.png'
import Stribes from '../src/assets/stripes.svg'

import * as SecureStore from 'expo-secure-store'

const StyledStribe = styled(Stribes)

export default function Layout() {
  const [isUserAuth, setIsUseAuth] = useState<null | boolean>(null)

  const [hasLoadedFonts] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold,
  })

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      console.log(!!token)
      setIsUseAuth(!!token)
    })
  }, [])

  if (!hasLoadedFonts) {
    return <SplashScreen />
  }

  return (
    <ImageBackground
      source={BlurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute', left: '-100%' }}
    >
      <StyledStribe className="absolute left-2" />
      <StatusBar style="light" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <Stack.Screen name="index" redirect={isUserAuth} />
        <Stack.Screen name="newMemorie" />
        <Stack.Screen name="memories" />
      </Stack>
    </ImageBackground>
  )
}
