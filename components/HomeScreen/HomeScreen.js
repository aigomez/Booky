import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator  } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

import React, { Component } from 'react';
import styles from './HomeScreen_styles';
import ShadowView from 'react-native-simple-shadow-view';
import SplashScreen from 'react-native-splash-screen'

import AsyncStorage from '@react-native-community/async-storage';
import { setInStorage, getFromStorage } from '../../utils/storage';

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

import Library from '../Library/Library';
import Join from '../Users/Join';
import Log_In from '../Users/Log_In';

export class HomeScreen extends Component {

  constructor() {
    super()
    this.state = {
      dataSource: [],
      isLoading: true
    }
  }

  async componentDidMount() {

    // const isLogged =  await AsyncStorage.getItem('the_main_app');
    //alert(JSON.stringify(retrievedItem)) para verlo

    SplashScreen.hide();
    fetch('https://bookydb.herokuapp.com/Lib/')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        dataSource: responseJson, // mongodb te da el json sin nombre, entonces no le pongas nada
        isLoading: false
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }


  render() {

    return (
      this.state.isLoading
      ?
      <View style = {{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size = "large" color = "orange" animating />
      </View>
      :

      <View style = { styles.bottom }>
        <FlatList
          data = { this.state.dataSource }
          keyExtractor = { (item, index) => index.toString() }
          horizontal = {false}
          numColumns = {2}
          initialNumToRender = {4}
          renderItem={({ item }) => (
            <View style = { styles.container }>
              <ShadowView style = { styles.shadow }>
                <TouchableNativeFeedback onPress = { ()=>{ Linking.openURL(item.pdf)} }>
                  <Image
                    style = { styles.imgs }
                    source = {{ uri: item.image }}
                  />
                </TouchableNativeFeedback>
              </ShadowView>
            </View>
          )}
        />
      </View>
    );
  }
}

function HomeScreen_H({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#d60a4e'},
      }}
    >
      <Stack.Screen
      name="Library"
      component={HomeScreen}
      options={{
        headerLeft: () => (
          <View>
            <TouchableNativeFeedback onPress={() => navigation.toggleDrawer()} >
              <Image
                style={{ width: 30, height: 25, marginLeft: 20 }}
                source = {{ uri: 'https://dl3.pushbulletusercontent.com/6Pln4OAvYNlqE9hbRjGWUAjqLilYCGkz/1.png' }}
              />
            </TouchableNativeFeedback>
          </View>
        ),
      }}
    />
    </Stack.Navigator>
  );
}

function Library_H({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#00b8e7'},
      }}
    >
      <Stack.Screen
        name="New Book"
        component={Library}
        options={{
          headerLeft: () => (
            <View>
              <TouchableNativeFeedback onPress={() => navigation.toggleDrawer()} >
                <Image
                  style={{ width: 30, height: 25, marginLeft: 20 }}
                  source = {{ uri: 'https://dl3.pushbulletusercontent.com/6Pln4OAvYNlqE9hbRjGWUAjqLilYCGkz/1.png' }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Join_H({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#f23809'},
      }}
    >
      <Stack.Screen
        name="Join"
        component={Join}
        options={{
          headerLeft: () => (
            <View>
              <TouchableNativeFeedback onPress={() => navigation.toggleDrawer()} >
                <Image
                  style={{ width: 30, height: 25, marginLeft: 20 }}
                  source = {{ uri: 'https://dl3.pushbulletusercontent.com/6Pln4OAvYNlqE9hbRjGWUAjqLilYCGkz/1.png' }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Log_In_H({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#6dc51e'},
      }}
    >
      <Stack.Screen
        name="Log In"
        component={Log_In}
        options={{
          headerLeft: () => (
            <View>
              <TouchableNativeFeedback onPress={() => navigation.toggleDrawer()} >
                <Image
                  style={{ width: 30, height: 25, marginLeft: 20 }}
                  source = {{ uri: 'https://dl3.pushbulletusercontent.com/6Pln4OAvYNlqE9hbRjGWUAjqLilYCGkz/1.png' }}
                />
              </TouchableNativeFeedback>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

export default class HomeScreens extends Component {

  constructor() {
    super()
    this.state = {
      isLogged: ''
    }
  }

  async componentDidUpdate(prevProps,prevState) {
    const isLogged =  await AsyncStorage.getItem('the_main_app');
    if (this.state.isLogged !== isLogged) {
      console.log(this.state.isLogged, isLogged)
   } else {
     console.log(this.state.isLogged, isLogged)
   }

  }

  async componentDidMount() {
    const isLogged =  await AsyncStorage.getItem('the_main_app');
    if (isLogged == null) {
      this.setState({ isLogged: false }); // no lo está
    } else {
      this.setState({ isLogged: true }); // está logeado
    }
  }

  render() {
    const Drawer = createDrawerNavigator();
        // if (this.state.isLogged == false) { // si no lo está muestro todo
        //   console.log(this.state.isLogged)
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
                <Drawer.Screen name="Log In / Out" component={Log_In_H} />
              </Drawer.Navigator>
            </NavigationContainer>
          );
        // } else { // si lo está, sólo muestra Library y New Book
        //   console.log(this.state.isLogged)
        //   return (
        //     <NavigationContainer>
        //       <Drawer.Navigator
        //         initialRouteName = "Library"
        //         edgeWidth = {100}
        //         drawerContentOptions={{
        //           activeTintColor: '#e91e63',
        //           itemStyle: { marginVertical: 5 },
        //         }}
        //       >
        //         <Drawer.Screen name="Library" component={HomeScreen_H} />
        //         <Drawer.Screen name="New Book" component={Library_H} />
        //         <Drawer.Screen name="Log Out" component={Log_In_H} />
        //       </Drawer.Navigator>
        //     </NavigationContainer>
        //   );
        // }
    };
  }
