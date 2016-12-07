import Options from '../i18n/zh-tw'

export const getOptions = (messages, options) => {
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
  return option
}

export const getValue = (messages, options) => {
  const i18nArr = ['CustomPhases', 'TripDayInfos']
  const i18nValue = {}
  i18nArr.forEach(i18nTag => {
    if (options.indexOf(i18nTag) !== -1) {
      i18nValue[i18nTag] = {}
      Object.keys(Options)
        .filter(value => value.indexOf(i18nTag) === 0)
        .forEach(value => {
          i18nValue[i18nTag][value.substring(i18nTag.length + 1)] = messages[value]
        })
    }
  })
  return i18nValue
}
