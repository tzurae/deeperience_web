// ref:
//  - <https://github.com/erikras/redux-form/issues/1037>
import React, { Component, PropTypes } from 'react';

class CheckboxListItem extends Component {
  constructor() {
    super();
    this.onChange = this._onChange.bind(this);
  }

  _onChange(e) {
    let { input, option: { value } } = this.props;
    let newValue = [...input.value];

    if (e.target.checked) {
      newValue.push(value);
    } else {
      newValue.splice(newValue.indexOf(value), 1);
    }

    return input.onChange(newValue);
  }

  render() {
    let { input, index, option } = this.props;
    let { label, value, ...optionProps } = option;

    return (
      <label>
        <input
          type="checkbox"
          name={`${input.name}[${index}]`}
          value={value}
          checked={input.value.indexOf(value) !== -1}
          onChange={this.onChange}
          {...optionProps}
        /> {label}
      </label>
    );
  }
};

CheckboxListItem.propTypes = {
  input: PropTypes.object.isRequired,
  index: PropTypes.number,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default CheckboxListItem;
