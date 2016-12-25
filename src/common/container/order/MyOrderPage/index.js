import React from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1 } from '../../../components/utils/Panel'
import { CreateSubNav } from '../../../components/utils/SubNavigation'
import fakeData from './fakeData'
import MenuItem from '../../../components/order/MenuItem'
import { getValue } from '../../../utils/getI18nValue'

@connect(
  state => ({
    messages: state.getIn(['global', 'messages']),
  })
)

class MyOrderPage extends React.Component {
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
    const { CustomPhases, TripDayInfos } = getValue(messages, ['CustomPhases', 'TripDayInfos'])

    return (
      <PageLayout subNav={<CreateSubNav activeTab={4}/>}>
        <PanelContainer>
          <Col md={2}/>
          <Col md={7}>
            <Panel1 title={'nav.customize.myCustomTrip'}>
              {
                fakeData.map((data, index) => (
                  <MenuItem
                    key={index}
                    onClick={this.renderPost}
                    name={data.name}
                    dayInfo={TripDayInfos[data.dayInfo]}
                    phase={data.customPhase}
                    phaseText={CustomPhases[data.customPhase]}
                    people={data.people}
                    location={data.location}
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

export default MyOrderPage
