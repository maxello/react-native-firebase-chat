import { View, FlatList } from 'react-native';
import React from 'react';
import ChatItem from './ChatItem';

import { User } from '@/types/User';
import { useRouter } from 'expo-router';

type ChatListProps = {
  users: User[];
  currentUser: User;
}

export default function ChatList({users, currentUser}: ChatListProps) {
  const router = useRouter();
  return (
    <View className="flex-1 px-4">
      <FlatList
        data={users}
        contentContainerStyle={{flex: 1, paddingVertical: 25}}
        keyExtractor={item=>item.userId}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => <ChatItem router={router} noBorder={index + 1 === users.length} item={item} currentUser={currentUser} />}
      />
    </View>
  )
}