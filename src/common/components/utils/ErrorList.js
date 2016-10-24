import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Alert from 'react-bootstrap/lib/Alert';
import Errors from '../../constants/Errors';
import { removeError } from '../../actions/errorActions';

function renderMeta(error) {
  let messages = [];
  if (error.code === Errors.STATE_PRE_FETCHING_FAIL.code) {
    messages.push(error.meta.detail);
  }
  if (error.meta.path) {
    messages.push(`(at path '${error.meta.path}')`);
  }
  if (error.code === Errors.UNKNOWN_EXCEPTION.code) {
    messages.push(error.meta.toString());
  }
  return messages.map((message) => (
    <p key={message}>
      {message}
    </p>
  ));
}

let ErrorList = ({ errors, dispatch }) => (
  <Grid>
    {errors.map((error) => (
      <Alert
        key={error.id}
        bsStyle="danger"
        onDismiss={() => dispatch(removeError(error.id))}
      >
        <h4>{error.title}</h4>
        {' ' + error.detail}
        {error.meta && renderMeta(error)}
      </Alert>
    ))}
  </Grid>
);

export default connect(state => ({
  errors: state.errors,
}))(ErrorList);
