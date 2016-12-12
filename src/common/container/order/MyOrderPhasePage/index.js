import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import deepCopy from 'deepcopy'
import { traveler, customData } from './fakeData'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel2, PanelWithWord } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import * as orderActions from '../../../reducers/order/orderActions'
import PhaseOutline from '../../../components/order/PhaseOutline'
import { CustomSubNav } from '../../../components/utils/SubNavigation'
import { getValue } from '../../../utils/getI18nValue'
import styles from './styles.scss'

const actions = [
  orderActions,
]

const mapStateToProps = state => {
  return {
    messages: state.global.messages,
    page: state.order.page,
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

class MyOrderPhasePage extends React.Component {
  constructor(props) {
    super(props)

    this.nodes = [
      'order.outline',
      'order.recvDeposit',
      'order.guideConfirm',
      'order.custom',
      'order.preview',
      'order.recvBalance',
      'order.done',
    ]

    this.cb = [0, 1, 2, 3, 4, 5, 6].map(page => () => this.setPage(page))
    this.titleId = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]
    this.commentId = [
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ]
    this.done = [
      true,
      true,
      false,
      false,
      false,
      false,
      false,
    ]
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
      messages.toJS(),
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

    console.log(cpCustom)
    return (
      <PageLayout subNav={<CustomSubNav activeTab={1}/>}>
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
            </PanelWithWord>
          </Col>
          <Col md={3}/>
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrderPhasePage)
