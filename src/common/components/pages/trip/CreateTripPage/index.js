import React from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../layouts/PageLayout'
import PanelContainer from '../../../utils/PanelContainer'
import Panel from '../../../utils/Panel'
import PhaseBranch from '../../../utils/PhaseBranch/index'
import CreateTripForm from '../../../forms/trip/CreateTripForm/index'
import MainStyles from '../../../../styles'

const CreateTripPage = ({ page }) => {
  const nodes = [
    'trip.createTrip.title1',
    'trip.createTrip.title2',
    'trip.createTrip.title3',
    'trip.createTrip.title4',
    'trip.createTrip.title5',
  ]

  return (
    <PageLayout
      tripTabActive={3}
    >
      <PanelContainer>
        <Col md={2}>
          <Panel
            title="trip.createTrip"
            underlineStyle={{ background: MainStyles.color.border }}
          >
            <PhaseBranch
              nodes={nodes}
              active={page}
            />
          </Panel>
        </Col>
        <Col md={7}>
          <Panel
            title={nodes[page]}
            underlineStyle={{ background: MainStyles.color.main, height: '3px' }}
            titleStyle={{ textAlign: 'left' }}
            contentDivStyle={{ padding: '20px 30px' }}
          >
            <CreateTripForm/>
          </Panel>
        </Col>
        <Col md={3}>
          <Panel
            title="trip.createTrip.help"
            isUnderline={false}
          />
          {
            page === 1 &&
            <Panel
              title="trip.createTrip.mySite"
              isUnderline={false}
            />
          }
        </Col>
      </PanelContainer>
    </PageLayout>
  )
}

export default connect(state => ({
  page: state.createTrip.page,
}))(CreateTripPage)
