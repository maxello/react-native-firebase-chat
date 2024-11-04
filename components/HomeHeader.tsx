import { View, Text } from 'react-native';
import React from 'react';
import { useAuth } from '@/context/authContext';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { MenuItem } from './CustomMenuItem';
import { Feather, AntDesign } from '@expo/vector-icons';
import Avatar from './Avatar';

export default function HomeHeader() {
  const { user, logout } = useAuth();

  const handleProfile = () => {
    // profile
  }

  const handleLogout = async() => {
    await logout();
  }
  return (
    <View className="flex-row justify-between p-4 bg-violet-400 items-center shadow">
      <View>
        <Text className="font-medium text-white text-lg">Chats</Text>
      </View>
      <View>
        <Menu>
          <MenuTrigger>
            <Avatar user={user} size={30} />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: 'continuous',
                backgroundColor: 'white',
                shadowOpacity: 0.2,
                shadowOffset: {width: 0, height: 0}
              }
            }}
          >
            <MenuItem 
              text="Profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={20} color="#737373" />}
            />
            <Divider />
            <MenuItem 
              text="Sign Out"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={18} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}

const Divider = () => {
  return (
    <View className="pb-[1] w-full bg-neutral-200" />
  )
}