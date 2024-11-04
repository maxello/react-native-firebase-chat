import { KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import React from 'react';

const ios = Platform.OS = 'ios';

type CustomKeyboardViewProps = {
  children: React.ReactNode;
  offset: number;
  fullHeight: boolean;
}

export default function CustomKeyboardView({children, offset = 0, fullHeight = false}: CustomKeyboardViewProps) {
  return (
    <KeyboardAvoidingView
      behavior={ios ? 'padding' : 'height'}
      keyboardVerticalOffset={offset}
      style={fullHeight ? {flex: 1} : {}}
    >
      <ScrollView
        contentContainerStyle={fullHeight ? {flex: 1} : {}}
        keyboardShouldPersistTaps="always"
      >
        { children }
      </ScrollView>
    </KeyboardAvoidingView>
  )
}