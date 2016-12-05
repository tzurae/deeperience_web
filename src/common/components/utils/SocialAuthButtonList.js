import React from 'react'
import { connect } from 'react-redux'
import Head from '../widgets/Head'
import Text from '../widgets/Text'

const SocialAuthButtonList = ({ routing }) => {
  const { next } = routing.locationBeforeTransitions.query
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
        <span className="fa fa-facebook"></span>
        <Text id='register.facebook'/>
      </a>
    </div>
  )
}

export default connect(state => ({
  routing: state.routing,
}))(SocialAuthButtonList)
