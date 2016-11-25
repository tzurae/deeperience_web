import React from 'react'
import { connect } from 'react-redux'
// import { Field, reduxForm } from 'redux-form'
import { reduxForm } from 'redux-form'
import FontAwesome from 'react-fontawesome'
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
const siteDivHeight = 70
const scrollbarShift = -6

const style = {
  container: {
    width: '100%',
    height: '600px',
    borderRadius: 10,
    borderColor: styles.color.borderGrey,
    borderWidth: '2px',
    borderStyle: 'solid',
    position: 'relative',
    overflowY: 'scroll',
  },
  siteDiv: {
    position: 'absolute',
    width: `${siteDivWidth}px`,
    height: `${siteDivHeight}px`,
    borderColor: '#444',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    background: 'white',
    fontWeight: 'bold',
  },
  errorMsg: {
    color: 'red',
    fontSize: styles.font.medium,
    margin: '-5px 0 15px 0',
  },
  siteDivBtn: {
    display: 'inline-block',
    margin: '0 3px',
    height: '26px',
    width: '26px',
    padding: 0,
    fontSize: '15px',
    backgroundColor: styles.color.orange,
    color: 'white',
    border: 0,
    borderRadius: '13px',
  },
  siteDivBtnDiv: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  floatSiteList: {
    position: 'absolute',
    borderColor: '#777',
    borderRadius: '10px',
    borderWidth: '10px',
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

  addSiteInfoClick(uuid, top, left) {
    this.setState({
      floatList: {
        top,
        left,
        show: true,
        uuid,
      },
    })
  }

  deleteSite(uuid, day) {
    const { routes, startSites, allSites, uuid2gid } = this.props
    let isLeaf = true
    routes[day].some((route, index) => {
      if (route.from === uuid) {
        isLeaf = false
        return true
      }
      return false
    })

    if (!isLeaf) return this.props.dispatch(createTripError('請先刪除子景點'))

    this.props.uuid2gid[uuid] = ''
    routes[day].forEach((route, index) => {
      if (route.from === uuid || route.to === uuid) {
        routes[day].splice(index, 1)
      }
    })

    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2gid),
      routes,
    }))
  }

  addChildSite(id, day) {
    if (!this.props.uuid2gid[id]) return this.props.dispatch(createTripError('請填入景點後，再加入子景點'))

    const { routes, startSites, allSites, uuid2gid } = this.props

    if (!routes[day]) routes[day] = []

    routes[day].push({
      from: id,
      to: uuid(),
    })

    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2gid),
      routes,
    }))
  }

  closeFloatSiteList() {
    this.setState({
      floatList: {
        show: false,
      },
    })
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
        {/* <pre>{JSON.stringify(tripInfo, null, 2)}</pre>*/}
        <p style={style.errorMsg}>{this.props.error}</p>
        <div style={{ position: 'relative' }}>
          {
            this.state.floatList.show &&
            <FloatSiteList
              top={this.state.floatList.top}
              left={this.state.floatList.left}
              siteList={this.props.allSites}
              onClick={this.addGuideSite.bind(this)}
              onClose={this.closeFloatSiteList.bind(this)}
            />
          }
          <div style={style.container}>
            <svg
              height="100%"
              width="100%"
              style={{ position: 'absolute' }}
            >
              {
                dailyTrip.routes.map(route => {
                  const width = 560
                  const xpos1 =
                    (route.from.xpos + 1) /
                    (dailyTrip.ylayer[route.from.ypos] + 1) *
                    width +
                    scrollbarShift
                  const ypos1 = route.from.ypos * 100 + 50 + siteDivHeight / 2
                  const xpos2 =
                    (route.to.xpos + 1) /
                    (dailyTrip.ylayer[route.to.ypos] + 1) *
                    width +
                    scrollbarShift
                  const ypos2 = route.to.ypos * 100 + 50 + siteDivHeight / 2

                  return (
                    <path
                      d={['M', xpos1, ypos1,
                        'T', xpos2, ypos2].join(' ')}
                      stroke="black"
                      strokeWidth={2}
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
                    addSite={this.addChildSite.bind(this, site.uuid, 0)}
                    deleteSite={this.deleteSite.bind(this, site.uuid, 0)}
                  />
                )
              })
            }
          </div>

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
      <p>{site.content && site.content.name || ''}</p>
      <div style={style.siteDivBtnDiv}>
        <SiteDivBtn name="pencil" onClick={addInfo}/>
        <SiteDivBtn name="plus" onClick={addSite}/>
        <SiteDivBtn name="times" onClick={deleteSite}/>
      </div>
    </div>
  )
}

const FloatSiteList = ({ top, left, siteList, onClick, onClose, ...props }) => {
  return (
    <div
      style={{
        ...style.floatSiteList,
        top,
        left,
      }}
      {...props}
    >
      <div
        style={{
          height: '26px',
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        <p
          style={{
            ...style.floatSiteListItemName,
            flex: 1,
            marginLeft: '5px',
          }}
        >
          {'選擇地點'}
        </p>
        <SiteDivBtn
          name="times"
          onClick={onClose}
          bgColor="white"
          btnStyle={{
            color: '#777',
            backgroundColor: 'white',
            float: 'right',
            fontSize: 22,
          }}
        />
      </div>
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
      <SiteDivBtn
        btnStyle={{ marginRight: '10px' }}
        name="check"
        onClick={() => onClick(site)}
      />
      <p style={style.floatSiteListItemName}>{site.name}</p>
    </div>
  )
}

const SiteDivBtn = ({ name, btnStyle, onClick, bgColor }) => {
  return (
    <button style={{ ...style.siteDivBtn, ...btnStyle }} onClick={onClick}>
      <FontAwesome
        name={name}
        style={{ backgroundColor: bgColor || styles.color.orange }}
      />
    </button>
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
