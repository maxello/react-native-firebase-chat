import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import Avatar from './Avatar';
import { User } from '@/types/User';

export default function ChatRoomHeader({user, router}: {user: User, router: any}) {
  return (
    <Stack.Screen 
      options={{
        title: '',
        headerShadowVisible: false,
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={25} color="#737373" />
            </TouchableOpacity>
            <View className="flex-row items-center gap-x-3">
              <Avatar user={user} size={30} />
              <Text className="text-neutral-700 font-medium text-lg">{user?.username}</Text>
            </View>
          </View>
        )
      }}
    />
  )
}