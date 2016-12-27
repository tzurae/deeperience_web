import React from 'react'
import Col from 'react-bootstrap/lib/Col'
import MessengerPlugin from 'react-messenger-plugin'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1 } from '../../../components/utils/Panel'
import { CustomSubNav } from '../../../components/utils/SubNavigation'

class MyCustomTripPage extends React.Component {
  render() {
    return (
      <PageLayout subNav={<CustomSubNav activeTab={0}/>}>
        <PanelContainer>
          <Col md={2}/>
          <Col md={7}>
            <Panel1 title={'nav.customize.customize'}>
              <MessengerPlugin
                appId="1149200281836160"
                pageId="1755838524703270"
                size="xlarge"
                type="message-us"
              />
            </Panel1>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default MyCustomTripPage
