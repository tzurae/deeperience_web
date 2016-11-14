// ref:
//  - <https://github.com/erikras/redux-form/issues/1857#issuecomment-249890206>
import React, { PropTypes } from 'react';

let RadioItem = ({ input, option }) => {
  let { label, value, ...optionProps } = option;

  return (
    <label>
      <input
        {...input}
        type="radio"
        name={`${input.name}_${value}`}
        value={value}
        checked={value === input.value}
        {...optionProps}
      /> {label}
    </label>
  );
};

RadioItem.propTypes = {
  input: PropTypes.object.isRequired,
  option: PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  }),
};

export default RadioItem;
