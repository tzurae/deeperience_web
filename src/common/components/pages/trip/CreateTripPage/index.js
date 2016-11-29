import React from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import PageLayout from '../../../layouts/PageLayout'
import PanelContainer from '../../../utils/PanelContainer'
import Panel from '../../../utils/Panel'
import PhaseBranch from '../../../utils/PhaseBranch'
import CreateTripForm from '../../../forms/trip/CreateTripForm'
import styles from '../../../../styles'
import tripAPI from '../../../../api/trip'
import { setOwnSite } from '../../../../actions/tripActions'

class CreateTripPage extends React.Component {
  constructor(props) {
    super(props)
    this.nodes = [
      'trip.createTrip.title1',
      'trip.createTrip.title2',
      'trip.createTrip.title3',
      'trip.createTrip.title4',
      'trip.createTrip.title5']
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1,
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  componentWillMount() {
    const { dispatch, apiEngine } = this.props
    if (process.env.BROWSER) {
      tripAPI(apiEngine)
        .listGuideSites()
        .catch(err => {
          throw err
        })
        .then(json => {
          dispatch(setOwnSite(json))
        })
    }
  }

  render() {
    const { page } = this.state
    return (
      <PageLayout
        tripTabActive={3}
      >
        <PanelContainer>
          <Col md={2}>
            <Panel
              title="trip.createTrip"
              underlineStyle={{ background: styles.color.borderGrey }}
            >
              <PhaseBranch
                nodes={this.nodes}
                active={page}
              />
            </Panel>
          </Col>
          <Col md={7}>
            <Panel
              title={this.nodes[page]}
              underlineStyle={{ background: styles.color.orange, height: '3px' }}
              titleStyle={{ textAlign: 'left' }}
              contentDivStyle={{ padding: '20px 30px' }}
            >
              <CreateTripForm
                page={page}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
              />
            </Panel>
          </Col>
          <Col md={3}>
            <Panel
              title="trip.createTrip.help"
              isUnderline={false}
            />
          </Col>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(state => ({
  apiEngine: state.apiEngine,
}))(CreateTripPage)
