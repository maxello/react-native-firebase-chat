import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { User } from '@/types/user';
import Avatar from './Avatar';
import { formatDate, getRoomId } from '@/utils/common';
import { collection, doc, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function ChatItem({item, router, noBorder, currentUser}: {item: User, router: any, noBorder: boolean, currentUser: User}) {
  const openChatRoom = () => {
    router.push({pathname: '/chatRoom', params: item});
  }
  const [lastMessage, setLastMessage] = useState<undefined | DocumentData | null>(undefined);
  useEffect(() => {
    const roomId = getRoomId(currentUser?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'desc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });

    return unsub;
  }, []);

  const renderTime = () => {
    if (lastMessage) {
      const date = lastMessage.createdAt;
      return formatDate(new Date(date?.seconds * 1000));

    }
  }

  const renderLastMessage = () => {
    if (typeof lastMessage === 'undefined') return 'Loading...';
    if (lastMessage) {
      if (currentUser?.userId === lastMessage?.userId) return `You: ${lastMessage?.text}`;
      return lastMessage?.text;
    } else {
      return 'Say Hi 👋🏻';
    }
  }

  return (
    <TouchableOpacity onPress={openChatRoom} className={`flex-row justify-between items-center px-4 py-3 gap-x-3 ${noBorder ? '' : 'border-b border-b-neutral-200'}`}>
      <Avatar user={item} size={30} />
      <View className="flex-1 gap-1">
        <View className="flex-row justify-between">
          <Text className="text-neutral-800 font-semibold">{item?.username}</Text>
          <Text className="text-neutral-500 font-medium">{renderTime()}</Text>
        </View>
        <Text className="text-neutral-500 font-medium">{renderLastMessage()}</Text>
      </View>
    </TouchableOpacity>
  )
}