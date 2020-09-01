import React, { Component } from 'react';
import { Text, Button, View, TextInput, Alert, TouchableOpacity, ToastAndroid } from 'react-native';
import HomeScreen from '../HomeScreen/HomeScreen';

import styles from './Inputs';

export default class Join extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: '',
      username: '',
      password: '',
      isDisabled: true, // botón de submit deshabilitado al inicio
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

  if (value.length >= 8 && this.state.username != '') {
    this.setState({ isDisabled: false }) // habilto el submit
  }
  else {
    this.setState({ isDisabled: true }) // sino queda deshabilitado
  }
}

  onSubmit(e) {

    fetch("https://bookydb.herokuapp.com/Join/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        phone: this.state.phone,
        username: this.state.username,
        password: this.state.password
      })
    })
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style = {styles.cont}>
        <View>
          <TextInput
            maxLength = {20}
            autoFocus = {true}
            keyboardType = 'number-pad'
            placeholder = "Phone Number (optional)"
            value = {this.state.phone}
            onChangeText = {(value) => this.onChangePhone(value)} // paso a la prop onChangeText la callback function onChangePhone que recibe el valor del phone ('value'
            selectionColor = '#f23809'
          />

          <TextInput
            maxLength = {20}
            placeholder = "Username"
            value = {this.state.username}
            onChangeText = {(value) => this.onChangeUsername(value)}
            selectionColor = '#f23809'
          />

          <TextInput
            maxLength = {30}
            placeholder = "Password (at least 8 characters)"
            secureTextEntry = {true}
            value = {this.state.password}
            onChangeText = {(value) => this.onChangePassword(value)}
            style = {styles.password}
            selectionColor = '#f23809'
            //underlineColorAndroid = "#f23809"
          />
        </View>

        <View style = {styles.buttons}>
          <Button
            color = '#f23809'
            title = "Create User"
            onPress={() => {
              this.onSubmit();
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
