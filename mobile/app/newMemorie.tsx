import { useState } from 'react'
import {
  Image,
  ScrollView,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Link, useRouter } from 'expo-router'

import * as ImagePicker from 'expo-image-picker'
import * as SecureStore from 'expo-secure-store'

import Icon from '@expo/vector-icons/Feather'
import Logo from '../src/assets/logo.svg'
import { api } from '../src/lib/api'

export default function NewMemorie() {
  const { bottom, top } = useSafeAreaInsets()

  const [isPublic, setIsPublic] = useState(false)
  const [content, setContent] = useState('')
  const [preview, setPreview] = useState<string | null>(null)

  const router = useRouter()

  async function openImagePicker() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setPreview(result.assets[0].uri)
    }
  }

  async function handleCreateMemorie() {
    const token = await SecureStore.getItemAsync('token')

    let coverURL = ''

    if (preview) {
      const uploadFormData = new FormData()

      const objectFile = {
        uri: preview,
        name: 'image.jpg',
        type: 'image/jpeg',
      }

      console.log(objectFile)

      uploadFormData.append('file', objectFile as any)

      const uploadResponse = await api.post('/upload', uploadFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log(uploadResponse)

      coverURL = uploadResponse.data.fileUrl

      await api.post(
        '/memories',
        {
          isPublic,
          coverURL,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      router.push('/memories')
    }
  }
  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingTop: top, paddingBottom: bottom }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <Logo />
        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
            <Icon name="arrow-left" size={16} color="#ffffff" />
          </TouchableOpacity>
        </Link>
      </View>

      <View className="mt-6 space-y-6">
        <View className="flex-row items-center gap-2">
          <Switch
            value={isPublic}
            onValueChange={setIsPublic}
            thumbColor={isPublic ? '#9b79ea' : '#9e9ea0'}
            trackColor={{
              false: '#767577',
              true: '#372560',
            }}
          />
          <Text className="font-body text-base text-gray-200">
            Tornar memória pública
          </Text>
        </View>

        <TouchableOpacity
          onPress={openImagePicker}
          className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/20"
          activeOpacity={0.7}
        >
          {preview ? (
            <Image
              source={{ uri: preview }}
              alt="memorie"
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#9e9ea0" />
              <Text className="font-body text-sm text-gray-200">
                {' '}
                Adicionar foto ou vídeo de capa{' '}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          multiline
          value={content}
          onChangeText={setContent}
          className="p-0 font-body text-lg text-gray-50"
          textAlignVertical="top"
          placeholderTextColor={'#56565a'}
          placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleCreateMemorie}
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
