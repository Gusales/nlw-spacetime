import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { Link, useRouter } from 'expo-router'

import Icon from '@expo/vector-icons/Feather'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Logo from '../src/assets/logo.svg'

import * as SecureStore from 'expo-secure-store'
import { useEffect, useState } from 'react'
import { api } from '../src/lib/api'

import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'

dayjs.locale(ptBr)

interface Memory {
  id: string
  coverURL: string
  createdAt: string
  excerpt: string
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([])
  const { bottom, top } = useSafeAreaInsets()
  const router = useRouter()

  async function signout() {
    await SecureStore.deleteItemAsync('token')
    router.push('/')
  }

  async function loadMemories() {
    const token = await SecureStore.getItemAsync('token')
    const response = await api.get('/memories', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    setMemories(response.data)
  }

  useEffect(() => {
    loadMemories()
  }, [])

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      {/* Header */}
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />
        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={signout}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500"
          >
            <Icon name="log-out" size={16} color="#fff" />
          </TouchableOpacity>
          <Link href="/newMemorie" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500">
              <Icon name="plus" size={16} color="#000" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => {
          return (
            <View className="space-y-4" key={memory.id}>
              <View className="flex-row items-center gap-2">
                <View className="h-px w-5 bg-gray-50 " />
                <Text className="font-body text-xs text-gray-100">
                  {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY ')}
                </Text>
              </View>
              <View className="space-y-4">
                <Image
                  source={{
                    uri: memory.coverURL,
                  }}
                  alt="foto da memoria"
                  className="aspect-video w-full rounded-lg"
                />
              </View>
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>

              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0"></Icon>
                </TouchableOpacity>
              </Link>
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}
