import assign from 'object-assign'
import React, { PropTypes } from 'react'
import BsFormGroup from 'react-bootstrap/lib/FormGroup'
import Col from 'react-bootstrap/lib/Col'
import Row from 'react-bootstrap/lib/Row'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import HelpBlock from 'react-bootstrap/lib/HelpBlock'

const BsField = ({
  horizontal,
  labelDimensions,
  fieldDimensions,
  showLabel,
  label,
  adapter,
  className,
  meta,
  ...rest
}, {
  defaultHorizontal,
  defaultLabelDimensions,
  defaultFieldDimensions,
  defaultShowLabel,
}) => {
  const isShowError = meta && meta.touched && meta.error
  const Adapter = adapter
  const renderedFormControl = (
    <Adapter {...rest} />
  )

  horizontal = (horizontal === undefined) ? defaultHorizontal : horizontal
  labelDimensions = assign({}, defaultLabelDimensions, labelDimensions || {})
  fieldDimensions = assign({}, defaultFieldDimensions, fieldDimensions || {})
  showLabel = (showLabel === undefined) ? defaultShowLabel : showLabel

  return horizontal ? (
    <BsFormGroup
      className={className}
      validationState={isShowError ? 'error' : undefined}
    >
      {showLabel && (
        <Col componentClass={ControlLabel} {...labelDimensions}>
          {label}
        </Col>
      )}
      <Col {...fieldDimensions}>
        {renderedFormControl}
        {isShowError && (
          <HelpBlock>{meta.error}</HelpBlock>
        )}
      </Col>
    </BsFormGroup>
  ) : (
    <BsFormGroup
      className={className}
      validationState={isShowError ? 'error' : undefined}
    >
      {showLabel && (
        <Row>
          <Col componentClass={ControlLabel} {...labelDimensions}>
            <ControlLabel>{label}</ControlLabel>
          </Col>
        </Row>
      )}
      <Row>
        <Col {...fieldDimensions}>
          {renderedFormControl}
          {isShowError && (
            <HelpBlock>{meta.error}</HelpBlock>
          )}
        </Col>
      </Row>
    </BsFormGroup>
  )
}

BsField.propTypes = {
  horizontal: PropTypes.bool,
  labelDimensions: PropTypes.object,
  fieldDimensions: PropTypes.object,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
  adapter: PropTypes.func,
  className: PropTypes.string,
}

BsField.contextTypes = {
  defaultHorizontal: PropTypes.bool,
  defaultLabelDimensions: PropTypes.object,
  defaultFieldDimensions: PropTypes.object,
  defaultShowLabel: PropTypes.bool,
}

BsField.defaultProps = {
  label: '',
  className: '',
}

export default BsField
