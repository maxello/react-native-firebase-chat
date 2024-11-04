import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth } from '@/context/authContext'
import { StatusBar } from 'expo-status-bar';
import ChatList from '@/components/ChatList';
import Loading from '@/components/Loading';
import { DocumentData, getDocs, query, where } from 'firebase/firestore';
import { usersRef } from '@/firebaseConfig';
import { User } from '@/types/User';

export default function Home() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    if (user?.userId) {
      getUsers();
    }
  }, [user?.userId]);
  const getUsers = async() => {
    const q = query(usersRef, where('userId', '!=', user?.userId));

    const querySnapshot = await getDocs(q);
    let data: User[] = [];
    querySnapshot.forEach((doc: DocumentData) => {
      data.push({...doc.data()});
    });
    setUsers(data);
  }

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />
      { users.length ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex-1 justify-center items-center">
          <Loading size={140} />
        </View>
      )
      }
    </View>
  )
}