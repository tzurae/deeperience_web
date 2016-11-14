import assign from 'object-assign';
import React, { PropTypes } from 'react';
import BsFormGroup from 'react-bootstrap/lib/FormGroup';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';

let BsField = ({
  horizontal, labelDimensions, fieldDimensions, showLabel, label, adapter,
  meta, ...rest
}, {
  defaultHorizontal, defaultLabelDimensions, defaultFieldDimensions,
}) => {
  let isShowError = meta && meta.touched && meta.error;
  let Adapter = adapter;
  let renderedFormControl = (
    <Adapter {...rest} />
  );

  horizontal = (horizontal === undefined) ? defaultHorizontal : horizontal;
  labelDimensions = assign({}, defaultLabelDimensions, labelDimensions || {});
  fieldDimensions = assign({}, defaultFieldDimensions, fieldDimensions || {});

  return horizontal ? (
    <BsFormGroup validationState={isShowError ? 'error' : undefined}>
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
    <BsFormGroup validationState={isShowError ? 'error' : undefined}>
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
  );
};

BsField.propTypes = {
  horizontal: PropTypes.bool,
  labelDimensions: PropTypes.object,
  fieldDimensions: PropTypes.object,
  showLabel: PropTypes.bool,
  label: PropTypes.string,
};

BsField.contextTypes = {
  defaultHorizontal: PropTypes.bool,
  defaultLabelDimensions: PropTypes.object,
  defaultFieldDimensions: PropTypes.object,
};

BsField.defaultProps = {
  showLabel: true,
  label: '',
};

export default BsField;
