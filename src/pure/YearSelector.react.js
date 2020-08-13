/**
* YearSelector pure component.
* @flow
*/

import React, { Component, PropTypes } from 'react';
import {
  Slider,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList
} from 'react-native';

// Component specific libraries.
import _ from 'lodash';
import Moment from 'moment';
import { isTablet } from 'react-native-device-info';

const thisdata = [];

type Props = {
  style?: View.propTypes.style,
  // Focus and onFocus for managing the calendar.
  focus: Moment,
  onFocus?: (date: Moment) => void,
  // Minimum and maximum date allowed.
  minDate: Moment,
  maxDate: Moment,
  // Styling properties.
  minimumTrackTintColor?: string,
  maximumTrackTintColor?: string,
  yearSlider?: Slider.propTypes.style,
  yearText?: Text.propTypes.style,
  yearflatlistText?: Text.propTypes.style,
  is_landscape: Boolean
};
type State = {
  year: Number,
};

const initYear = 1900;
const currentYear = Number((new Date()).getFullYear());
const years = Array(currentYear - initYear + 3).fill().map((v, i) => i + 1).reverse();
const is_pad = isTablet();
// var defaultyear = Moment().year('YYYY');

export default class YearSelector extends Component {
  props: Props;
  state: State;
  static defaultProps: Props;

  constructor(props: Object) {
    super(props);
    this.state = {
      year: props.focus.year(),
    }

    thisdata[0] = this;
    this.onSelectYear = this.onSelectYear.bind(this);
  }

  _onFocus = (year: number): void => {
    let date = Moment(this.props.focus);
    date.year(year);
    this.props.onFocus && this.props.onFocus(date);
  }

  onSelectYear = (selected_year) => {
    this.setState({ year: selected_year })
    this._onFocus(selected_year)
    // console.log(selected_year)

  }

  renderYear({ item }) {
    const year = initYear + item;
    // console.log(year)

    return <TouchableOpacity
      onPress={() => thisdata[0].onSelectYear(year)}
      // onPress={(year) => console.log(thisdata[0].onSelectYear(year))}
      style={is_pad ? styles.padyearTextContainer : styles.yearTextContainer}>
      <Text style={is_pad ? styles.padyearflatlistText : styles.yearflatlistText}>{year}</Text>
      {/* <Text style={this.state.heighlight_year ? styles.heighlightText : styles.heighlightText}>{year}</Text> */}
    </TouchableOpacity>
  }

  render() {
    return (
      <View style={[{
        flexGrow: 1,
        // Wrapper view default style.
      }, this.props.style]}>
        {/* <Slider
          minimumValue={this.props.minDate.year()}
          maximumValue={this.props.maxDate.year()}
          // TODO: Add a property for this.
          minimumTrackTintColor={this.props.minimumTrackTintColor}
          maximumTrackTintColor={this.props.maximumTrackTintColor}
          step={1}
          value={this.props.focus.year()}
          onValueChange={(year) => this.setState({year})}
          onSlidingComplete={(year) => this._onFocus(year)}
          style={[this.props.yearSlider]}
          />
        <Text style={[styles.yearText, this.props.yearText]}>
          {this.state.year}
        </Text> */}
        <FlatList
          inverted
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 5, maxHeight: 270 }}
          data={years}
          keyExtractor={item => item}
          renderItem={this.renderYear}
        />
      </View>
    );
  }
}
YearSelector.defaultProps = {
  focus: Moment().startOf('month'),
  minDate: Moment(),
  maxDate: Moment(),
};

const styles = StyleSheet.create({
  yearText: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  yearflatlistText: {
    color: '#808080'
  },

  padyearflatlistText: {
    color: '#808080',
    fontSize: 25
  },

  landscapepadyearflatlistText: {
    color: '#808080',
    fontSize: 20
  },

  yearTextContainer: {
    height: 50,
    alignItems: 'center'
  },

  padyearTextContainer: {
    height: 70,
    alignItems: 'center'
  }

});
