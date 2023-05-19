import { Link } from 'expo-router'
import { View } from 'react-native'

export default function Memories() {
  return (
    <View className="flex-1 items-center justify-center ">
      <Link href="/newMemorie"> New memories page </Link>
    </View>
  )
}
