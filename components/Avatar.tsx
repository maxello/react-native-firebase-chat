import { View, Text, Image } from 'react-native';
import React from 'react';
import { User } from '@/types/User';

export default function Avatar({user, size}: {user: User, size: number}) {
  return (
    <>
      {user?.profileUrl ? (
        <View className="shadow-sm rounded-full overflow-hidden">
          <Image
            source={{
              uri: user?.profileUrl,
            }}
            style={{ height: size, aspectRatio: 1 }}
          />
        </View>
      ) : (
        <View className="h-[30] aspect-square rounded-full justify-center items-center bg-white shadow-sm">
          <Text className="text-violet-400 text-md font-semibold">{user?.username[0]}</Text>
        </View>
      )}
    </>
  )
}