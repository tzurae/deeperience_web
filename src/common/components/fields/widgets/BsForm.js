import React, { PropTypes, Component } from 'react';
import Form from 'react-bootstrap/lib/Form';

class BsForm extends Component {
  getChildContext() {
    let {
      defaultHorizontal,
      defaultLabelDimensions,
      defaultFieldDimensions,
    } = this.props;

    return {
      defaultHorizontal,
      defaultLabelDimensions,
      defaultFieldDimensions,
    };
  }

  render() {
    let {
      /* eslint-disable */
      // consume props owned by BsForm
      defaultHorizontal, defaultLabelDimensions, defaultFieldDimensions,
      /* eslint-enable */
      children,
      ...rest
    } = this.props;

    return (
      <Form horizontal={defaultHorizontal} {...rest}>
        {children}
      </Form>
    );
  }
};

BsForm.propTypes = {
  defaultHorizontal: PropTypes.bool,
  defaultLabelDimensions: PropTypes.object,
  defaultFieldDimensions: PropTypes.object,
};

BsForm.childContextTypes = {
  defaultHorizontal: PropTypes.bool,
  defaultLabelDimensions: PropTypes.object,
  defaultFieldDimensions: PropTypes.object,
};

BsForm.defaultProps = {
  defaultHorizontal: true,
  defaultLabelDimensions: {
    sm: 2,
  },
  defaultFieldDimensions: {
    sm: 10,
  },
};

export default BsForm;
