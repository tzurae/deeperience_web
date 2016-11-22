import React from 'react'
import { connect } from 'react-redux'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm } from 'redux-form'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createTripValidate'
import Text from '../../widgets/Text'
import styles from '../../../styles'
import { routes as fakeRoutes, startSites as fakeStartSites } from './fakeData'
import uuid from 'uuid'
import { calculateTripInfo } from './createTripHelper'
import tripAPI from '../../../api/trip'
import { setOwnSite } from '../../../actions/tripActions'

const siteDivWidth = 50

const style = {
  container: {
    width: '100%',
    height: '1000px',
    borderRadius: 10,
    borderColor: styles.color.borderGrey,
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'relative',
  },
  siteDiv: {
    width: `${siteDivWidth}px`,
    height: '50px',
    borderColor: styles.color.borderGrey,
    borderWidth: '2px',
    borderStyle: 'solid',
  },
}

class CreateTripFormPage2 extends React.Component {
  constructor(props) {
    super(props)
    // const tripInfo = calculateTripInfo(fakeRoutes, fakeStartSites, this.props.ownSites)

    this.state = {
      tripInfo: [],
      routes: fakeRoutes,
      startSites: fakeStartSites,
    }

    this.deleteSite = this.deleteSite.bind(this)
    this.addChildSite = this.addChildSite.bind(this)
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

          const tripInfo = calculateTripInfo(fakeRoutes, fakeStartSites, json)
          this.setState({
            tripInfo,
          })
        })
    }
  }

  deleteSite(xpos, ypos) {

  }

  addChildSite(id) {
    const { startSites, routes } = this.state
    routes.push({
      from: id,
      to: uuid(),
    })

    const tripInfo = calculateTripInfo(routes, startSites, this.props.allSites)

    this.setState({
      tripInfo,
      routes,
    })
  }

  render() {
    const { tripInfo, routes } = this.state
    const dailyTrip = tripInfo[0] // sites ylayer routes
    return (
      <div>
        <pre>{JSON.stringify(tripInfo, null, 2)}</pre>
        {/* <pre>{JSON.stringify(routes, null, 2)}</pre>*/}
        <div style={style.container}>
        </div>
      </div>
    )
    /* {
     dailyTrip.sites.map((site, siteOrder) => {
     const { xpos, ypos } = site.pos
     return (
     <SiteDiv
     top = {`${ypos * 100 + 50}px`}
     left = {`calc(${(xpos + 1) / (dailyTrip.ylayer.length + 1) * 100}% - ${siteDivWidth / 2}px)`}
     key = {`${xpos}-${ypos}`}
     name = {site.content.name}
     addSite={() => this.addChildSite(site.id)}
     deleteSite={this.deleteSite}
     />
     )
     })
     }*/
  }
}

const SiteDiv = ({ top, left, name, addSite, deleteSite, ...props }) => {
  return (
    <div
      style={{
        ...style.siteDiv,
        position: 'absolute',
        top,
        left,
      }}
      {...props}
    >
      <p>{name}</p>
      <div>
        <button onClick={addSite}>+++</button>
        <button onClick={deleteSite}>---</button>
      </div>
    </div>
  )
}

// const CreateTripFormPage2 = ({ handleSubmit, ...props }) => {
//   const {
//     // pristine,
//     // submitting,
//     // invalid,
//     // previousPage,
//   } = props
//
// }
/* <Form
  defaultHorizontal={true}
  defaultLabelDimensions={{ sm: 2 }}
  defaultFieldDimensions={{ sm: 6 }}
  onSubmit={handleSubmit}
>
  <FormFooter
    labelDimensions={{ sm: 0 }}
    fieldDimensions={{ sm: 12 }}
    style={{ textAlign: 'center' }}
  >
    <FormButton type="button" onClick={previousPage}>
      <Text id={'trip.createTrip.form.previousStep'}/>
    </FormButton>
    <FormButton type="submit" disabled={pristine || submitting || invalid}>
      <Text id={'trip.createTrip.form.nextStep'}/>
    </FormButton>
  </FormFooter>
</Form> */

export default reduxForm({
  form: FormNames.TRIP_CREATE_TRIP,
  destroyOnUnmount: false,     // <------ preserve form data
  validate,
  initialValues: {
    name: '',
    tags: [],
    dayInfo: 'TripDayInfos.HALF_DAY',
  },
})(connect(state => ({
  apiEngine: state.apiEngine,
  allSites: state.trip.ownSites,
}))(CreateTripFormPage2))
