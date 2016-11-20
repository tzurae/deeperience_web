import Options from '../i18n/zh-tw'
import I18n from '../utils/i18n'

export default (options) => {
  const option = {}
  if (options.indexOf('TripDayInfos') !== -1) {
    option.tripDayInfos =
      Object.keys(Options)
        .filter(value => value.indexOf('TripDayInfos') === 0)
        .map(value => ({
          label: I18n(value),
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
            label: I18n(value),
            value,
          })
        }
      })

    for (const element in tripElements) {
      option.tripElements.push(tripElements[element])
    }
  }

  return option
}

