import React, { Component } from 'react';
import { Text, Button, View, TextInput, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { setInStorage, getFromStorage } from '../../utils/storage';

import HomeScreen from '../HomeScreen/HomeScreen';

// But also, instead of manually binding this, I would recommend letting JS do the binding automatically, by using an Arrow Function ;)

export default class Log_In extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      username: '',
      password: '',
      token: '',
      isDisabled: true,
    }
  }

  onChangePhone = (value)  => {
    this.setState({
      phone: value
    })
  }

  onChangeUsername = (value)  => {
    this.setState({
      username: value
    })
  }

  onChangePassword = (value)  => {
    this.setState({
      password: value
    })

    if (value.length >= 8 && this.state.username != '' || value.length >= 8 && this.state.phone != '') {
      this.setState({ isDisabled: false }) // habilto el submit
    }
    else {
      this.setState({ isDisabled: true }) // sino queda deshabilitado
    }
  }

  onLogIn = () => {

    fetch('https://bookydb.herokuapp.com/Log_In/', {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        phone: this.state.phone,
        username: this.state.username,
        password: this.state.password,
      }),
    })

    .then(res => res.json())

    .then(json => {

      console.log('json', json);

      if (json.success) {
        setInStorage('the_main_app', { token: json.token });

        this.setState({
          token: json.token,
          phone: "",
          username: "",
          password: ""
        });
      }
    });
  }

  onLogOut = () => {

    fetch('https://bookydb.herokuapp.com/Log_Out/' + this.state.token, { method: 'POST' })

    .then(res => res.json())

    .then(json => {

      console.log('json', json);

      if (json.success) {
        setInStorage('the_main_app', { token: '' });
        this.setState({
          token: '',
        });
      }
    });
  }

  render() {
    const { token } = this.state;
    const { navigate } = this.props.navigation;

    if (token) {
      return (
        <View>
          <Button
            color = '#6dc51e'
            title = "Log Out"
            onPress={() => {
              this.onLogOut();
              ToastAndroid.show('Logged out!', ToastAndroid.SHORT);
              navigate('Log In');
            }}
          />
        </View>
      )
    }

    if (!token) {
      return (
        <View>
          <View>
            <TextInput
              maxLength = {20}
              autoFocus = {true}
              keyboardType = 'number-pad'
              placeholder = "Phone Number (optional)"
              value = {this.state.phone}
              onChangeText = {(value) => this.onChangePhone(value)} // paso a la prop onChangeText la callback function onChangePhone que recibe el valor del phone ('value')
              selectionColor = '#6dc51e'
            />

            <TextInput
              maxLength = {20}
              placeholder = "Username"
              value = {this.state.username}
              onChangeText = {(value) => this.onChangeUsername(value)}
              selectionColor = '#6dc51e'
            />

            <TextInput
              maxLength = {30}
              placeholder = "Password"
              secureTextEntry = {true}
              value = {this.state.password}
              onChangeText = {(value) => this.onChangePassword(value)}
              //underlineColorAndroid = "orange"
              selectionColor = '#6dc51e'
            />
          </View>

          <View>
            <Button
              color = '#6dc51e'
              title = "Log In"
              onPress={() => {
                this.onLogIn();
                ToastAndroid.show('Welcome!', ToastAndroid.SHORT);
                navigate('Library');
              }}
              disabled = {this.state.isDisabled}
            />
          </View>
        </View>
      );
    }
  }
}
