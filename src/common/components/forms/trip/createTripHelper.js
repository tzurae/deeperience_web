'use strict'
import _ from 'underscore'

export function calculateTripInfo(routes, startSites, allSites) {
  const allInfo = [] // array by day
  startSites.forEach((startSite, dayIndex) => {  // can have many days
    // frontQueue: {depart: {hour,minute,day}, from, xpos, ypos}
    // compare each root from with top of the queue, if match, we then compare the
    // destination with the site in the set
    const frontQueue = [{ ...startSite, xpos: 0, ypos: 0 }]
    const dailyPos = {}
    const dailyRoutes = []
    const layerArray = [0, -1, -1, -1, -1, -1, -1, -1, -1, -1] // get node of each layer
    dailyPos[startSite.guideSiteId] = { uuid: startSite.uuid, xpos: 0, ypos: 0 }
    while (frontQueue.length !== 0) {
      const ypos = frontQueue[0].ypos + 1
      const filterRoutes =
        routes[dayIndex]
        .filter(route => siteEqual(route.from, frontQueue[0]))

      filterRoutes.forEach((filterRoute) => {
        const destuuid = filterRoute.to.uuid
        const destgid = filterRoute.to.guideSiteId
        const xpos = layerArray[ypos] + 1

        if (dailyPos[destgid] === undefined) {
          dailyPos[destgid] = {
            uuid: destuuid,
            xpos,
            ypos,
          }
          const pushq = { ...filterRoute.to, xpos, ypos }
          frontQueue.push(pushq)
          layerArray[ypos]++
        } else {
          const oldyPos = dailyPos[destgid].ypos
          if (ypos > oldyPos) {
            dailyPos[destgid] = {
              uuid: destuuid,
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
            xpos: dailyPos[route.from.guideSiteId].xpos,
            ypos: dailyPos[route.from.guideSiteId].ypos,
          },
          to: {
            xpos: dailyPos[route.to.guideSiteId].xpos,
            ypos: dailyPos[route.to.guideSiteId].ypos,
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
        content: allSiteData[key],
        uuid: value.uuid,
      })
    })
    allInfo.push({ ylayer, sites, routes: dailyRoutes })
  })
  return allInfo
}

function siteEqual(site1, site2) {
  return site1.uuid === site2.uuid
}
