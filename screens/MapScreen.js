import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import * as actions from '../actions';

class MapScreen extends Component {
  state = {
    mapLoaded: false,
    region: {
      longitude: -71.270823,
      latitude: 42.1017936,
      longitudeDelta: 0.04,
      latitudeDelta: 0.09
    }
  }

  componentDidMount() {
    this.setState({
      mapLoaded: true
    })
  }

  handleRegionChangeComplete = region => this.setState({ region });

  handlePress = () => {
    this.props.fetchJobs(this.state.region, () => this.props.navigation.navigate('deck'));
  };

  render() {
    if (!this.state.mapLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={this.state.region}
          onRegionChangeComplete={this.handleRegionChangeComplete}
        />
        <View style={styles.buttonContainer}>
          <Button
            large
            title="Search this area"
            backgroundColor="#009688"
            icon={{ name: 'search' }}
            onPress={this.handlePress}
          />
        </View>
      </View>
    )
  }
}

const styles = {
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0
  }
}

export default connect(({ jobs }) => ({ jobs }), actions)(MapScreen);
