import React from 'react'
import { connect } from 'react-redux'
import {
  Field,
  reduxForm,
  arrayPush,
  arrayRemove,
  arraySplice,
} from 'redux-form'
import uuid from 'uuid'
import FormNames from '../../../../constants/FormNames'
import FormButton from '../../../utils/FormButton'
import validate from '../createTripValidate'
import Text from '../../../widgets/Text'
import styles from '../../../../styles'
import { calculateTripInfo } from '../createTripHelper'
import tripAPI from '../../../../api/trip'
import {
  setOwnSite,
  setCreateTripData,
  resetCreateTripData,
  createTripError,
} from '../../../../actions/tripActions'
import Navbar from '../../../utils/BsNavbar'
import MenuItem from '../../../utils/MenuItem'
import IconBtn from '../../../utils/IconBtn'
import {
  BsTextarea as Textarea,
  BsInput as Input,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'

const siteDivWidth = 150
const siteDivHeight = 100
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
    padding: '5px 10px',
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
  },
  siteDivMsg: {
    margin: '3px 0',
  },
  siteDivBtnDiv: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
  },
  floatSiteListContainer: {
    height: '26px',
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
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
  dropdown: {
    fontSize: styles.font.big,
    listStyle: 'none',
  },
  dayDiv: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
    justifyContent: 'space-between',
  },
  dayDivBtn: {
    display: 'inline-block',
    margin: '0 6px',
  },
}

