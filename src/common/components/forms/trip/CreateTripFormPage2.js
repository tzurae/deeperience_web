import React from 'react'
import { connect } from 'react-redux'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm } from 'redux-form'
import uuid from 'uuid'
import FormNames from '../../../constants/FormNames'
import FormButton from '../../utils/FormButton'
import validate from './createTripValidate'
import Text from '../../widgets/Text'
import styles from '../../../styles'
import { routes as fakeRoutes, startSites as fakeStartSites } from './fakeData'
import { calculateTripInfo } from './createTripHelper'
import tripAPI from '../../../api/trip'
import {
  setOwnSite,
  setCreateTripData,
  resetCreateTripData,
  createTripError,
} from '../../../actions/tripActions'

const siteDivWidth = 150
const siteDivHeight = 75

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
    position: 'absolute',
    width: `${siteDivWidth}px`,
    height: `${siteDivHeight}px`,
    borderColor: styles.color.borderGrey,
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: '5px',
  },
  errorMsg: {
    color: 'red',
    fontSize: styles.font.medium,
  },
  siteDivBtn: {
    display: 'inline-block',
  },
  siteDivBtnDiv: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  floatSiteList: {
    position: 'absolute',
    borderColor: styles.color.borderGrey,
    borderWidth: '2px',
    borderStyle: 'solid',
    padding: '5px',
    width: '240px',
    height: '320px',
    zIndex: 100,
    background: 'white',
    overflowY: 'scroll',
  },
  floatSiteListItem: {
    borderColor: styles.color.borderGrey,
    borderWidth: '1px',
    borderBottomStyle: 'solid',
    padding: '5px',
    width: '100%',
    height: '50px',
    overflowX: 'hide',
    justifyContent: 'flex-start',
    alignContent: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  floatSiteListItemName: {
    fontSize: styles.font.medium,
  },
}

Array.prototype.replaceAt = (replaceValue, replaceIndex) => {
  this.map((value, index) => replaceIndex !== index ? value : replaceValue)
}

class CreateTripFormPage2 extends React.Component {
  constructor(props) {
    super(props)
    // const tripInfo = calculateTripInfo([], fakeStartSites, this.props.allSites)
    this.props.dispatch(resetCreateTripData())
    this.state = {
      day: 0,
      floatList: {
        top: 0,
        left: 500,
        show: false,
        uuid: '',
      },
    }
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

          const { routes, startSites, uuid2gid } = this.props

          const tripInfo = calculateTripInfo(routes, startSites, json, uuid2gid)
          dispatch(setCreateTripData({ tripInfo }))
        })
    }
  }

  addGuideSite(addSite) {
    const { floatList: { uuid } } = this.state
    const { routes, startSites, allSites, uuid2gid } = this.props

    uuid2gid[uuid] = addSite._id

    this.props.dispatch(setCreateTripData({
      uuid2gid,
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2gid),
    }))

    this.setState({
      floatList: {
        show: false,
      },
    })
  }

  addSiteInfoClick(id, top, left) {
    this.setState({
      floatList: {
        top,
        left,
        show: true,
        uuid: id,
      },
    })
  }

  deleteSite(xpos, ypos) {

  }

  addChildSite(id, gid, day) {
    if (!gid) return this.props.dispatch(createTripError('請填入景點後，再加入子景點'))

    const { routes, startSites } = this.props

    if (!routes[day]) routes[day] = []

    routes[day].push({
      from: id,
      to: uuid(),
    })

    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, this.props.allSites, this.props.uuid2gid),
      routes,
    }))
  }

  render() {
    const { tripInfo } = this.props
    if (!tripInfo) {
      return (
        <div>
          <pre>{JSON.stringify(tripInfo, null, 2)}</pre>
          <div style={style.container}/>
        </div>
      )
    }
    const dailyTrip = tripInfo[0] // sites ylayer routes
    return (
      <div>
        <pre>{JSON.stringify(tripInfo, null, 2)}</pre>
        <p style={style.errorMsg}>{this.props.error}</p>
        <div style={style.container}>
          {
            this.state.floatList.show &&
            <FloatSiteList
              top={this.state.floatList.top}
              left={this.state.floatList.left}
              siteList={this.props.allSites}
              onClick={this.addGuideSite.bind(this)}
            />
          }
          <svg
            height="100%"
            width="100%"
            style={{ position: 'absolute' }}
          >
            {
              dailyTrip.routes.map(route => {
                const width = 560
                const xpos1 = (route.from.xpos + 1) / (dailyTrip.ylayer[route.from.ypos] + 1) * width
                const ypos1 = route.from.ypos * 100 + 50 + siteDivHeight / 2
                const xpos2 = (route.to.xpos + 1) / (dailyTrip.ylayer[route.to.ypos] + 1) * width
                const ypos2 = route.to.ypos * 100 + 50 + siteDivHeight / 2

                return (
                  <path
                    d={['M', xpos1, ypos1,
                      'T', xpos2, ypos2].join(' ')}
                    stroke="orange"
                    strokeWidth={10}
                    fill="none"
                    key={`${xpos1}${ypos1}${xpos2}${ypos2}`}
                  />
                )
              })
            }
          </svg>
          {
            dailyTrip.sites.map(site => {
              const { xpos, ypos } = site.pos
              const top = `${ypos * 100 + 50}px`
              const left = `calc(${(xpos + 1) / (dailyTrip.ylayer[ypos] + 1) * 100}% - ${siteDivWidth / 2}px)`
              const floatListLeft =
                `calc(${(xpos + 1) / (dailyTrip.ylayer[ypos] + 1) * 100}% + ${siteDivWidth / 2 + 10}px)`
              return (
                <SiteDiv
                  top={top}
                  left={left}
                  key={`${xpos}-${ypos}`}
                  site={site}
                  day={0}
                  addInfo={this.addSiteInfoClick.bind(this, site.uuid, top, floatListLeft)}
                  addSite={this.addChildSite.bind(this, site.uuid, site.content && site.content._id, 0)}
                  deleteSite={this.deleteSite}
                />
              )
            })
          }
        </div>
      </div>
    )
  }
}

const SiteDiv = ({ top, left, site, day, addInfo, addSite, deleteSite, ...props }) => {
  return (
    <div
      style={{
        ...style.siteDiv,
        top,
        left,
      }}
      {...props}
    >
      <p>{`景點： ${site.content && site.content.name || ''}`}</p>
      <div style={style.siteDivBtnDiv}>
        <button style={style.siteDivBtn} onClick={addInfo}>Info</button>
        <button style={style.siteDivBtn} onClick={addSite}>Add</button>
        <button style={style.siteDivBtn} onClick={deleteSite}>Del</button>
      </div>
    </div>
  )
}

const FloatSiteList = ({ top, left, siteList, onClick, ...props }) => {
  return (
    <div
      style={{
        ...style.floatSiteList,
        top,
        left,
      }}
      {...props}
    >
      {
        siteList.map((site, index) => (
          <FloatSiteListItem
            key={index}
            site={site}
            onClick={onClick}
          />
        ))
      }
    </div>
  )
}

const FloatSiteListItem = ({ site, onClick, ...props }) => {
  return (
    <div
      style={style.floatSiteListItem}
      {...props}
    >
      <button
        style={{ marginRight: '10px' }}
        onClick={() => onClick(site)}
      >
        ok
      </button>
      <p style={style.floatSiteListItemName}>{site.name}</p>
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
  tripInfo: state.trip.tripInfo,
  routes: state.trip.routes,
  startSites: state.trip.startSites,
  uuid2gid: state.trip.uuid2gid,
  error: state.trip.error,
}))(CreateTripFormPage2))
