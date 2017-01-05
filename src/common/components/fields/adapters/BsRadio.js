import React, { PropTypes } from 'react'
import RadioItem from '../bases/RadioItem'

const BsRadio = ({ input, options, ...rest }) => (
  <span>
    {options.map((option, index) => (
      <div
        key={option.value}
        {...rest}
      >
        <RadioItem
          input={input}
          option={option}
        />
      </div>
    ))}
  </span>
)

BsRadio.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    })
  ),
}

export default BsRadio
