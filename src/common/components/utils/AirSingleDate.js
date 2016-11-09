import React, { Component, PropTypes } from 'react';
import { SingleDatePicker } from 'react-dates';

let defaultValue = null;

class AirSingleDate extends Component {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
    this.onDateChange = this._onDateChange.bind(this);
    this.onFocusChange = this._onFocusChange.bind(this);
  }

  _onDateChange(date) {
    this.props.input.onChange(date);
  }

  _onFocusChange({ focused }) {
    this.setState({ focused });
  }

  render() {
    let {
      input,
      ...rest
    } = this.props;
    let { focused } = this.state;

    return (
      <SingleDatePicker
        {...rest}
        id="date_input"
        focused={focused}
        date={input.value || defaultValue}
        onDateChange={this.onDateChange}
        onFocusChange={this.onFocusChange}
      />
    );
  }
}

AirSingleDate.propTypes = {
  input: PropTypes.object.isRequired,
};

export default AirSingleDate;
