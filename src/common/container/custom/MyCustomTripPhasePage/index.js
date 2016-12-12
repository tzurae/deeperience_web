import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import Col from 'react-bootstrap/lib/Col'
import deepCopy from 'deepcopy'
import { chooseGuide, confirmGuide } from './fakeData'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel2, PanelWithWord } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import * as customActions from '../../../reducers/custom/customActions'
import { CustomSubNav } from '../../../components/utils/SubNavigation'
import PhaseChooseGuide from '../../../components/custom/PhaseChooseGuide'
import PhaseGuideConfirm from '../../../components/custom/PhaseGuideConfirm'
import PhaseDeposit from '../../../components/custom/PhaseDeposit'
import PhaseChooseDate from '../../../components/custom/PhaseChooseDate'
import PhaseFinishConfirm from '../../../components/custom/PhaseFinishConfirm'
import PhaseBalance from '../../../components/custom/PhaseBalance'
import PhaseTravel from '../../../components/custom/PhaseTravel'
import IconRectBtn from '../../../components/utils/IconRectBtn'
import Modal from '../../../components/utils/Modal'
import { getValue } from '../../../utils/getI18nValue'
import AdviceForm from '../../../components/forms/custom/AdviceForm'
import styles from './styles.scss'

const actions = [
  customActions,
]

const mapStateToProps = state => {
  return {
    messages: state.global.messages,
    page: state.custom.page,
    isAdviceModal: state.custom.isAdviceModal,
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

    this.nodes = [
      'customize.createDemand',
      'customize.chooseGuide',
      'customize.guideConfirm',
      'customize.deposit',
      'customize.chooseDate',
      'customize.finishConfirm',
      'customize.balance',
      'customize.travel',
    ]

    this.cb = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(page => () => this.setPage(page))
    this.titleId = [
      '',
      'customize.chooseGuide',
      '',
      '',
      'customize.chooseDate',
      'customize.finishConfirm',
      '',
      '',
    ]
    this.commentId = [
      '',
      'customize.chooseGuide.comment',
      '',
      '',
      'customize.chooseDate.comment',
      'customize.finishConfirm.comment',
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
      false,
    ]
    this.chooseDateFormSubmit = ::this.chooseDateFormSubmit
  }

  chooseDateFormSubmit() {
    this.props.actions.customPhaseNextPage()
  }

  setPage(page) {
    this.props.actions.customPhaseSetPage(page)
  }

  openAdviceModal() {
    this.props.actions.customPhaseOpenAdviceModal()
  }

  closeAdviceModal() {
    this.props.actions.customPhaseCloseAdviceModal()
  }

  render() {
    const { page, messages, isAdviceModal } = this.props
    const { Languages, TripLocations } = getValue(messages.toJS(), ['Languages', 'TripLocations'])

    const country = TripLocations[`${confirmGuide.location.split('.')[0]}.countryLabel`]
    const area = TripLocations[confirmGuide.location]

    // deep copy, to change the data
    const cpGuide = deepCopy(confirmGuide)
    cpGuide.language = cpGuide.language.map(value => Languages[value])

    return (
      <PageLayout subNav={<CustomSubNav activeTab={1}/>}>
        <Modal
          show={isAdviceModal}
          titleId="customize.travel.advice"
          onClose={::this.closeAdviceModal}
        >
          <AdviceForm/>
        </Modal>
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
              className={page !== 7 ? styles.mainPanel : styles.finishPanel}
              titleClass={styles.panelTitle}
            >
              {page === 1 && <PhaseChooseGuide guideData={chooseGuide}/>}
              {page === 1 &&
              <IconRectBtn
                name="check"
                textId="customize.chooseGuide.confirm"
                className={styles.btnConfirm}
                onClick={() => this.props.actions.customPhaseNextPage()}
              />
              }
              {page === 2 &&
              <PhaseGuideConfirm
                guideData={cpGuide}
                country={country}
                area={area}
              />
              }
              {page === 3 && <PhaseDeposit/>}
              {page === 4 && <PhaseChooseDate handleSubmit={this.chooseDateFormSubmit}/>}
              {page === 5 &&
              <PhaseFinishConfirm
                againFunc={this.props.actions.customPhasePreviousPage}
                finishFunc={this.props.actions.customPhaseNextPage}
                amount={1000}
              />
              }
              {page === 6 && <PhaseBalance/>}
              {page === 7 &&
              <PhaseTravel
                adviceFunc={::this.openAdviceModal}
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
