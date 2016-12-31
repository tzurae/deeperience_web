import React from 'react'
import { List, fromJS } from 'immutable'
import { Field, reduxForm } from 'redux-form/immutable'
import uuid from 'uuid'
import FormProperties from '../tripFormProperties'
import FormNames from '../../../../constants/FormNames'
import { calculateTripInfo } from '../createTripHelper'
import Navbar from '../../../utils/BsNavbar'
import MenuItem from '../../../utils/MenuItem'
import IconBtn from '../../../utils/IconBtn'
import FormFooter from '../../../utils/FormFooter'
import {
  BsTextarea as Textarea,
  BsInput as Input,
} from '../../../fields/adapters'
import {
  BsForm as Form,
  BsField as FormField,
} from '../../../fields/widgets'
import styles from './styles.scss'

const siteDivWidth = 150
const siteDivHeight = 100
const scrollbarShift = -6

const PhaseTripBranch = props => {
  const {
    // ------ callback ------
    actions,
    nextPage,
    previousPage,

    // ------ dispatch props ------
    tripInfo,   // immutable
    startSites, // immutable
    routes, // immutable
    uuid2data,  // immutable
    allSites, // immutable
    branchError,
    submitError,
    totalDay,
    showDay,
    floatWindow,

    // ------ form ------
    pristine,
    submitting,
    invalid,
    formValue, // immutable
  } = props

  const dailyTrips = formValue.get('dailyTrips') // array
  const time = formValue.get('uuid2data') // array

  /**
   * ## handleSubmit
   * @usage
   * @param
   *
   * @return
   */

  const handleSubmit = () => {
    if (!validateForm(true)) return
    else {
      dailyTrips.forEach((trip, index) => {
        const uuidDataArr = [] // plain array

        if (routes.get(index).size === 0) {
          uuidDataArr.push(startSites.get(index))
        } else {
          routes.get(index).forEach(route => {
            const from = route.get('from')
            const to = route.get('to')
            if (uuidDataArr.indexOf(from) === -1) uuidDataArr.push(from)
            if (uuidDataArr.indexOf(to) === -1) uuidDataArr.push(to)
          })
        }

        actions.arraySplice(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', index, 1, fromJS({
          ...trip.toJS(),
          startSite: startSites.get(index),
          routes: routes.get(index),
          uuid2data: uuidDataArr.map(key => ({
            uuid: key,
            gid: uuid2data.getIn([key, 'gid']),
            startTime: time.getIn([key, 'startTime']),
            endTime: time.getIn([key, 'endTime']),
          })),
        })
        )
      })
      nextPage()
    }
  }

  /**
   * ##
   * @usage
   * @param
   * @return
   */
  const validateForm = (submit = false) => {
    // 1. dailyTrips, sites, routes, startSites has length = totalDay
    // 2. every props in dailyTrip has filled
    // 3. every props in routes has filled
    // 4. every uuid of startSites, routes has match gid
    try {
      let submitError = ''

      if (routes.size !== totalDay ||
        startSites.size !== totalDay ||
        dailyTrips.size !== totalDay) {
        return false
      }

      if (dailyTrips.some(daily =>
        !daily.get('remind') || !daily.getIn(['period', 'start']) || !daily.getIn(['period', 'end']))) {
        submitError = '記得填寫每日提醒、出發和結束時間喔！'
      }

      if (
        routes.some(dailyRoute =>
          dailyRoute.some(
            route => {
              const from = route.get('from')
              const to = route.get('to')
              if (!time.get(from) || !time.get(to) || !uuid2data.get(from) || !uuid2data.get(to)) return true

              const gidf = uuid2data.getIn([from, 'gid'])
              const gidt = uuid2data.getIn([to, 'gid'])
              const startTimef = time.getIn([from, 'startTime'])
              const endTimef = time.getIn([from, 'endTime'])
              const startTimet = time.getIn([to, 'startTime'])
              const endTimet = time.getIn([to, 'endTime'])
              return !gidf || !startTimef || !endTimef ||
                !gidt || !startTimet || !endTimet
            })
        ) ||
        startSites.some(value => {
          if (!time.get(value)) return true

          const gid = uuid2data.getIn([value, 'gid'])
          const startTime = time.getIn([value, 'startTime'])
          const endTime = time.getIn([value, 'endTime'])
          return !gid || !startTime || !endTime
        })
      ) {
        submitError = '記得填寫景點、開始時間和離開時間喔！'
      }

      if (submit) actions.createTripSetSubmitError(submitError)

      return submitError === ''
    } catch (err) {
      console.log(err)
      return false
    }
  }

  const addDay = () => {
    const newuuid = uuid()
    const newuuid2data = uuid2data.setIn([newuuid, 'gid'], '')
    const newStartSites = startSites.push(newuuid)
    const newRoutes = routes.push(List([]))

    actions.arrayPush(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', fromJS({
      remind: '',
      period: {
        start: '08:00',
        end: '21:00',
      },
    })
    )

    actions.createTripSetTotalDay(totalDay + 1)
    actions.setCreateTripData({
      tripInfo: calculateTripInfo(newRoutes, newStartSites, allSites, newuuid2data),
      routes: newRoutes,
      startSites: newStartSites,
      uuid2data: newuuid2data,
    })
  }

  const deleteDay = () => {
    if (totalDay === 1) return

    const newStartSites = startSites.delete(showDay)
    const newRoutes = routes.delete(showDay)

    actions.arrayRemove(FormNames.TRIP_CREATE_TRIP, 'dailyTrips', showDay)
    actions.createTripSetShowDay(totalDay - 1 === showDay ? totalDay - 2 : showDay)
    actions.createTripSetTotalDay(totalDay - 1)

    actions.setCreateTripData({
      tripInfo: calculateTripInfo(newRoutes, newStartSites, allSites, uuid2data),
      routes: newRoutes,
      startSites: newStartSites,
    })
  }

  const addGuideSite = (addSite) => {
    const uuid = floatWindow.get('uuid')
    const newuuid2data = uuid2data.setIn([uuid, 'gid'], addSite.get('_id'))
    // actions.change(FormNames.TRIP_CREATE_TRIP, 'uuid2data', newuuid2data)
    actions.setCreateTripData({
      tripInfo: calculateTripInfo(routes, startSites, allSites, newuuid2data),
      uuid2data: newuuid2data,
    })
    actions.createTripSetFloatWindow({ floatListShow: false })
  }

  // ------ SiteDiv usage ------
  const addSiteInfoClick = (uuid, top, left) => () => {
    actions.createTripSetFloatWindow({
      top,
      left,
      floatListShow: false,
      floatInfoShow: true,
      uuid,
    })
  }

  const addGuideSiteClick = (uuid, top, left) => () => {
    actions.createTripSetFloatWindow({
      top,
      left,
      floatListShow: true,
      floatInfoShow: false,
      uuid,
    })
  }

  const addChildSite = (id, day) => () => {
    if (!uuid2data.get(id) || !uuid2data.getIn([id, 'gid'])) {
      return actions.createTripBranchError('請填入景點後，再加入子景點')
    }

    const newRoutes = routes.set(day, routes.get(day).push(fromJS({
      from: id,
      to: uuid(),
    })))

    actions.setCreateTripData({
      tripInfo: calculateTripInfo(newRoutes, startSites, allSites, uuid2data),
      routes: newRoutes,
    })
  }

  const deleteSite = (uuid, day) => () => {
    let isLeaf = true
    routes.get(day).some(route => {
      if (route.get('from') === uuid) {
        isLeaf = false
        return true
      }
      return false
    })

    if (!isLeaf) return actions.createTripBranchError('請先刪除子景點')

    let newuuid2data = uuid2data

    if (uuid2data.get(uuid)) newuuid2data = uuid2data.setIn([uuid, 'gid'], '')

    const newRoutes = routes.set(day, routes.get(day).map((route, index) => {
      if (route.get('from') === uuid || route.get('to') === uuid) {
        return 0
      }
      return route
    }).filter(route => route !== 0))

    actions.setCreateTripData({
      tripInfo: calculateTripInfo(newRoutes, startSites, allSites, newuuid2data),
      routes: newRoutes,
      uuid2data: newuuid2data,
    })
  }

  // ------ SiteDiv usage ------

  const closeFloatSiteList = () => {
    actions.createTripSetFloatWindow({ floatListShow: false })
  }

  const closeFloatInfo = () => {
    actions.createTripSetFloatWindow({ floatInfoShow: false })
  }

  // add picture remind
  const addRemind = (uuid) => () => {
    actions.createTripSetFloatWindow({
      uuid,
    })
  }

  return (
    <div>
      <p>Start Sites</p>
      {/* <pre>{JSON.stringify(startSites, null, 2)}</pre>*/}
      {/* <p>routes</p>*/}
      {/* <pre>{JSON.stringify(routes, null, 2)}</pre>*/}
      {/* <p>uuid2data</p>*/}
      {/* <pre>{JSON.stringify(uuid2data, null, 2)}</pre>*/}
      {/* <p>tripInfo</p>*/}
      {/* <pre>{JSON.stringify(tripInfo, null, 2)}</pre>*/}
      <p className={styles.msgError}>{branchError}</p>
      <ChooseDayDiv
        addDay={addDay}
        deleteDay={deleteDay}
        setShowDay={actions.createTripSetShowDay}
        totalDay={totalDay}
        showDay={showDay}
      />
      <FillDayInfoForm length={totalDay} day={showDay}/>
      <div style={{ position: 'relative' }}>
        {floatWindow.get('floatListShow') &&
          <FloatSiteList
            title={'選擇地點'}
            top={floatWindow.get('top')}
            left={floatWindow.get('left')}
            siteList={allSites}
            onClick={addGuideSite}
            onClose={closeFloatSiteList}
          />}
        {floatWindow.get('floatInfoShow') &&
          <FloatInfo
            title={'填寫出發與結束時間'}
            top={floatWindow.get('top')}
            left={floatWindow.get('left')}
            uuid={floatWindow.get('uuid')}
            onClose={closeFloatInfo}
          />}
        {
          new Array(...{ length: totalDay })
            .map(Number.call, Number)
            .map(day => {
              if (showDay !== day) return null

              // dailyTrip immutable
              // Map[3]
              // {"routes" => List[0]}
              // {"sites" => List[1]}
              // {"ylayer" => List[1]}
              const dailyTrip = tripInfo.get(day)

              if (!dailyTrip) {
                return <div key={`day${day}`} className={styles.container}/>
              }

              return (
                <div key={`day${day}`} className={styles.container}>
                  <svg height="100%" width="100%" style={{ position: 'absolute' }}>
                    {
                      dailyTrip.get('routes') != null && // != null means !== null && !== undefined
                      dailyTrip.get('routes').map(route => {
                        const width = 560
                        const xpos1 =
                          (route.getIn(['from', 'xpos']) + 1) /
                          (dailyTrip.getIn(['ylayer', route.getIn(['from', 'ypos'])]) + 1) *
                          width + scrollbarShift
                        const ypos1 = route.getIn(['from', 'ypos']) * 130 + 50 + siteDivHeight / 2
                        const xpos2 =
                          (route.getIn(['to', 'xpos']) + 1) /
                          (dailyTrip.getIn(['ylayer', route.getIn(['to', 'ypos'])]) + 1) *
                          width + scrollbarShift
                        const ypos2 = route.getIn(['to', 'ypos']) * 130 + 50 + siteDivHeight / 2

                        return (
                          <path
                            d={['M', xpos1, ypos1, 'T', xpos2, ypos2].join(' ')}
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
                    dailyTrip.get('sites').map(site => {
                      const xpos = site.getIn(['pos', 'xpos'])
                      const ypos = site.getIn(['pos', 'ypos'])
                      const top = `${ypos * 130 + 50}px`
                      const left =
                        `calc(${(xpos + 1) / (dailyTrip.getIn(['ylayer', ypos]) + 1) * 100}%` +
                        ` - ${siteDivWidth / 2}px)`
                      const floatListLeft =
                        `calc(${(xpos + 1) / (dailyTrip.getIn(['ylayer', ypos]) + 1) * 100}%` +
                        ` + ${siteDivWidth / 2 + 10}px)`

                      // this uuidData is different from the uuid2data,
                      // it records the start and end time
                      const uuidData = formValue.getIn(['uuid2data', site.get('uuid')])

                      return (
                        <SiteDiv
                          top={top}
                          left={left}
                          key={`${xpos}-${ypos}`}
                          site={site}
                          startTime={uuidData && uuidData.get('startTime') || ''}
                          endTime={uuidData && uuidData.get('endTime') || ''}
                          addRemind={addRemind(site.get('uuid'))}
                          addSiteInfo={addSiteInfoClick(site.get('uuid'), top, floatListLeft)}
                          addSite={addGuideSiteClick(site.get('uuid'), top, floatListLeft)}
                          addChildSite={addChildSite(site.get('uuid'), showDay)}
                          deleteSite={deleteSite(site.get('uuid'), showDay)}
                        />
                      )
                    })
                  }
                </div>
              )
            })
        }
      </div>
      <Footer
        previousPage={previousPage}
        disabled={pristine || submitting || invalid || !validateForm(false)}
        handleSubmit={handleSubmit}
        submitError={submitError}
      />
    </div>
  )
}

const ChooseDayDiv = ({ addDay, deleteDay, setShowDay, totalDay, showDay }) => (
  <div className={styles.dayDiv}>
    <div className={styles.chooseDayDiv}>
      <Navbar.Dropdown title="選擇日程：" className={styles.dropdown}>
        {new Array(...{ length: totalDay })
          .map(Number.call, Number)
          .map((value, index) => (
            <MenuItem
              key={index}
              title={`第${value + 1}天`}
              onClick={() => setShowDay(value)}
            />
          ))}
      </Navbar.Dropdown>
      <p className={styles.whichDay}>{`第${showDay + 1}天`}</p>
      <span className={styles.dayDivBtnDiv}>
        <IconBtn
          className={styles.dayDivBtn}
          name="plus"
          onClick={addDay}
        />
        <IconBtn
          className={styles.dayDivBtn}
          name="minus"
          onClick={deleteDay}
        />
      </span>
    </div>
  </div>
)

const FillDayInfoForm = ({ day, length }) => (
  length === 0 ? <div/> :
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={() => {}}
      preventEnter={true}
    >
      {new Array(...{ length })
        .map(Number.call, Number)
        .map((value, index) => {
          if (day !== index) return null
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
)

const SiteDiv = ({
  top, left, site, startTime, endTime,
  addRemind, addSiteInfo, addSite,
  addChildSite, deleteSite, ...props
}) => {
  return (
    <div
      className={styles.siteDiv}
      style={{
        top,
        left,
        height: `${siteDivHeight}px`,
        width: `${siteDivWidth}px`,
      }}
      {...props}
    >
      <p className={styles.siteDivMsg}>{site.getIn(['content', 'name'])}</p>
      <p className={styles.siteDivMsg}>{`始：${startTime}`}</p>
      <p className={styles.siteDivMsg}>{`離：${endTime}`}</p>
      <div className={styles.siteDivBtnDiv}>
        <IconBtn className={styles.siteDivBtn} name="file-image-o" onClick={addRemind}/>
        <IconBtn className={styles.siteDivBtn} name="clock-o" onClick={addSiteInfo}/>
        <IconBtn className={styles.siteDivBtn} name="map-marker" onClick={addSite}/>
        <IconBtn className={styles.siteDivBtn} name="plus" onClick={addChildSite}/>
        <IconBtn className={styles.siteDivBtn} name="times" onClick={deleteSite}/>
      </div>
    </div>
  )
}

const FloatList = ({ title, top, left, children, onClose, outterStyle, ...props }) => (
  <div
    className={styles.floatSiteList}
    style={{ top, left, ...outterStyle }}
    {...props}
  >
    <div className={styles.floatSiteListTitleDiv}>
      <p className={styles.floatSiteListTitle}>{title}</p>
      <IconBtn
        name="times"
        onClick={onClose}
        className={styles.floatSiteListIcon}
      />
    </div>
    {children}
  </div>
)

const FloatSiteList = ({ siteList, onClick, ...props }) => (
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

const FloatSiteListItem = ({ site, onClick, ...props }) => (
  <div
    className={styles.floatSiteListItem}
    onClick={() => onClick(site)}
    {...props}
  >
    <IconBtn className={styles.floatSiteListItemIcon} name="check"/>
    <p className={styles.floatSiteListItemName}>{site.get('name')}</p>
  </div>
)

const FloatInfo = ({ uuid, ...props }) => (
  <FloatList outterStyle={{ overflow: 'hidden' }} {...props}>
    <Form
      defaultHorizontal={true}
      defaultLabelDimensions={{ sm: 2 }}
      defaultFieldDimensions={{ sm: 6 }}
      onSubmit={() => {}}
    >
      <p className={styles.floatInfoSubtitle}>{'預估出發時間'}</p>
      <Field
        name={`uuid2data.${uuid}.startTime`}
        component={FormField}
        fieldDimensions={{ sm: 12 }}
        adapter={Input}
        type="time"
      />
      <p className={styles.floatInfoSubtitle}>{'預估離開時間'}</p>
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

const Footer = ({ disabled, previousPage, handleSubmit, submitError }) => (
  <div className={styles.footer}>
    <FormFooter
      type={['button', 'submit']}
      onClick={[previousPage, handleSubmit]}
      disabled={[null, disabled]}
      textId={['common.previousStep', 'common.nextStep']}
    />
    <p className={styles.msgError} style={{ float: 'right' }}>{submitError}</p>
  </div>
)

export default reduxForm(FormProperties)(PhaseTripBranch)
