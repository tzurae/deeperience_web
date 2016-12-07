import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import * as tripActions from '../../../reducers/trip/tripActions'
import SubNavigation from '../../../components/utils/SubNavigation'
import fakeData from './fakeData'
import PhaseChooseGuide from '../../../components/custom/CustomTripPhaseChooseGuide'
import { getValue } from '../../../utils/getI18nValue'
import styles from './styles.scss'

const actions = [
  tripActions,
]

const mapStateToProps = state => {
  return {
    messages: state.global.messages,
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

class MyCustomTripPhasePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
    }
    this.nodes = [
      'trip.customize',
      'trip.customize.createDemand',
      'trip.customize.chooseGuide',
      'trip.customize.guideConfirm',
      'trip.customize.deposit',
      'trip.customize.video',
      'trip.customize.balance',
      'trip.customize.travel',
    ]
  }

  render() {
    const { page } = this.state
    return (
      <PageLayout
        subNav={
          <SubNavigation
            activeTab={1}
            tabText={['nav.customize.customize', 'nav.customize.myCustomTrip']}
            tabLink={['#', '/trip/myCustomTrip']}
          />
        }
      >
        <PanelContainer>
          <Col md={2}>
            <Panel2 title="trip.customize">
              <PhaseBranch
                nodes={this.nodes}
                active={page}
              />
            </Panel2>
          </Col>
          <Col md={8}>
            <Panel1
              title={'nav.customize.myCustomTrip'}
              className={styles.panel}
            >
              {page === 0 && <PhaseChooseGuide/>}
            </Panel1>
          </Col>
          <Col md={2}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCustomTripPhasePage)
