import React from 'react'
import PageLayout from '../../layouts/PageLayout'
import PanelContainer from '../../utils/Panel/PanelContainer'
import MainPanel from '../../utils/Panel/MainPanel'
import LeftPanel from '../../utils/Panel/LeftPanel'
import RightPanel from '../../utils/Panel/RightPanel'
import PhaseBranch from '../../utils/PhaseBranch'
import CreateTripForm from '../../forms/trip/CreateTripForm'

const CreateTripPage = () => {
  const nodes = [
    'trip.createTrip.title1',
    'trip.createTrip.title2',
    'trip.createTrip.title3',
    'trip.createTrip.title4',
    'trip.createTrip.title5']

  return (
    <PageLayout
      tripTabActive={3}
    >
      <PanelContainer>
        <LeftPanel
          title="trip.createTrip"
        >
          <PhaseBranch
            nodes={nodes}
            active={0}
          />
        </LeftPanel>
        <MainPanel
          title="trip.createTrip.title1"
        >
          <CreateTripForm/>
        </MainPanel>
        <RightPanel
          title="trip.createTrip.help"
        />
      </PanelContainer>
    </PageLayout>
  )
}

export default CreateTripPage
