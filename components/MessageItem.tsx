import { View, Text } from 'react-native'
import React from 'react'
import { User } from '@/types/User'
import { DocumentData } from 'firebase/firestore'

export default function MessageItem({message, currentUser}: {message: DocumentData, currentUser: User}) {
  if (currentUser?.userId === message?.userId) {
    return (
      <View className="flex-row justify-end mb-3 px-4">
        <View className="w-[70%] flex p-3 rounded-2xl bg-white border border-neutral-200">
          <Text>{message?.text}</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View className="flex-row justify-start mb-3 px-4">
        <View className="w-[70%] flex p-3 rounded-2xl bg-violet-100 border border-neutral-200">
          <Text>{message?.text}</Text>
        </View>
      </View>
    )
  }
  
}