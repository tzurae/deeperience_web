import React, { PropTypes } from 'react';

let Select = ({ input, options, ...rest }) => (
  <select {...input} {...rest}>
    {options.map(({ label, ...optionProps }) => (
      <option
        key={optionProps.value}
        {...optionProps}
      >
        {label}
      </option>
    ))}
  </select>
);

Select.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ),
};

export default Select;
