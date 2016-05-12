import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import PureInput from './PureInput';

@reduxForm({
  form: 'login',
  fields: [
    'email',
    'password',
  ],
})
export default class LoginForm extends Component {
  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const {
      fields: { email, password },
      handleSubmit,
    } = this.props;

    return (
      <form className="form-horizontal" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="control-label col-sm-2">
            Email
          </label>
          <div className="col-sm-10">
            <PureInput
              className="form-control"
              type="text"
              placeholder="Email"
              field={email}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-2">
            Password
          </label>
          <div className="col-sm-10">
            <PureInput
              className="form-control"
              type="password"
              placeholder="Password"
              field={password}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button
              className="btn btn-default"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    );
  }
};
