import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Form extends Component {
  getChildContext() {
    return {
      horizontal: this.props.horizontal,
    };
  }

  render() {
    const {
      horizontal,
      className,
      children,
      ...rest,
    } = this.props;
    const cx = classNames({
      'form-horizontal': horizontal,
    }, className);
    return (
      <form className={cx} {...rest}>
        {children}
      </form>
    );
  }
};

const Field = ({ children, ...rest }) => (
  <div className="form-group">
    {children}
  </div>
);

const Input = (
  { title, description, isError, className, ...rest },
  { horizontal }
) => {
  const cxField = classNames(
    'form-group',
    {'has-error': isError}
  );
  const cxInput = classNames(
    'form-control',
    className
  );
  return horizontal ? (
    <div className={cxField}>
      {title &&
        <label className="control-label col-sm-2">
          {title}
        </label>}
      <div className="col-sm-10">
        <input className={cxInput} {...rest} />
        {description &&
          <span className="help-block">{description}</span>}
      </div>
    </div>
  ) : (
    <div className={cxField}>
      {title &&
        <label>
          {title}
        </label>}
      <input className={cxInput} {...rest} />
      {description &&
        <span className="help-block">{description}</span>}
    </div>
  );
};

const Button = ({ title, className, ...rest }, { horizontal }) => {
  const cx = classNames('btn', 'btn-default', className);
  const btn = (
    <button className={cx} {...rest}>
      {title}
    </button>
  );

  return (
    <div className="form-group">
      {horizontal &&
        <div className="col-sm-offset-2 col-sm-10">
          {btn}
        </div>}
      {!horizontal &&
        btn}
    </div>
  );
};

Form.propTypes = {
  horizontal: PropTypes.bool,
};

Form.childContextTypes = {
  horizontal: PropTypes.bool,
};

Input.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  isError: PropTypes.bool,
};

Input.contextTypes = {
  horizontal: PropTypes.bool,
};

Button.propTypes = {
  title: PropTypes.string,
};

Button.contextTypes = {
  horizontal: PropTypes.bool,
};

Form.Field = Field;
Form.Input = Input;
Form.Button = Button;

export default Form;