class CreateTripFormPage2 extends React.Component {
  constructor(props) {
    super(props)
    this.props.dispatch(resetCreateTripData())
    this.state = {
      day: 0,
      floatWindow: {
        top: 0,
        left: 500,
        uuid: '',
        floatListShow: false,
        floatInfoShow: false,
      },
      totalDay: 1,
      submitError: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.validateForm = this.validateForm.bind(this)
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
          const { routes, startSites, uuid2data } = this.props
          dispatch(setCreateTripData({
            tripInfo: calculateTripInfo(routes, startSites, json, uuid2data),
          }))
        })
    }
  }

  handleSubmit() {
    if (!this.validateForm(true)) return

    // split uuid2data into each day

    const { startSites, routes, uuid2data } = this.props
    const { createTripForm: { values: { dailyTrips, uuid2data: time } } } = this.props

    dailyTrips.forEach((trip, index) => {
      const uuidDataArr = []

      if (routes[index].length === 0) {
        uuidDataArr.push(startSites[index])
      } else {
        routes[index].forEach(({ from, to }) => {
          if (uuidDataArr.indexOf(from) === -1) uuidDataArr.push(from)
          if (uuidDataArr.indexOf(to) === -1) uuidDataArr.push(to)
        })
      }

      this.props.dispatch(
        arraySplice(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', index, 1, {
          ...trip,
          startSite: startSites[index],
          routes: routes[index],
          uuid2data: uuidDataArr.map(key => ({
            uuid: key,
            gid: uuid2data[key].gid,
            startTime: time[key].startTime,
            endTime: time[key].endTime,
          })),
        }))
    })

    this.props.nextPage()
  }

  validateForm(submit = false) {
    // 1. dailyTrips, sites, routes, startSites has length = totalDay
    // 2. every props in dailyTrip has filled
    // 3. every props in routes has filled
    // 4. every uuid of startSites, routes has match gid
    try {
      let submitError = ''
      const { routes, startSites, uuid2data } = this.props
      const { totalDay } = this.state
      const { createTripForm: { values: { dailyTrips, uuid2data: time } } } = this.props

      if (routes.length !== totalDay ||
        startSites.length !== totalDay ||
        dailyTrips.length !== totalDay) {
        return false
      }

      if (dailyTrips.some(({ remind, period: { start, end } }) => !remind || !start || !end)) {
        submitError = '記得填寫每日提醒、出發和結束時間喔！'
      }

      if (
        routes.some(dailyRoute =>
          dailyRoute.some(
            ({ from, to }) => {
              if (!time[from] || !time[to] || !uuid2data[from] || !uuid2data[to]) return true

              const { gid: gidf } = uuid2data[from]
              const { gid: gidt } = uuid2data[to]
              const { startTime: startTimef, endTime: endTimef } = time[from]
              const { startTime: startTimet, endTime: endTimet } = time[to]
              return !gidf || !startTimef || !endTimef ||
                      !gidt || !startTimet || !endTimet
            })
        ) ||
        startSites.some(value => {
          if (!time[value]) return true

          const { gid } = uuid2data[value]
          const { startTime, endTime } = time[value]
          return !gid || !startTime || !endTime
        })
      ) {
        submitError = '記得填寫景點、開始時間和離開時間喔！'
      }

      if (submit) this.setState({ submitError })

      return submitError === ''
    } catch (err) {
      console.log(err)
      return false
    }
  }

  addSiteInfoClick(uuid, top, left) {
    this.setState({
      floatWindow: {
        top,
        left,
        floatListShow: false,
        floatInfoShow: true,
        uuid,
      },
    })
  }

  addGuideSite(addSite) {
    const { floatWindow: { uuid } } = this.state
    const { routes, startSites, allSites, uuid2data } = this.props

    uuid2data[uuid] = {
      gid: addSite._id,
    }

    this.props.dispatch(setCreateTripData({
      uuid2data,
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2data),
    }))
    this.setState({
      floatWindow: {
        floatListShow: false,
      },
    })
  }

  addGuideSiteClick(uuid, top, left) {
    this.setState({
      floatWindow: {
        top,
        left,
        floatListShow: true,
        floatInfoShow: false,
        uuid,
      },
    })
  }

  deleteSite(uuid, day) {
    const { routes, startSites, allSites, uuid2data } = this.props
    let isLeaf = true
    routes[day].some((route, index) => {
      if (route.from === uuid) {
        isLeaf = false
        return true
      }
      return false
    })

    if (!isLeaf) return this.props.dispatch(createTripError('請先刪除子景點'))

    if (uuid2data[uuid]) uuid2data[uuid].gid = ''

    routes[day].forEach((route, index) => {
      if (route.from === uuid || route.to === uuid) {
        routes[day].splice(index, 1)
      }
    })

    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2data),
      routes,
    }))
  }

  addChildSite(id, day) {
    const { routes, startSites, allSites, uuid2data } = this.props
    if (!this.props.uuid2data[id] ||
      !this.props.uuid2data[id].gid) {
      return this.props.dispatch(createTripError('請填入景點後，再加入子景點'))
    }

    routes[day].push({
      from: id,
      to: uuid(),
    })

    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2data),
      routes,
    }))
  }

  closeFloatSiteList() {
    this.setState({
      floatWindow: {
        floatListShow: false,
      },
    })
  }
  closeFloatInfo() {
    this.setState({
      floatWindow: {
        floatInfoShow: false,
      },
    })
  }

  addDay() {
    const { routes, startSites, allSites, uuid2data } = this.props

    const newuuid = uuid()
    uuid2data[newuuid] = {
      gid: '',
    }
    startSites.push(newuuid)
    routes.push([])

    this.props.dispatch(arrayPush(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', {
      remind: '',
      period: {
        start: '08:00',
        end: '21:00',
      },
    }))

    this.setState({
      totalDay: this.state.totalDay + 1,
    })
    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2data),
      routes,
      startSites,
      uuid2data,
    }))
  }

  deleteDay(day) {
    if (this.state.totalDay === 1) return
    const { routes, startSites, allSites, uuid2data } = this.props

    startSites.splice(day, 1)
    routes.splice(day, 1)

    this.props.dispatch(arrayRemove(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', day))

    this.setState({
      day: this.state.totalDay - 1 === day ? this.state.totalDay - 2 : day,
      totalDay: this.state.totalDay - 1,
    })
    this.props.dispatch(setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, uuid2data),
      routes,
      startSites,
    }))
  }

  render() {
    const {
      pristine,
      submitting,
      invalid,
      tripInfo,
      previousPage,
      createTripForm: { values },
    } = this.props
    return (
      <div>
        <pre>{JSON.stringify(tripInfo, null, 2)}</pre>
        <pre>{JSON.stringify(values, null, 2)}</pre>
        <p style={style.errorMsg}>{this.props.error}</p>
        <div style={style.dayDiv}>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <Navbar.Dropdown title="選擇日程：" style={style.dropdown}>
              {
                Array(...{ length: this.state.totalDay })
                  .map(Number.call, Number)
                  .map((value, index) => (
                    <MenuItem
                      key={index}
                      title={`第${value + 1}天`}
                      onClick={() => this.setState({ day: value })}
                    />
                  ))
              }
            </Navbar.Dropdown>
            <p style={{ fontSize: styles.font.big }}>
              {`第${this.state.day + 1}天`}
            </p>
          </div>
          <span>
            <IconBtn
              btnStyle={style.dayDivBtn}
              name="plus"
              onClick={this.addDay.bind(this)}
            />
            <IconBtn
              btnStyle={style.dayDivBtn}
              name="minus"
              onClick={this.deleteDay.bind(this, this.state.day)}
            />
          </span>
        </div>
        <Form
          defaultHorizontal={true}
          defaultLabelDimensions={{ sm: 2 }}
          defaultFieldDimensions={{ sm: 6 }}
          onSubmit={() => {}}
        >
          {
            Array(...{ length: this.state.totalDay })
              .map(Number.call, Number)
              .map((value, index) => {
                if (this.state.day !== index) return null
                return (
                  <div key={index}>
                    <Field
                      name={`dailyTrips.${value}.remind`}
                      component={FormField}
                      label="每日提醒"
                      labelDimensions={{ sm: 2 }}
                      fieldDimensions={{ sm: 10 }}
                      adapter={Textarea}
                      rows="3"
                    />
                    <Field
                      name={`dailyTrips.${value}.period.start`}
                      component={FormField}
                      label="出發時間"
                      fieldDimensions={{ sm: 6 }}
                      adapter={Input}
                      type="time"
                    />
                    <Field
                      name={`dailyTrips.${value}.period.end`}
                      component={FormField}
                      label="結束時間"
                      fieldDimensions={{ sm: 6 }}
                      adapter={Input}
                      type="time"
                    />
                  </div>
                )
              })
          }
        </Form>
        <div style={{ position: 'relative' }}>
          {
            this.state.floatWindow.floatListShow &&
            <FloatSiteList
              title={'選擇地點'}
              top={this.state.floatWindow.top}
              left={this.state.floatWindow.left}
              siteList={this.props.allSites}
              onClick={this.addGuideSite.bind(this)}
              onClose={this.closeFloatSiteList.bind(this)}
            />
          }
          {
            this.state.floatWindow.floatInfoShow &&
            <FloatInfo
              title={'填寫出發與結束時間'}
              top={this.state.floatWindow.top}
              left={this.state.floatWindow.left}
              uuid={this.state.floatWindow.uuid}
              onClose={this.closeFloatInfo.bind(this)}
            />
          }
          {
            Array(...{ length: this.state.totalDay })
              .map(Number.call, Number)
              .map((value, index) => {
                if (this.state.day !== index) return null

                const dailyTrip = tripInfo[index] // sites ylayer routes

                return (
                <div
                  key={`day${value}`}
                  style={style.container}
                >
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
                        const ypos1 = route.from.ypos * 130 + 50 + siteDivHeight / 2
                        const xpos2 =
                          (route.to.xpos + 1) /
                          (dailyTrip.ylayer[route.to.ypos] + 1) *
                          width +
                          scrollbarShift
                        const ypos2 = route.to.ypos * 130 + 50 + siteDivHeight / 2

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
                      const top = `${ypos * 130 + 50}px`
                      const left = `calc(${(xpos + 1) / (dailyTrip.ylayer[ypos] + 1) * 100}% - ${siteDivWidth / 2}px)`
                      const floatListLeft =
                        `calc(${(xpos + 1) / (dailyTrip.ylayer[ypos] + 1) * 100}% + ${siteDivWidth / 2 + 10}px)`
                      const uuidData = values.uuid2data[site.uuid]
                      return (
                        <SiteDiv
                          top={top}
                          left={left}
                          key={`${xpos}-${ypos}`}
                          site={site}
                          startTime={uuidData && uuidData.startTime || ''}
                          endTime={uuidData && uuidData.endTime || ''}
                          addSiteInfo={this.addSiteInfoClick.bind(this, site.uuid, top, floatListLeft)}
                          addSite={this.addGuideSiteClick.bind(this, site.uuid, top, floatListLeft)}
                          addChildSite={this.addChildSite.bind(this, site.uuid, this.state.day)}
                          deleteSite={this.deleteSite.bind(this, site.uuid, this.state.day)}
                        />
                      )
                    })
                  }
                </div>
                )
              })
          }
        </div>
        <div style={{ margin: '20px 0 0', display: 'flex', justifyContent: 'center' }}>
          <FormButton type="button" onClick={previousPage}>
            <Text id={'trip.createTrip.form.previousStep'}/>
          </FormButton>
          <FormButton
            type="button"
            onClick={this.handleSubmit}
            disabled={pristine || submitting || invalid || !this.validateForm(false)}>
            <Text id={'trip.createTrip.form.nextStep'}/>
          </FormButton>
          <p style={{ ...style.errorMsg, float: 'right' }}>{this.state.submitError}</p>
        </div>
      </div>
    )
  }
}

