import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import Panel from '../../../components/utils/Panel'
// import PhaseBranch from '../../../components/utils/PhaseBranch'
import styles from '../../../styles'
import * as tripActions from '../../../reducers/trip/tripActions'
import SubNavigation from '../../../components/utils/SubNavigation'

const actions = [
  tripActions,
]

const mapStateToProps = state => {
  return {
    apiEngine: state.global.apiEngine,
  }
}

const mapDispatchToProps = dispatch => {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject()

  return {
    actions: bindActionCreators(creators, dispatch),
    dispatch,
  }
}

class MyCustomTripPage extends React.Component {
  render() {
    return (
      <PageLayout
        subNav={
          <SubNavigation
            activeTab={0}
            tabText={['nav.customize.customize', 'nav.customize.myCustomTrip']}
            tabLink={['#', '/trip/myCustomTrip']}
          />
        }
      >
        <PanelContainer>
          <Col md={3}/>
          <Col md={6}>
            <Panel
              title={'管理旅程'}
              underlineStyle={{ background: styles.color.orange, height: '3px' }}
              titleStyle={{ textAlign: 'left' }}
              contentDivStyle={{ padding: '20px 30px' }}
            />
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCustomTripPage)
