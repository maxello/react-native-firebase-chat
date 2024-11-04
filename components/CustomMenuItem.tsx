import { View, Text } from 'react-native';
import React, { ReactElement } from 'react';

import {
  MenuOption
} from 'react-native-popup-menu';

type MenuItemProps = {
  text: string;
  value: string | null;
  action: (arg0: string | null) => void;
  icon: ReactElement;
}

export const MenuItem = ({text, action, value, icon}: MenuItemProps)  => {
  return (
    <MenuOption 
      onSelect={() => action(value)}
    >
      <View className="px-4 py-2 flex-row justify-between items-center">
        <Text className="text-md font-semibold text-neutral-600">
          {text}
        </Text>
        <View>{icon}</View>
      </View>
    </MenuOption>
  )
}