import React, { Component } from 'react';
import { Text, Button, View, TextInput, Alert, ToastAndroid } from 'react-native';

import HomeScreen from '../HomeScreen/HomeScreen';

export default class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nombrePdf: '',
      image: '',
      pdf: '',
      isDisabled: true,
    }
  }

  onChangenombrePdf = (value)  => {
    this.setState({
     nombrePdf: value
    })
 }

  onChangeimage = (value)  => {
    this.setState({
     image: value
    })
 }

  onChangepdf = (value)  => {
    this.setState({
      pdf: value
    })

    if (value.length >= 8) {
      this.setState({ isDisabled: false })
    }
    else {
      this.setState({ isDisabled: true })
    }
}

  onSubmit(e) {

    if (this.state.image == '') { // si el usuario no seleccionó ninguna imagen, entonces carga una por defecto

      fetch("https://bookydb.herokuapp.com/New_Book/", {
       method: "POST",

       headers: {
         "Content-Type": "application/json"
       },

       body: JSON.stringify({
         nombrePdf: this.state.nombrePdf,
         image: 'https://dl3.pushbulletusercontent.com/8K0j1oY8tZwr7ggyURHoT2xUJ2HF4a1y/default.png',
         pdf: this.state.pdf
       })
     })

     .then(res => { res.json() })
     .catch(error => {Alert.alert('' + error)}); // 'TypeError: Network request failed'

    } else {

      fetch("https://bookydb.herokuapp.com/New_Book/", {
       method: "POST",

       headers: {
         "Content-Type": "application/json"
       },

       body: JSON.stringify({
         nombrePdf: this.state.nombrePdf,
         image: this.state.image,
         pdf: this.state.pdf
       })
     })

     .then(res => { res.json() })
     .catch(error => {Alert.alert('' + error)}); // 'TypeError: Network request failed'
   }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <View>
          <TextInput
            maxLength = {30}
            autoFocus = {true}
            placeholder = "Title (optional)"
            value = {this.state.nombrePdf}
            onChangeText = {(value) => this.onChangenombrePdf(value)}
            selectionColor = '#00b8e7'
          />

          <TextInput
            maxLength = {60}
            placeholder = "Link to Image (optional)"
            value = {this.state.image}
            onChangeText = {(value) => this.onChangeimage(value)}
            selectionColor = '#00b8e7'
          />

          <TextInput
            maxLength = {60}
            placeholder = "Link to PDF"
            value = {this.state.pdf}
            onChangeText = {(value) => this.onChangepdf(value)}
            //underlineColorAndroid = "orange"
            selectionColor = '#00b8e7'
          />
        </View>

        <View>
          <Button
            color = "#00b8e7"
            title = "Add Book"
            onPress={() => {
              this.onSubmit();
              ToastAndroid.show('Let the fun begin ;)', ToastAndroid.SHORT); // pone primero el navigate bobo
              navigate('Library');
            }}
            disabled = {this.state.isDisabled}
          />
        </View>
      </View>
    );
  }
}
