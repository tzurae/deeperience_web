import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Errors from '../../constants/Errors';
import { removeError } from '../../actions/errorActions';

let ErrorList = ({ errors, dispatch }) => (
  <Grid>
    {errors.map((error) => (
      <div
        key={error.id}
        className="alert alert-danger alert-dismissible"
        role="alert"
      >
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
          onClick={() => dispatch(removeError(error.id))}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{error.title}</strong>
        {' ' + error.detail}
        {error.meta && [(
          <p key="0">
            {error.code === Errors.STATE_PRE_FETCHING_FAIL.code && (
              <span>{error.meta.detail}</span>
            )}
          </p>
        ), (
          <p key="1">
            {error.meta.path && `(at path '${error.meta.path}')`}
          </p>
        ), (
          <p key="2">
            {error.code === Errors.UNKNOWN_EXCEPTION.code && (
              <span>{error.meta.toString()}</span>
            )}
          </p>
        )]}
      </div>
    ))}
  </Grid>
);

export default connect(state => ({
  errors: state.errors,
}))(ErrorList);
