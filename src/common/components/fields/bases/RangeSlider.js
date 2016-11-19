import React, { Component, PropTypes } from 'react'
import ReactSlider from 'react-slider'

const defaultValue = {
  min: 0,
  max: 0,
}

class RangeSlider extends Component {
  render() {
    const {
      input,
      ...rest
    } = this.props

    return (
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
  }
}

RangeSlider.propTypes = {
  input: PropTypes.object.isRequired,
}

export default RangeSlider
