import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

import React, { Component } from 'react';
import styles from './HomeScreen_styles';

import {
  Dimensions,
  Button,
  Image,
  BackgroundImage,
  ScrollView,
  View,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  FlatList,
  Linking,
  ActivityIndicator
} from 'react-native';

import HomeScreen from '../HomeScreen/HomeScreen';
import Library from '../Library/Library';
import Join from '../Users/Join';
import Log_In from '../Users/Log_In';

//Necesité crearlos individualmente porque así podía ponerles un header title
function HomeScreen_H({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Library"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <View style = { styles.container }>
            <TouchableNativeFeedback onPress={() => navigation.toggleDrawer()} >
              <Image
                style={{ width: 66, height: 58 }}
                source = {{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpp3j3f8Cwr4X0t8d4lvmv9Cyv0Lolv7JM-aoyA0AgyayJxDri' }}
              />
            </TouchableNativeFeedback>
          </View>
        ),
      }}
    />
    </Stack.Navigator>
  );
}

function Library_H() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="New Book" component={Library} />
    </Stack.Navigator>
  );
}

function Join_H() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Join" component={Join} />
    </Stack.Navigator>
  );
}

function Log_In_H() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Log In" component={Log_In} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName = "Library"
        edgeWidth = {100}
        drawerContentOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 5 },
        }}
      >
        <Drawer.Screen name="Library" component={HomeScreen_H} />
        <Drawer.Screen name="New Book" component={Library_H} />
        <Drawer.Screen name="Join" component={Join_H} />
        <Drawer.Screen name="Log In" component={Log_In_H} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const Drawer = createDrawerNavigator();
