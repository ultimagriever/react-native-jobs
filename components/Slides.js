import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

class Slides extends Component {
  renderLastSlide(index) {
    if (index + 1 === this.props.data.length) {
      return (
        <Button
          title="Onwards!"
          buttonStyle={styles.buttonStyle}
          onPress={this.props.onComplete}
          raised
        />
      )
    }
  }

  renderSlides() {
    return this.props.data.map((slide, index) => (
      <View
        key={slide.text}
        style={[
          styles.slideStyle,
          {
            backgroundColor: slide.color
          }
        ]}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        {
          this.renderSlides()
        }
      </ScrollView>
    );
  }
}

const styles = {
  slideStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  slideText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white'
  },
  buttonStyle: {
    backgroundColor: '#0288D1',
    marginTop: 15
  }
}

export default Slides;

