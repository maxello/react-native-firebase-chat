import { ScrollView } from 'react-native';
import React from 'react';
import { DocumentData } from 'firebase/firestore';
import MessageItem from './MessageItem';
import { User } from '@/types/User';

type MessagesListProps = {
  messages: DocumentData[];
  currentUser: User;
  scrollViewRef: any;
  updateScrollView: () => void;
}

export default function MessagesList({messages, currentUser, scrollViewRef, updateScrollView}: MessagesListProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingTop: 10}}
      ref={scrollViewRef}
      onContentSizeChange={updateScrollView}
    >
      {
        messages.map((message: DocumentData) => {
          return (
            <MessageItem key={message.id} message={message} currentUser={currentUser} />
          );
        })
      }
    </ScrollView>
  )
}