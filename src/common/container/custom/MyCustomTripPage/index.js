import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1 } from '../../../components/utils/Panel'
import * as tripActions from '../../../reducers/trip/tripActions'
import { CustomSubNav } from '../../../components/utils/SubNavigation'
import fakeData from './fakeData'
import MenuItem from '../../../components/custom/MenuItem'
import { getValue } from '../../../utils/getI18nValue'

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

class MyCustomTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.renderPost = this.renderPost.bind(this)
  }

  renderPost() {

  }

  render() {
    const {
      messages,
    } = this.props
    const { CustomPhases, TripDayInfos } = getValue(messages.toJS(), ['CustomPhases', 'TripDayInfos'])

    return (
      <PageLayout subNav={<CustomSubNav activeTab={1}/>}>
        <PanelContainer>
          <Col md={2}/>
          <Col md={7}>
            <Panel1 title={'nav.customize.myCustomTrip'}>
              {
                fakeData.map((data, index) => (
                  <MenuItem
                    key={index}
                    onClick={this.renderPost}
                    title={data.title}
                    guideName={data.guideName}
                    dayInfo={TripDayInfos[data.dayInfo]}
                    phase={data.customPhase}
                    phaseText={CustomPhases[data.customPhase]}
                  />
                ))
              }
            </Panel1>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCustomTripPage)