const SiteDiv = ({
  top,
  left,
  site,
  startTime,
  endTime,
  addSiteInfo,
  addSite,
  addChildSite,
  deleteSite,
  ...props
}) => {
  return (
    <div
      style={{
        ...style.siteDiv,
        top,
        left,
      }}
      {...props}
    >
      <p style={style.siteDivMsg}>{site.content && site.content.name || ''}</p>
      <p style={style.siteDivMsg}>{`始：${startTime}`}</p>
      <p style={style.siteDivMsg}>{`離：${endTime}`}</p>
      <div style={style.siteDivBtnDiv}>
        <IconBtn btnStyle={style.siteDivBtn} name="pencil" onClick={addSiteInfo}/>
        <IconBtn btnStyle={style.siteDivBtn} name="map-marker" onClick={addSite}/>
        <IconBtn btnStyle={style.siteDivBtn} name="plus" onClick={addChildSite}/>
        <IconBtn btnStyle={style.siteDivBtn} name="times" onClick={deleteSite}/>
      </div>
    </div>
  )
}
const FloatList = ({ title, top, left, children, onClose, outterStyle, ...props }) => {
  return (
    <div
      style={{
        ...style.floatSiteList,
        top,
        left,
        ...outterStyle,
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
        <p style={{ fontSize: styles.font.medium, flex: 1, marginLeft: '5px' }}>
          {title}
        </p>
        <IconBtn
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
      {children}
    </div>
  )
}

const FloatSiteList = ({ siteList, onClick, ...props }) => {
  return (
    <FloatList {...props}>
      {siteList.map((site, index) => (
        <FloatSiteListItem
          key={index}
          site={site}
          onClick={onClick}
        />
      ))}
    </FloatList>
  )
}

const FloatSiteListItem = ({ site, onClick, ...props }) => {
  return (
    <div
      style={style.floatSiteListItem}
      {...props}
    >
      <IconBtn
        btnStyle={{ ...style.IconBtn, marginRight: '10px' }}
        name="check"
        onClick={() => onClick(site)}
      />
      <p style={style.floatSiteListItemName}>{site.name}</p>
    </div>
  )
}

const FloatInfo = ({ uuid, ...props }) => {
  return (
    <FloatList outterStyle={{ overflow: 'hidden' }} {...props}>
      <Form
        defaultHorizontal={true}
        defaultLabelDimensions={{ sm: 2 }}
        defaultFieldDimensions={{ sm: 6 }}
        onSubmit={() => {}}
      >
        <p style={{ fontSize: styles.font.medium, flex: 1, marginLeft: '5px' }}>
          {'預估出發時間'}
        </p>
        <Field
          name={`uuid2data.${uuid}.startTime`}
          component={FormField}
          fieldDimensions={{ sm: 12 }}
          adapter={Input}
          type="time"
        />
        <p style={{ fontSize: styles.font.medium, flex: 1, marginLeft: '5px' }}>
          {'預估離開時間'}
        </p>
        <Field
          name={`uuid2data.${uuid}.endTime`}
          component={FormField}
          fieldDimensions={{ sm: 12 }}
          adapter={Input}
          type="time"
        />
      </Form>
    </FloatList>
  )
}

export default reduxForm({
  form: FormNames.TRIP_CREATE_TRIP,
  destroyOnUnmount: false,
  validate,
  initialValues: {
    name: '',
    tags: [],
    dayInfo: 'TripDayInfos.HALF_DAY',
    dailyTrips: [{
      remind: '',
      period: {
        start: '08:00',
        end: '21:00',
      },
    }],
    uuid2data: {},
  },
})(connect(state => ({
  createTripForm: state.form[FormNames.TRIP_CREATE_TRIP],
  apiEngine: state.apiEngine,
  allSites: state.trip.ownSites,
  tripInfo: state.trip.tripInfo,
  routes: state.trip.routes,
  startSites: state.trip.startSites,
  uuid2data: state.trip.uuid2data,
  error: state.trip.error,
}))(CreateTripFormPage2))
