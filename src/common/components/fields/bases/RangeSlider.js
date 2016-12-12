import React, { PropTypes } from 'react'
import ReactSlider from 'react-slider'

const defaultValue = {
  min: 0,
  max: 0,
}

const RangeSlider = ({ input, ...rest }) => (
  <ReactSlider
    {...rest}
    onChange={(value) => {
      input.onChange({
        min: value[0],
        max: value[1],
      })
    }}
    value={[
      input.value.min || defaultValue.min,
      input.value.max || defaultValue.max,
    ]}
    withBars
  >
    <div className="slider-handle"></div>
    <div className="slider-handle"></div>
  </ReactSlider>
)

RangeSlider.propTypes = {
  input: PropTypes.object.isRequired,
}

export default RangeSlider
