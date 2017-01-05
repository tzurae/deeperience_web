import React from 'react'
import { connect } from 'react-redux'
import Col from 'react-bootstrap/lib/Col'
import { Map } from 'immutable'
import mapDispatchToProps from '../../../lib/mapDispatchToProps'
import FormNames from '../../../constants/FormNames'
import PageLayout from '../../../components/layouts/PageLayout'
import PanelContainer from '../../../components/utils/PanelContainer'
import { Panel1, Panel2 } from '../../../components/utils/Panel'
import PhaseBranch from '../../../components/utils/PhaseBranch'
import CreateSiteForm from '../../../components/forms/site/CreateSiteForm'
import * as reduxFormActions from '../../../reducers/form/reduxFormActions'
import * as siteActions from '../../../reducers/site/siteActions'
import { CreateSubNav } from '../../../components/utils/SubNavigation'
import { BranchTitle } from './assets'
import styles from './styles.scss'
import SubNav from '../../../components/utils/SubNavigation/DefaultSubNav'
import * as tabActions from '../../../reducers/tab/tabAction'

@connect(
  state => {
    const form = state.getIn(['form', FormNames.TRIP_CREATE_SITE])

    return {
      messages: state.getIn(['global', 'messages']),
      page: state.getIn(['site', 'createPage', 'page']),
      done: state.getIn(['site', 'createPage', 'done']),
      values: form ? form.get('values') : Map({}),
      subsiteActive: state.getIn(['site', 'createPage', 'subsiteActiveArr']),
      introEditorContent: state.getIn(['site', 'createPage', 'introEditorContent']),
      mainSiteEditorContent: state.getIn(['site', 'createPage', 'mainSiteEditorContent']),
      tabActive: state.getIn(['tab', 'CreateSite', 'active']),
      tabText: state.getIn(['tab', 'CreateSite','tabText']),
      tabLink: state.getIn(['tab', 'CreateSite','tabLink']),
    }
  },
  mapDispatchToProps([siteActions, reduxFormActions, tabActions])
)

class CreateSitePage extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = ::this.nextPage
    this.previousPage = ::this.previousPage
  }

  nextPage() {
    this.props.actions.createSiteSetDone(
      this.props.done.map((value, index) => index === this.props.page ? true : value)
    )
    this.props.actions.createSiteNextPage()
  }

  previousPage() {
    this.props.actions.createSitePreviousPage()
  }

  componentWillMount() {
    this.props.actions.tabChange(0);
  }

  render() {
    const {
      page,
      done,
      actions,
      values,
      tabActive,
      tabText,
      tabLink,
    } = this.props
    console.log('tabActive is', tabActive);
    console.log("tabText is", tabText);
    console.log('tabLink is ',tabLink);
    return (
      <PageLayout subNav={<SubNav activeTab={tabActive} tabText={tabText} tabLink={tabLink}/>}>
        <PanelContainer>
          <Col md={2}>
            <Panel2 title="nav.trip.createSite">
              <PhaseBranch
                done={done}
                nodes={BranchTitle}
                active={page}
              />
            </Panel2>
          </Col>
          <Col md={7}>
            <Panel1
              title={BranchTitle[page]}
              underlineClass={page === 5 && styles.none}
              titleClass={page === 5 && styles.none}
            >
              <CreateSiteForm
                updateSubsiteActive={actions.createSiteSetSubsiteActive}
                updateForm={actions.change}
                nextPage={this.nextPage}
                previousPage={this.previousPage}
                updateIntroEditor={actions.createSiteUpdateIntroEditor}
                updateMainSiteEditor={actions.createSiteUpdateMainSiteEditor}
                formValue={values}
                {...this.props}
              />
            </Panel1>
          </Col>
          <Col md={3} />
        </PanelContainer>
      </PageLayout>
    )
  }
}

export default CreateSitePage
