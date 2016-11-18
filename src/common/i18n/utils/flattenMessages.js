const flattenMessages =
  (nestedMessages, prefix = '') =>
    Object.keys(nestedMessages).reduce((messages, key) => {
      const value = nestedMessages[key]
      const prefixedKey = prefix ? `${prefix}.${key}` : key

      if (typeof value === 'string') {
        messages[prefixedKey] = value
      } else {
        Object.assign(messages, flattenMessages(value, prefixedKey))
      }
      return messages
    }, {})

export default flattenMessages

// ex:
// {
//   '886': {
//   countryLabel: '台灣',
//     '01': {
//       areaLabel: '北部',
//       '01': '台北',
//       '02': '基隆',
//       '03': '新北',
//       '04': '桃園',
//       '05': '新竹',
//   },
// }
//
// becomes
// {
//   '886.countryLabel': '台灣',
//   '886.01.areaLabel': '北部',
//   '886.01.01': '台北',
//   '886.01.02': '基隆',
//   '886.01.03': '新北',
//   '886.01.04': '桃園',
//   '886.01.05': '新竹',
// }
