import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel2, PanelWithWord } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import * as tripActions from '../../../reducers/trip/tripActions'
import SubNavigation from '../../../components/utils/SubNavigation'
import fakeData from './fakeData'
import PhaseChooseGuide from '../../../components/custom/PhaseChooseGuide'
import IconRectBtn from '../../../components/utils/IconRectBtn'
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

    // temp for quick demo
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
    this.cb = [0, 1, 2, 3, 4, 5, 6, 7].map(page => () => this.setPage(page))
  }
  // tempeorary for quick demo

  setPage(page) {
    this.setState({
      page,
    })
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
                cb={this.cb}
              />
            </Panel2>
          </Col>
          <Col md={7}>
            <PanelWithWord
              title="trip.customize.chooseGuide"
              comment="trip.customize.chooseGuide.comment"
            >
              {page === 1 && <PhaseChooseGuide guideData={fakeData}/>}
              {page === 1 &&
              <IconRectBtn
                name="check"
                textId="trip.customize.chooseGuide.confirm"
                className={styles.btnConfirm}
              />
              }
            </PanelWithWord>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCustomTripPhasePage)
