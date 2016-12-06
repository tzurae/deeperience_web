import Options from '../i18n/zh-tw'

export default (messages, options) => {
  const option = {}
  if (options.indexOf('TripDayInfos') !== -1) {
    option.tripDayInfos =
      Object.keys(Options)
        .filter(value => value.indexOf('TripDayInfos') === 0)
        .map(value => ({
          label: messages[value],
          value,
        }))
  }

  if (options.indexOf('TripElements') !== -1) {
    const tripElements = {}
    option.tripElements = []

    Object.keys(Options)
      .filter(value => value.indexOf('TripElements') === 0)
      .forEach(value => {
        const arr = value.split('.')

        if (!tripElements[arr[1]]) {
          tripElements[arr[1]] = {
            label: '',
            value: [],
          }
        }

        if (arr[2] === 'label') {
          tripElements[arr[1]].label = value
        } else {
          tripElements[arr[1]].value.push({
            label: messages[value],
            value,
          })
        }
      })

    for (const element in tripElements) {
      option.tripElements.push(tripElements[element])
    }
  }

  if (options.indexOf('SiteElements') !== -1) {
    const siteElements = {}
    option.siteElements = []

    Object.keys(Options)
      .filter(value => value.indexOf('SiteElements') === 0)
      .forEach(value => {
        const arr = value.split('.')

        if (!siteElements[arr[1]]) {
          siteElements[arr[1]] = {
            label: '',
            value: [],
          }
        }

        if (arr[2] === 'label') {
          siteElements[arr[1]].label = value
        } else {
          siteElements[arr[1]].value.push({
            label: messages[value],
            value,
          })
        }
      })

    for (const element in siteElements) {
      option.siteElements.push(siteElements[element])
    }
  }

  return option
}
