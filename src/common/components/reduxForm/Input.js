import React, { Component, PropTypes } from 'react';
import Form from '../main/Form';

class Input extends Component {
  shouldComponentUpdate(nextProps) {
    return this.props.field !== nextProps.field;
  }

  render() {
    const { field, isError, description, ...rest } = this.props;
    return (
      <Form.Input
        isError={
          isError !== undefined?
          isError:
          !!(field.touched && field.error)
        }
        description={
          (field.touched && field.error)? field.error: (description || '')
        }
        {...field}
        {...rest}
      />
    );
  }
}

Input.propTypes = {
  field: PropTypes.object.isRequired,
};

export default Input;
