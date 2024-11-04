import { View, Text, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Feather, Octicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '@/components/Loading';
import { useAuth } from '@/context/authContext';
import {
  SafeAreaView
} from 'react-native';
import CustomKeyboardView from '@/components/CustomKeyboardView';

export default function signUp() {
  const router = useRouter();
  const { register } = useAuth();

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert('Sign Up', 'Please fill all fields.');
      return;
    }
    setLoading(true);
    let response = await register(emailRef.current, passwordRef.current, usernameRef.current);
    setLoading(false);

    if (!response.success) {
      Alert.alert('Sign Up', response.msg);
    }
  }
  return (
    <SafeAreaView className="flex-1 bg-pink-200">
      <CustomKeyboardView>
        <View className="flex-1 items-center p-[20]">
          <View className="justify-center items-center w-[60] h-[60] relative z-10 bg-violet-700 rounded-full">
            <MaterialIcons name="app-registration" size={24} color="white" />
          </View>
          <View className="w-full rounded-lg bg-white -top-[30] shadow-md px-5 py-10">
            <Text className="font-bold tracking-wider text-center text-2xl mt-4 mb-6">Sign Up</Text>
            <View className="gap-5">

              <View className="bg-neutral-100 rounded-md h-[50] items-center justify-center">
                <View className="flex-row px-3 gap-3">
                  <View className="w-[32] items-center">
                    <Feather name="user" size={24} color="gray" />
                  </View>
                  <TextInput
                    onChangeText={value => usernameRef.current = value}
                    editable={!loading}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Username"
                    placeholderTextColor={'gray'}
                  />
                </View>
              </View>

              <View className="bg-neutral-100 rounded-md h-[50] items-center justify-center">
                <View className="flex-row px-3 gap-3">
                  <View className="w-[32] items-center">
                    <Octicons name="mail" size={24} color="gray" />
                  </View>
                  <TextInput
                    onChangeText={value => emailRef.current = value}
                    editable={!loading}
                    inputMode="email"
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Email Address"
                    placeholderTextColor={'gray'}
                  />
                </View>
              </View>

              <View className="bg-neutral-100 rounded-md h-[50] items-center justify-center">
                <View className="flex-row px-3 gap-3">
                  <View className="w-[32] items-center">
                    <Octicons name="lock" size={24} color="gray" />
                  </View>
                  <TextInput
                    onChangeText={value => passwordRef.current = value}
                    secureTextEntry
                    editable={!loading}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                  />
                </View>
              </View>

              <View>
                {
                  loading ? (
                    <View className="h-[50] justify-center items-center">
                      <Loading size={100} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => handleRegister()}
                      className="bg-violet-700 justify-center items-center rounded-md h-[50]"
                    >
                      <Text className="text-white font-bold text-lg tracking-wider">Sign Up</Text>
                    </TouchableOpacity>
                  )
                }
              </View>
              <View className="flex-row justify-center">
                <Text className="font-semibold text-neutral-500">Already have an account? </Text>
                <Pressable onPress={() => { router.push('signIn') }}>
                  <Text className="font-semibold text-violet-500">Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </CustomKeyboardView>
    </SafeAreaView>
  )
}