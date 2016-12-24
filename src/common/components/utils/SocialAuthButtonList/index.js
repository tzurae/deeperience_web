import React from 'react'
import { connect } from 'react-redux'
import Head from '../Head'
import Text from '../../utils/Text'

const mapStateToProps = (state) => {
  return {
    routing: state.get('routing'),
  }
}

const SocialAuthButtonList = ({ routing, login }) => {
  const next = routing.getIn(['locationBeforeTransitions', 'query']).toJS()
  const search = next ? `?next=${next}` : ''

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
