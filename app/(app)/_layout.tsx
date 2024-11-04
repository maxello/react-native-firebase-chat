import React from 'react';
import { Stack } from 'expo-router';
import HomeHeader from '@/components/HomeHeader';
import {
  SafeAreaView
} from 'react-native';

export default function _layout() {
  return (
    <SafeAreaView className="flex-1">
      <Stack>
        <Stack.Screen 
          name="home"
          options={{
            header: () => <HomeHeader />,
          }}
        />
      </Stack>
    </SafeAreaView>
  )
}