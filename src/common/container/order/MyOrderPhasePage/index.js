import React from 'react'
import { connect } from 'react-redux'
import { fromJS } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import deepCopy from 'deepcopy'
import mapDispatchToProps from '../../../lib/mapDispatchToProps'
import { traveler, customData, ableTime } from './fakeData'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel2, PanelWithWord } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import PhaseOutline from '../../../components/order/PhaseOutline'
import PhaseDeposit from '../../../components/order/PhaseDeposit'
import PhaseCustomize from '../../../components/order/PhaseCustomize'
import PhaseBalance from '../../../components/order/PhaseBalance'
import PhaseVideo from '../../../components/order/PhaseVideo'
import * as orderActions from '../../../reducers/order/orderActions'
import { CreateSubNav } from '../../../components/utils/SubNavigation'
import { getValue } from '../../../utils/getI18nValue'
import styles from './styles.scss'

@connect(
  state => ({
    messages: state.getIn(['global', 'messages']),
    page: state.getIn(['order', 'page']),
  }),
  mapDispatchToProps([orderActions])
)

class MyOrderPhasePage extends React.Component {
  constructor(props) {
    super(props)

    this.nodes = [
      'order.outline',
      'order.recvDeposit',
      'order.video',
      'order.customize',
      'order.preview',
      'order.recvBalance',
      'order.done',
    ]

    this.cb = [0, 1, 2, 3, 4, 5, 6].map(page => () => this.setPage(page))
    this.titleId = [
      '',
      '',
      'order.video',
      'order.customize.title',
      'order.preview',
      'order.recvBalance',
      '',
    ]
    this.commentId = [
      '',
      '',
      'order.video.comment',
      '',
      '',
      '',
      '',
    ]
    this.done = fromJS([
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ])
  }

  setPage(page) {
    this.props.actions.orderPhaseSetPage(page)
  }

  getCountryArea(msg, data) {
    return {
      country: msg[`${data.split('.')[0]}.countryLabel`],
      area: msg[data],
    }
  }

  render() {
    const { page, messages } = this.props
    const {
      Languages,
      TripLocations,
      TripDayInfos,
      TripElements,
      FoodElements,
      HotelTypes,
    } = getValue(
      messages,
      ['Languages',
        'TripLocations',
        'TripElements',
        'FoodElements',
        'HotelTypes',
        'TripDayInfos',
      ])

    const { country, area } = this.getCountryArea(TripLocations, traveler.location)

    // deep copy, to change the data
    const cpCustom = deepCopy(customData)
    cpCustom.dayInfo = TripDayInfos[cpCustom.dayInfo]
    cpCustom.tripElements = cpCustom.tripElements.map(value => TripElements[value])
    cpCustom.foodElements = cpCustom.foodElements.map(value => FoodElements[value])
    cpCustom.hotelTypes = cpCustom.hotelTypes.map(value => HotelTypes[value])
    cpCustom.locations = cpCustom.locations.map(value => this.getCountryArea(TripLocations, value))

    return (
      <PageLayout subNav={<CreateSubNav activeTab={4}/>}>
        <PanelContainer>
          <Col md={2}>
            {
              page !== 7 &&
              <Panel2 title="customize">
                <PhaseBranch
                  nodes={this.nodes}
                  active={page}
                  done={this.done}
                  cb={this.cb}
                />
              </Panel2>
            }
          </Col>
          <Col md={7}>
            <PanelWithWord
              title={this.titleId[page]}
              comment={this.commentId[page]}
              className={styles.mainPanel}
              contentDivClass={page === 0 && styles.doubleTitleContent}
              titleClass={styles.panelTitle}
              // because there are two titles in page0 and cannot fit the origin panelwithword title
            >
              {
                page === 0 &&
                <PhaseOutline
                  travelerData={traveler}
                  customData={cpCustom}
                  languages={traveler.language.map(value => Languages[value])}
                  country={country}
                  area={area}
                />
              }
              {page === 1 && <PhaseDeposit isfinish={false}/>}
              {page === 2 && <PhaseVideo ableTime={ableTime}/>}
              {page === 3 && <PhaseCustomize />}
              {page === 5 && <PhaseBalance />}
            </PanelWithWord>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default MyOrderPhasePage
