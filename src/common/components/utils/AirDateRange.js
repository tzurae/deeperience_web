import React, { Component, PropTypes } from 'react';
import { DateRangePicker } from 'react-dates';

let defaultValue = {
  startDate: null,
  endDate: null,
};

class AirDateRange extends Component {
  constructor() {
    super();
    this.state = {
      focusedInput: null,
    };
    this.onDatesChange = this._onDatesChange.bind(this);
    this.onFocusChange = this._onFocusChange.bind(this);
  }

  _onDatesChange({ startDate, endDate }) {
    this.props.input.onChange({ startDate, endDate });
  }

  _onFocusChange(focusedInput) {
    this.setState({ focusedInput });
  }

  render() {
    let {
      input,
      ...rest
    } = this.props;
    let { focusedInput } = this.state;

    return (
      <DateRangePicker
        {...rest}
        onDatesChange={this.onDatesChange}
        onFocusChange={this.onFocusChange}
        focusedInput={focusedInput}
        startDate={input.value.startDate || defaultValue.startDate}
        endDate={input.value.endDate || defaultValue.endDate}
      />
    );
  }
}

AirDateRange.propTypes = {
  input: PropTypes.object.isRequired,
};

export default AirDateRange;
