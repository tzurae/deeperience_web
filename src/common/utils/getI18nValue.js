import Options from '../i18n/zh-tw'
/**
 * ##
 * @usage getting i18n value from messages to adapt options
 * @param
 *  messages: i18n object ( Immutable Map )
 *  options: array of string ['TripElements', 'SiteElements']
 * @return
 *  ex:
 * {
 *    TripElements: [
 *      {
 *        label: "TripElements.TOUR_WALK.label",
 *        value: [{
 *          label: "海邊",
 *          value: "TOUR_WALK.SEA",
 *        }],
 *      }
 *    ],
 *    TripDayInfos: [{
 *      label: "半日遊",
 *      value: "HALF_DAY",
 *    },{
 *      label: "一日遊",
 *      value: "ONE_DAY",
 *    }]
 * }
 */

export const getOptions = (messages, options) => {
  const optionArr1 = ['TripElements', 'SiteElements']
  const optionArr2 = [
    'CustomPhases', 'FoodElements', 'HotelTypes',
    'Languages', 'TravelWays', 'TripDayInfos',
  ]
  const option = {}

  optionArr1.forEach(tag => {
    if (options.indexOf(tag) !== -1) {
      const tmpObj = {}
      option[tag] = []
      Object.keys(Options)
        .filter(value => value.indexOf(tag) === 0)
        .forEach(value => {
          const arr = value.split('.')

          if (!tmpObj[arr[1]]) {
            tmpObj[arr[1]] = {
              label: '',
              value: [],
            }
          }

          if (arr[2] === 'label') {
            tmpObj[arr[1]].label = value
          } else {
            tmpObj[arr[1]].value.push({
              label: messages.get(value),
              value: `${value.split('.')[1]}.${value.split('.')[2]}`,
            })
          }
        })

      for (const element in tmpObj) {
        option[tag].push(tmpObj[element])
      }
    }
  })

  optionArr2.forEach(tag => {
    if (options.indexOf(tag) !== -1) {
      option[tag] =
        Object.keys(Options)
          .filter(value => value.indexOf(tag) === 0)
          .map(value => ({
            label: messages.get(value),
            value: value.split('.')[1],
          }))
    }
  })

  return option
}

/**
 * ##
 * @usage getting i18n value from messages
 * @param
 *  messages: i18n object ( Immutable Map )
 *  options: array of string ['CustomPhases', 'TripDayInfos']
 * @return
 *  ex:
 * {
 *    TripDayInfos: {
 *      "TripDayInfos.HALF_DAY": "半日遊",
 *      "TripDayInfos.ONE_DAY": "一日遊",
 *    }
 * }
 */

export const getValue = (messages, options) => {
  const i18nArr = [
    'CustomPhases', 'FoodElements', 'HotelTypes',
    'Languages', 'TravelWays', 'TripDayInfos',
    'SiteElements', 'TripElements', 'TripLocations',
  ]
  const i18nValue = {}
  i18nArr.forEach(tag => {
    if (options.indexOf(tag) !== -1) {
      i18nValue[tag] = {}
      Object.keys(Options)
        .filter(value => value.indexOf(tag) === 0)
        .forEach(value => {
          i18nValue[tag][value.substring(tag.length + 1)] = messages.get(value)
        })
    }
  })

  return i18nValue
}
