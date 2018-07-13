import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  View
} from 'react-native';
import reactNativeIntegrate from 'reactNativeIntegrate';

export default class Events extends Component {

  openNativeScreen = (id) => {
    reactNativeIntegrate.showScreenWithParameters(reactNativeIntegrate.TALKS, {selectedEvent: id});
  }

  constructor(props) {
    super(props);
    
    this.state = { events: [] };
  }

  componentDidMount() {
    fetch("https://api.globalcode.com.br/v1/publico/evento/104/modalidades")
    .then(response => response.json())
    .then(response => this.setState({ events: response }))
    .catch( error => Alert.alert(`Erro ${error}`));
  }

  keyExtractor = (item, index) => `${item.id}`;

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render() {
    
    return (
      <FlatList style={{flex:1}}
        extraData={this.state}
        keyExtractor={this.keyExtractor}
        data={this.state.events}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => 
            <TouchableOpacity style={{flex:1}} onPress={() => this.openNativeScreen(item.id)}>
              <View style={{flex:1}}>
                <Text style={{fontWeight: 'bold'}}>{item.descricao}</Text>
                <Text>{item.publicoAlvo}</Text>
                <Text>{item.data}</Text>
              </View>
            </TouchableOpacity>
        }/>
    );
  }
}
