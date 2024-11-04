import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '@/components/ChatRoomHeader';
import { User } from '@/types/User';
import MessagesList from '@/components/MessagesList';
import { Feather } from '@expo/vector-icons';
import CustomKeyboardView from '@/components/CustomKeyboardView';
import { getRoomId } from '@/utils/common';
import { useAuth } from '@/context/authContext';
import { addDoc, collection, doc, DocumentData, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebaseConfig';

export default function ChatRoom() {
  const item: User = useLocalSearchParams();
  const { user } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollViewRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    createRoomIfNotExists();

    const roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMessages = snapshot.docs.map(doc => {
        const data = doc.data();
        data.id = doc.id;
        return data;
      });
      setMessages([...allMessages]);
    });

    const KeyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView);

    return () => {
      unsub();
      KeyboardDidShowListener.remove();
    };
  }, []);

  const updateScrollView = () => {
    scrollViewRef?.current?.scrollToEnd({ animated: true });
  }

  const createRoomIfNotExists = async () => {
    const roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date())
    });
  }

  const handleSendMessage = async () => {
    const msg = message.trim();
    if (!msg) return;
    setLoading(true);
    try {
      const roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      setMessage('');
      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: msg,
        profileUrl: user?.profileUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date())
      });
      setLoading(false);
      console.log("new message id: ", newDoc.id);
    } catch(e: any) {
      setLoading(false);
      Alert.alert("Message", e.message);
    }
  }

  return (
    <CustomKeyboardView fullHeight={true} offset={100}>
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View className="h-2 border-b border-neutral-200" />
        <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
          <View className="flex-1">
            <MessagesList 
              scrollViewRef={scrollViewRef} 
              updateScrollView={updateScrollView} 
              messages={messages} 
              currentUser={user} 
            />
          </View>
          <View className="pt-2 mb-4">
            <View className="flex-row items-center mx-3 justify-between bg-white border py-1 pl-4 pr-1 border-neutral-300 rounded-full">
              <TextInput
                onChangeText={value => setMessage(value)}
                value={message}
                placeholder="Type message..."
                className="h-[40] mr-2 flex-1"
                readOnly={loading}
                placeholderTextColor="#737373"
              />
              <TouchableOpacity 
                disabled={loading} 
                onPress={handleSendMessage} 
                className="h-[40] w-[40] relative rounded-full mr-[1] p-2 bg-violet-400 justify-center items-center"
              >
                <Feather size={20} name="send" color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  )
}