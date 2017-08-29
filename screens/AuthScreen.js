import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.token) {
      this.props.navigation.navigate('map');
    }
  }

  render() {
    return (
      <View />
    )
  }
}

export default connect(({ auth }) => auth, actions)(AuthScreen);
