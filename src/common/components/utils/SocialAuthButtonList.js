import React from 'react';
import { connect } from 'react-redux';
import Head from '../widgets/Head';

let SocialAuthButtonList = ({ routing }) => {
  let { next } = routing.locationBeforeTransitions.query;
  let search = next ? '?next=' + next : '';

  return (
    <div>
      <Head
        links={[
          'https://cdnjs.cloudflare.com/ajax/libs/bootstrap-social/5.0.0/bootstrap-social.min.css',
        ]}
      />
      <a
        href={`/auth/facebook${search}`}
        className="btn btn-block btn-social btn-facebook"
      >
        <span className="fa fa-facebook"></span>Login with Facebook
      </a>
      <a
        href={`/auth/linkedin${search}`}
        className="btn btn-block btn-social btn-linkedin"
      >
        <span className="fa fa-linkedin"></span>Login with LinkedIn
      </a>
    </div>
  );
};

export default connect(state => ({
  routing: state.routing,
}))(SocialAuthButtonList);
