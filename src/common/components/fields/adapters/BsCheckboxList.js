import React, { PropTypes } from 'react';
import CheckboxListItem from '../bases/CheckboxListItem';

let BsCheckboxList = ({ input, options, ...rest }) => (
  <span>
    {options.map((option, index) => (
      <div
        className="checkbox"
        key={option.value}
        {...rest}
      >
        <CheckboxListItem
          input={input}
          index={index}
          option={option}
        />
      </div>
    ))}
  </span>
);

BsCheckboxList.propTypes = {
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

export default BsCheckboxList;
