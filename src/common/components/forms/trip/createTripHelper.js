import { fromJS } from 'immutable'
import _ from 'lodash'

export const calculateTripInfo = (routes, startSites, allSites, uuid2data) => {
  // temporary hacky code

  routes = routes.toJS()
  startSites = startSites.toJS()
  allSites = allSites.toJS()
  uuid2data = uuid2data.toJS()

  // temporary hacky code

  const allInfo = [] // array by day
  startSites.forEach((startSiteuuid, dayIndex) => {  // can have many days
    // frontQueue: {uuid: node uuid, xpos, ypos}
    // compare each root from with top of the queue, if match, we then compare the
    // destination with the site in the set
    const frontQueue = [{ uuid: startSiteuuid, xpos: 0, ypos: 0 }]
    const dailyPos = {}
    const dailyRoutes = []
    const layerArray = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1] // get node of each layer
    dailyPos[startSiteuuid] = { xpos: 0, ypos: 0 }
    while (frontQueue.length !== 0) {
      const ypos = frontQueue[0].ypos + 1
      const filterRoutes =
        routes[dayIndex]
        .filter(route => route.from === frontQueue[0].uuid)

      filterRoutes.forEach((filterRoute) => {
        const destuuid = filterRoute.to
        const xpos = layerArray[ypos] + 1

        if (dailyPos[destuuid] === undefined) {
          dailyPos[destuuid] = {
            xpos,
            ypos,
          }
          const pushq = { uuid: filterRoute.to, xpos, ypos }
          frontQueue.push(pushq)
          layerArray[ypos]++
        } else {
          const oldyPos = dailyPos[destuuid].ypos
          if (ypos > oldyPos) {
            dailyPos[destuuid] = {
              xpos,
              ypos,
            }
            layerArray[ypos]++
          }
        }
      })
      frontQueue.shift()
    }
    // get all routes for rendering
    // reshape dailyRoutes
    routes[dayIndex]
      .forEach(route => {
        dailyRoutes.push({
          from: {
            xpos: dailyPos[route.from].xpos,
            ypos: dailyPos[route.from].ypos,
          },
          to: {
            xpos: dailyPos[route.to].xpos,
            ypos: dailyPos[route.to].ypos,
          },
        })
      })
    const ylayer = layerArray.filter(layer => layer > -1)
      .map(length => length + 1)

    // reshape allSiteData for next usage
    const allSiteData = {}
    allSites.forEach(site => {
      allSiteData[site._id] = site
    })

    const sites = []
    _.each(dailyPos, (value, key) => {
      sites.push({
        pos: { xpos: value.xpos, ypos: value.ypos },
        content: uuid2data[key] ? allSiteData[uuid2data[key].gid] : null,
        uuid: key,
      })
    })
    allInfo.push({ ylayer, sites, routes: dailyRoutes })
  })

  // temporary hacky code

  return fromJS(allInfo)

  // temporary hacky code
}
