import React, { Component } from 'react';
import {
  Alert,
  StyleSheet,
  FlatList,
  Text,
  View,
  WebView
} from 'react-native';

export default class Talks extends Component {

  constructor(props) {
    super(props);

    this.state = { talks: [] };
  }

  componentDidMount() {
    fetch(`https://api.globalcode.com.br/v1/publico/evento/104/modalidade/${this.props.eventFilter}/palestras`)
    .then(response => response.json())
    .then(response => this.setState({ talks: response }))
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
        data={this.state.talks}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({item}) => 
            <View style={{flex:1}}>
              <Text style={{fontWeight: 'bold'}}>{item.titulo}</Text>
              <Text>{item.descricao}</Text>
              <Text>{item.horario}</Text>
            </View>
        }/>
    );
  }
}
