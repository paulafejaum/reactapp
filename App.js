import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import Talks from './Talks';
import Events from './Events';

export default class App extends Component {

  render() {
    console.log(this.props);
    return (
      <View style={{flex:1}}>
        {this.props.initialScreen === 'Talks' ? 
          <Talks eventFilter={this.props.eventFilter} /> :
          <Events />}
      </View>
    );
  }
}
