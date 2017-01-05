import assign from 'object-assign'
import React, { PropTypes } from 'react'
import BsFormGroup from 'react-bootstrap/lib/FormGroup'
import Col from 'react-bootstrap/lib/Col'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'

const BsFormFooter = ({
  horizontal,
  labelDimensions,
  fieldDimensions,
  showLabel,
  label,
  children,
  style,
  className,
}, {
  defaultHorizontal, defaultLabelDimensions, defaultFieldDimensions,
}) => {
  horizontal = (horizontal === undefined) ? defaultHorizontal : horizontal
  labelDimensions = assign({}, defaultLabelDimensions, labelDimensions || {})
  fieldDimensions = assign({}, defaultFieldDimensions, fieldDimensions || {})

  return horizontal ? (
    <BsFormGroup
      className={className}
      style={{ textAlign: 'center', ...style }}
    >
      {showLabel && (
        <Col componentClass={ControlLabel} {...labelDimensions}>
          {label}
        </Col>
      )}
      <Col {...fieldDimensions}>
        {children}
      </Col>
    </BsFormGroup>
  ) : (
    <BsFormGroup className={className} style={style}>
      {children}
    </BsFormGroup>
  )
}

BsFormFooter.propTypes = {
  horizontal: PropTypes.bool,
  labelDimensions: PropTypes.object,
  fieldDimensions: PropTypes.object,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
}

BsFormFooter.contextTypes = {
  defaultLabelDimensions: PropTypes.object,
  defaultFieldDimensions: PropTypes.object,
  defaultHorizontal: PropTypes.bool,
}

BsFormFooter.defaultProps = {
  showLabel: true,
  label: '',
  className: '',
}

export default BsFormFooter
