import React from 'react'
import { connect } from 'react-redux'
import Head from '../Head'
import Text from '../Text'
import _ from 'lodash'

const mapStateToProps = (state) => {
  return {
    routing: state.get('routing'),
  }
}

const SocialAuthButtonList = ({ routing, login }) => {
  // url : object
  const url = routing.getIn(['locationBeforeTransitions', 'query']).toJS()
  let search
  if (_.isEmpty(url)) {
    search = ''
  } else {
    search = `?next=${url.next}`
  }
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
        <span className="fa fa-facebook"/>
        <Text
          id={login ? 'login.facebook' : 'register.facebook'}
          style={{ letterSpacing: '2px' }}
        />
      </a>
    </div>
  )
}

export default connect(mapStateToProps)(SocialAuthButtonList)
